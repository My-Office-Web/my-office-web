import React, { useState } from "react";
import {
  Container,
  ThemeProvider,
  CssBaseline,
  Typography,
  Divider,
  Box,
} from "@mui/material";

import DarkMode from "../../DarkMode/DarkMode";
import Footer from "../Footer/Footer";
import AppBarLogado from "./AppBarLogado";
import FiltroIconeSala from "./FiltroIconeSala";

import { lightTheme, darkTheme } from "../../../Theme/theme";

const PaginaInicialLogado = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = (checked) => {
    setIsDark(checked);
  };

  return (
    <>
      <DarkMode isDark={isDark} toggleTheme={toggleTheme} />
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <CssBaseline />
        <AppBarLogado />

        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Encontre seu lugar aqui!
          </Typography>

          <Box display="flex" justifyContent="center" mb={2}>
            <FiltroIconeSala />
          </Box>
          <Divider sx={{ maxWidth: 600, mx: "auto", mb: 4, borderColor: "#dcdcdc" }} />

        </Container>

        <Container maxWidth="" sx={{ py: 4 }}>
          <Footer />
        </Container>
      </ThemeProvider>
    </>
  )
};

export default PaginaInicialLogado;
