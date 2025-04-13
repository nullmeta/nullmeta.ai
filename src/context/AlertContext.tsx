'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Snackbar, Alert, AlertProps } from '@mui/material';
import dynamic from 'next/dynamic';
import { getPath } from '@/utilities/getPath';
import { generateId } from '@/utilities/generateId';

const ReactConfetti = dynamic(() => import('react-confetti'), {
  ssr: false
});

interface ToastEvent extends AlertProps {
  message: string;
  source: ToastSource;
}

type ToastSource = 'user' | 'application' | 'unknown';

interface Toast extends ToastEvent {
  id: string;
  timestamp: number;
  path: string;
  source: ToastSource;
}

interface AlertContextType {
  showAlert: (toast: ToastEvent) => void;
  getAlertHistory: () => Toast[];
  clearHistory: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const toastWithMetadata = (toast: ToastEvent): Toast => {
  return {
    ...toast,
    id: generateId('toast'),
    timestamp: Date.now(),
    path: getPath(),
    source: toast.source ?? 'unknown'
  }
}

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlerts must be used within an AlertsProvider');
  }
  return context;
};



export const AlertsProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [activeAlerts, setActiveAlerts] = useState<Toast[]>([]);
  const [alertQueue, setAlertQueue] = useState<Toast[]>([]);
  const [alertHistory, setAlertHistory] = useState<Toast[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const maxHistory = 50;
  const maxAlerts = 2;  
  const alertDelay = 500;

  const showAlert = (toast: ToastEvent) => {
    const newAlert: Toast = toastWithMetadata(toast);

    setAlertQueue(prev => [...prev, newAlert]);
    setAlertHistory(prev => {
      const updated = [newAlert, ...prev];
      return updated.slice(0, maxHistory);
    });

    if (newAlert.severity === 'success') {
      setShowConfetti(true);
    }
  };

  useEffect(() => {
    if (alertQueue.length > 0 && activeAlerts.length < maxAlerts) {
      const [nextAlert, ...remainingQueue] = alertQueue;
      setActiveAlerts(prev => [...prev, nextAlert]);
      setAlertQueue(remainingQueue);
    }
  }, [alertQueue, activeAlerts.length, maxAlerts]);

  const handleClose = (id: string) => {
    setActiveAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const getAlertHistory = () => alertHistory;
  const clearHistory = () => setAlertHistory([]);

  return (
    <AlertContext.Provider value={{ showAlert, getAlertHistory, clearHistory }}>
      {children}
  
      {activeAlerts.map((alert, index) => (
        <Snackbar
          key={alert.id}
          open={true}
          autoHideDuration={3000}
          onClose={() => handleClose(alert.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{ 
            width: '100%',
            maxWidth: '200px',
            bottom: `${index * 80}px !important`,
            transition: 'bottom 0.3s ease-in-out'
          }}
        >
          <Alert
            onClose={() => handleClose(alert.id)}
            severity={alert.severity ?? 'info'}
            sx={{ width: '100%' }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      ))}
      {showConfetti && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <ReactConfetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={200}
            recycle={false}
            gravity={0.3}
            confettiSource={{
              x: window.innerWidth / 2,
              y: window.innerHeight,
              w: 10,
              h: 10
            }}
          />
        </div>
      )}
    </AlertContext.Provider>
  );
};

export default AlertsProvider;