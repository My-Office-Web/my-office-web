// src/components/EstiloDeVida.js
import { Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

const estilos = [
  {
    imagem: "/predio-comercial.jpg",
    titulo: "Apê com Varanda",
    descricao: "Apês com varanda para relaxar e aproveitar a vista.",
  },
  {
    imagem: "/imagem-inicial.jpg",
    titulo: "Mobiliado do seu jeito",
    descricao: "Apartamentos já mobiliados pra você mudar agora.",
  },
  {
    imagem: "/escritorio.jpg",
    titulo: "Aluguel até R$2.000",
    descricao: "Do jeitinho que você queria e que cabe no seu bolso.",
  },
];

export default function EstiloDeVida() {
  return (
    <Box sx={{ px: 3, py: 6, textAlign: "center", bgcolor: "background.default" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Encontre o lugar ideal para sua reunião com maior conforto e tecnologia.
        
      </Typography>

      <Box
        sx={{
          width: 40,
          height: 4,
          bgcolor: "primary.main",
          margin: "0 auto",
          borderRadius: 2,
          mb: 4,
        }}
      />

      <Grid container spacing={5} justifyContent="center">
        {estilos.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={3} sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="180"
                image={item.imagem}
                alt={item.titulo}
              />
              <CardContent sx={{ textAlign: "left" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.descricao}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
