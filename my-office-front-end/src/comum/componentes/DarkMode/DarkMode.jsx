// src/comum/Componentes/DarkMode/DarkMode.js
import * as React from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

// Componente que controla o Switch do tema
export default function DarkMode({ isDark, toggleTheme }) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={isDark}
          onChange={(e) => toggleTheme(e.target.checked)}
          inputProps={{ 'aria-label': 'alternar modo escuro' }}
        />
      }
      label={isDark ? <DarkModeIcon/> : <LightModeIcon color='warning' /> }
      sx={{ ml: 0, mt: 0 }}
    />
  );
}
