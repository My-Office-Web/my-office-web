import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FaHome, FaBuilding, FaBullhorn, FaUsers, FaHeadset } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

import PaginaAbout from "../About/About";
import SupportPage from "../PaginaSuporte/Suporte";

export default function TemporaryDrawer({ open, toggleDrawer }) {
  const navigate = useNavigate();

  const [openAboutModal, setOpenAboutModal] = React.useState(false);
  const [openSupportModal, setOpenSupportModal] = React.useState(false);

  const handleOpenAboutModal = () => setOpenAboutModal(true);
  const handleCloseAboutModal = () => setOpenAboutModal(false);

  const handleOpenSupportModal = () => setOpenSupportModal(true);
  const handleCloseSupportModal = () => setOpenSupportModal(false);

  const handleNavigation = (path) => () => {
    navigate(path);
    toggleDrawer(false)();
  };

  const menuItemsTop = [
    { text: "Início", icon: <FaHome />, path: "/" },
    { text: "Alugar", icon: <FaBuilding />, path: "/alugar" },
    { text: "Anunciar", icon: <FaBullhorn />, path: "/anunciar" },
  ];

  const menuItemsBottom = [
    { text: "Quem somos?", icon: <FaUsers />, onClick: handleOpenAboutModal },
    { text: "Suporte", icon: <FaHeadset />, onClick: handleOpenSupportModal },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onKeyDown={toggleDrawer(false)}>
      <List>
        {menuItemsTop.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={handleNavigation(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        {menuItemsBottom.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={item.onClick}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      {/* Modal: Quem somos */}
      <Dialog open={openAboutModal} onClose={handleCloseAboutModal} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontWeight: "bold", color: "#1976d2", fontSize: "1.8rem" }}>QUEM SOMOS</DialogTitle>
        <DialogContent>
          <PaginaAbout />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAboutModal} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal: Suporte */}
      <Dialog open={openSupportModal} onClose={handleCloseSupportModal} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontWeight: "bold", color: "#1976d2", fontSize: "1.8rem" }}>SUPORTE</DialogTitle>
        <DialogContent>
          <SupportPage />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSupportModal} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
