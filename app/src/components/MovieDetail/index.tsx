import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import type { Movie } from "../../types";
import { getImageUrlMovie } from "../../utils/generateImageMovie";
import { Popcorn } from "lucide-react";
export { default as MovieDetailSkeleton } from "./Skeleton";

interface MovieDetailProps {
  onAddToMyReviews: () => void;
  movie: Movie;
}

function MovieDetail({ onAddToMyReviews, movie }: MovieDetailProps) {
  const { title, synopsis, poster, genre, duration } = movie;
  const imageUrl = getImageUrlMovie(poster?.url);

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "background.paper",
        borderRadius: 3,
      }}
    >
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src={imageUrl}
            alt={title}
            sx={{
              width: "100%",
              maxHeight: "500px",
              objectFit: "contain",
              borderRadius: 2,
              backgroundColor: "#fff",
              p: 2,
            }}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Typography variant="h3" component="h1" fontWeight="800" gutterBottom>
            {title}
          </Typography>

          <Typography
            variant="h4"
            color="primary.main"
            fontWeight="bold"
            sx={{ mb: 3 }}
          >
            {synopsis}
          </Typography>

          <Divider sx={{ mb: 3, borderColor: "gray" }} />

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.8, flexGrow: 1 }}
          >
            {duration}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.8, flexGrow: 1 }}
          >
            {genre}
          </Typography>

          <Box display="flex" gap={3} mb={4} color="text.secondary">
            <Box display="flex" alignItems="center" gap={1}>
              <Popcorn size={20} color="#90caf9" />
              <Typography variant="body2">filme</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Popcorn size={20} color="#90caf9" />
              <Typography variant="body2">Filme bom</Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            size="large"
            // startIcon={<ShoppingCart />}
            onClick={onAddToMyReviews}
            sx={{
              py: 2,
              fontSize: "1.1rem",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
            fullWidth
          >
            Criar avaliação
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MovieDetail;
