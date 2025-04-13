'use client';

import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);
const MotionIconButton = motion(IconButton);

export default function Navigation() {
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useTheme();

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ 
            duration: 1.2,
            ease: "easeOut"
          }}
        >
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => router.push('/')}
          >
            Null Meta
          </Typography>
        </motion.div>
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
          <MotionButton 
            color="inherit" 
            onClick={() => router.push('/mission')}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Mission
          </MotionButton>
          <MotionIconButton 
            onClick={toggleTheme} 
            color="inherit"
            sx={{ ml: 1 }}
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </MotionIconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 