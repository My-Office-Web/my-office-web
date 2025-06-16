import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RoomIcon from '@mui/icons-material/Room';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  height: '90vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 4,
  overflow: 'hidden',
};

const ModalGoogleMaps = ({ open, onClose, lat, long }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDr-x1guHO0RxiZvKej1onlzBOUO6NDlLs',
  });

  const position = {
    lat: parseFloat(lat),
    lng: parseFloat(long),
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* Botão de fechar */}
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1000 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Mapa */}
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={position}
            zoom={16}
          >
            <Marker
              position={position}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          </GoogleMap>
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* Card Informativo */}
        <Paper
          elevation={6}
          sx={{
            position: 'absolute',
            top: isMobile ? 16 : 32,
            left: isMobile ? 16 : 32,
            width: isMobile ? '85%' : 340,
            padding: 2,
            borderRadius: 3,
            backgroundColor: 'white',
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Sala Disponível
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Localização privilegiada com ótima estrutura.
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <RoomIcon color="primary" sx={{ marginRight: 1 }} />
            <Typography variant="body2">
              Latitude: {lat} | Longitude: {long}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};

export default ModalGoogleMaps;
