export const getPath = () => {
    if (!window.location.pathname) return 'nowindow';
    return window.location.pathname;
  }