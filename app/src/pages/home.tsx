import {Grid, Box, Button, Paper, Typography } from "@mui/material";
import { Popcorn, Share2 } from "lucide-react";
import CardFeature from "../components/CardFeature";
import { Link as RouterLink } from "react-router";

function Home() {
  const features = [
    {
      icon: <Popcorn size={40} />,
      title: "Assista e avalie",
      description: "Crie seu catálogo pessoal de filmes.",
    },
    {
      icon: <Share2 size={40} />,
      title: "Compartilhe",
      description: "Milhares de avaliações públicas.",
    },
  ];
  
  return (
    <Box>
      <Paper
        elevation={1}
        sx={{
          p: {
            xs: 4,
            md: 8,
            lg: 12,
          },
          borderRadius: 4,
          textAlign: "center",
          mb: 6,
          border: "1px solid #333333",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 800,
            color: "primary.main",
            mb: 2,
            fontSize: {
              xs: "2.5rem",
              md: "3.75rem",
            },
          }}
        >
          Bem vindo ao MyCinema
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: "700px", mx: "auto" }}
        >
          Sua plataforma oficial  para registro, avaliação e compartilhamento de filmes. Crie seu catálogo virtual, avalie suas obras favoritas e compartilhe suas opiniões com a comunidade.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => {}}
          component={RouterLink}
          to="/movies"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
        >
          Já assistiu? Selecione o filme!
        </Button>
      </Paper>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid key={index}>
            <CardFeature
              description={feature.description}
              icon={feature.icon}
              title={feature.title}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
