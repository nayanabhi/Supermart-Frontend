// ToggleColorMode.js
import React from 'react';
import { useTheme, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ToggleColorMode = () => {
  const theme = useTheme();

  const toggleColorMode = () => {
    const newPaletteType = theme.palette.mode === 'light' ? 'dark' : 'light';
    localStorage.setItem('paletteType', newPaletteType);
    window.location.reload();
  };

  return (
    <IconButton onClick={toggleColorMode} color="inherit">
      {theme.palette.mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  );
};

export default ToggleColorMode;
