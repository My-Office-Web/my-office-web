import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
  Stack,
  Divider,
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ pt: 3, pb: 3 }}
    >
      <Container maxWidth="xl" >
        <Grid container spacing={22} alignItems="flex-start">
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" flexDirection="column" height="100%">
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Empresa
              </Typography>
              <Stack spacing={2}>
                <Link href="#" color="inherit" underline="hover">
                  Sobre nós
                </Link>
                <Link href="#" color="inherit" underline="hover">
                  Carreiras
                </Link>
                <Link href="#" color="inherit" underline="hover">
                  Blog
                </Link>
                <Link href="#" color="inherit" underline="hover">
                  Parcerias
                </Link>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" flexDirection="column" height="100%">
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Suporte
              </Typography>
              <Stack spacing={2}>
                <Link href="#" color="inherit" underline="hover">
                  Ajuda
                </Link>
                <Link href="#" color="inherit" underline="hover">
                  Central de suporte
                </Link>
                <Link href="#" color="inherit" underline="hover">
                  Contato
                </Link>
                <Link href="#" color="inherit" underline="hover">
                  Status do sistema
                </Link>
              </Stack>
            </Box>
          </Grid>

          {/* Coluna 3: Legal */}
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" flexDirection="column" height="100%">
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Legal
              </Typography>
              <Stack spacing={2}>
                <Link href="#" color="inherit" underline="hover">
                  Política de Privacidade
                </Link>
                <Link href="#" color="inherit" underline="hover">
                  Termos de Uso
                </Link>
                <Link href="#" color="inherit" underline="hover">
                  Licenciamento
                </Link>
                <Link href="#" color="inherit" underline="hover">
                  Cookies
                </Link>
              </Stack>
            </Box>
          </Grid>

          {/* Coluna 4: Novidades e redes sociais */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="100%"
            >
              <Box mb={3}>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Novidades
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Receba atualizações sobre nossos produtos e eventos:
                </Typography>
                <Stack direction="row" spacing={1}>
                  <TextField
                    variant="outlined"
                    placeholder="Seu e-mail"
                    size="small"
                    fullWidth
                    sx={{
                      borderRadius: 1,
                    }}
                  />
                  <Button variant="contained" color="primary">
                    Enviar
                  </Button>
                </Stack>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Siga nossas redes sociais:
                </Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton
                    color="inherit"
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener"
                    aria-label="Facebook"
                    sx={{
                      transition: "0.3s",
                    }}
                  >
                    <FacebookIcon />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener"
                    aria-label="Twitter"
                    sx={{
                      transition: "0.3s",
                    }}
                  >
                    <TwitterIcon />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener"
                    aria-label="LinkedIn"
                    sx={{
                      transition: "0.3s",
                    }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener"
                    aria-label="Instagram"
                    sx={{
                      transition: "0.3s",
                    }}
                  >
                    <InstagramIcon />
                  </IconButton>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Box textAlign="center">
          <Typography variant="body2" >
            © {new Date().getFullYear()} MyOffice. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
