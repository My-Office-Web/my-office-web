import React from "react";
import { Stack, Typography, IconButton } from "@mui/material";
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LandscapeIcon from '@mui/icons-material/Landscape';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CameraIcon from '@mui/icons-material/Camera';
import StarIcon from '@mui/icons-material/Star';

const categories = [
  { label: "Icônicos", icon: <StarIcon /> },
  { label: "Praia", icon: <BeachAccessIcon /> },
  { label: "Coffee Break", icon: <LocalCafeIcon /> },
  { label: "Em Alta", icon: <WhatshotIcon /> },
  { label: "Vista", icon: <LandscapeIcon /> },
  { label: "Pontos Turísticos", icon: <CameraIcon /> },
  { label: "Modernos", icon: <LocationCityIcon /> },
];

const FiltroIconeSala = ({ onSelect }) => {
  return (
    <Stack direction="row" spacing={3} justifyContent="center" sx={{ p: 2 }}>
      {categories.map((cat) => (
        <Stack
          key={cat.label}
          alignItems="center"
          spacing={1}
          sx={{ cursor: "pointer" }}
          onClick={() => onSelect && onSelect(cat.label)}
        >
          <IconButton size="large" color="primary">
            {cat.icon}
          </IconButton>
          <Typography variant="caption">{cat.label}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default FiltroIconeSala;
