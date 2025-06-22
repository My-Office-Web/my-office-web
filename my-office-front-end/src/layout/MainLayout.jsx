import { Children } from 'react';
import ModalFavoritos from '../comum/componentes/FavoritosModal/FavoritosModal';

import ModalFavoritos from '../componentes/FavoritesModal/ModalFavoritos'; // <--- AJUSTE AQUI

// ...

function MainLayout({ children }) {
  const [modalFavoritosAberto, setModalFavoritosAberto] = useState(false);

  const abrirModalFavoritos = () => {
    setModalFavoritosAberto(true);
  };

  const fecharModalFavoritos = () => {
    setModalFavoritosAberto(false);
  };

  const aoAlternarFavoritoNoModal = (idSala, foiFavoritada) => {
    console.log(`[LayoutPrincipal] Sala ${idSala} foi ${foiFavoritada ? 'favoritada' : 'desfavoritada'} via modal.`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      { }

      { }
      <ModalFavoritos
        aberto={modalFavoritosAberto}
        aoFechar={fecharModalFavoritos}
        aoAlternarFavorito={aoAlternarFavoritoNoModal}
      />

      {/* Conteúdo principal do layout */}
      {children}
    </Box>
  );
}

export default LayoutPrincipal;