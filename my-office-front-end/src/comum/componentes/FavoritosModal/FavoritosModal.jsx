import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Box,
  CircularProgress
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSnackbar } from 'notistack';
import api from '../../servicos/api';


function ModalFavoritos({ aberto, aoFechar, aoAlternarFavorito }) {
  
  const [salasFavoritas, setSalasFavoritas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const { enqueueSnackbar } = useSnackbar(); // Hook do notistack para notificações

 
  useEffect(() => {
    if (aberto) { 
      buscarSalasFavoritas();
    }
  }, [aberto]); 
 
  const buscarSalasFavoritas = async () => {
    setCarregando(true); 
    setErro(null);       
    try {
     
      const resposta = await api.get('/favorites');
      setSalasFavoritas(resposta.data); 
    } catch (e) { 
      console.error("Erro ao buscar favoritos:", e);
      setErro("Não foi possível carregar as salas favoritas.");
      enqueueSnackbar("Erro ao carregar favoritos.", { variant: 'error' });
    } finally {
      setCarregando(false); 
    }
  };

  
  const desfavoritarSala = async (idSala) => {
    setCarregando(true); 
    setErro(null);       
    try {
      
      await api.delete(`/favorites/${idSala}`);

     
      setSalasFavoritas(salasAnteriores =>
        salasAnteriores.filter(sala => sala.id !== idSala)
      );

      enqueueSnackbar("Sala removida dos favoritos!", { variant: 'success' });

      
      if (aoAlternarFavorito) {
        aoAlternarFavorito(idSala, false); 
      }
    } catch (e) { 
      console.error("Erro ao desfavoritar sala:", e);
      setErro("Não foi possível desfavoritar a sala. Tente novamente.");
      enqueueSnackbar("Erro ao remover favorito.", { variant: 'error' });
    } finally {
      setCarregando(false); 
  };

  
  return (
    <Dialog open={aberto} onClose={aoFechar} maxWidth="sm" fullWidth>
      <DialogTitle>
        Minhas Salas Favoritas
        {carregando && ( 
          <CircularProgress size={24} sx={{ ml: 2 }} />
        )}
      </DialogTitle>

      <DialogContent dividers>
        {erro && ( // Exibe mensagem de erro se houver
          <Box sx={{ p: 2, bgcolor: 'error.light', color: 'error.contrastText', borderRadius: 1 }}>
            <Typography>{erro}</Typography>
          </Box>
        )}

        {!carregando && !erro && salasFavoritas.length === 0 && ( 
          <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
            Você ainda não tem salas favoritas.
          </Typography>
        )}

        {!carregando && !erro && salasFavoritas.length > 0 && ( // Lista as salas favoritas se existirem
          <List>
            {salasFavoritas.map((sala) => (
              <React.Fragment key={sala.id}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="desfavoritar"
                      onClick={() => desfavoritarSala(sala.id)}
                      disabled={carregando} 
                    >
                      <FavoriteIcon color="error" /> {}
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={sala.name || 'Nome da Sala Desconhecido'}    
                    secondary={sala.location || 'Localização Desconhecida'} 
                  />
                </ListItem>
                <Divider component="li" /> {}
              </React.Fragment>
            ))}
          </List>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={aoFechar} disabled={carregando}>Fechar</Button> {/* Botão para fechar o modal */}
      </DialogActions>
    </Dialog>
  );
}
}
export default ModalFavoritos;