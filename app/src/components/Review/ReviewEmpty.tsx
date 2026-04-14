import { Box, Button, Typography } from "@mui/material";
import { Popcorn } from "lucide-react";
import { Link } from "react-router";

export function ReviewsEmpty() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 10,
        gap: 2,
        color: "text.secondary",
      }}
    >
      <Popcorn size={64} strokeWidth={1} />
      <Typography variant="h6" fontWeight={600}>
        Você ainda não fez nenhuma avaliação
      </Typography>
      <Typography variant="body2">
        Escolha um filme de nosso catálogo e compartilhe sua opinião!
      </Typography>
      <Button
        component={Link}
        to="/products"
        variant="contained"
        sx={{ mt: 1 }}
      >
        Ver filmes
      </Button>
    </Box>
  );
}