import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import type { Movie } from "../../types";
import { getImageUrlMovie } from "../../utils/generateImageMovie";
import { Popcorn } from "lucide-react";
import { useState } from "react";
export { default as MovieDetailSkeleton } from "./Skeleton";

interface MovieDetailProps {
  onAddToMyReviews: (movieId: number, rating: number | null) => void;
  movie: Movie;
}

function MovieDetail({ onAddToMyReviews, movie }: MovieDetailProps) {
  const { title, synopsis, image, duration } = movie;
  const imageUrl = getImageUrlMovie(image?.url);
  const [rating, setRating] = useState<number | null>(null);

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
            variant="body1"
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
            Duração: {duration}
          </Typography>

          <Box display="flex" gap={3} mb={4} color="text.secondary">
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body1">Sua avaliação:</Typography>
              <Rating
                value={rating}
                precision={1}
                onChange={(_, newValue) => {
                  setRating(newValue);
                }}
              />
            </Box>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            startIcon={<Popcorn />}
            disabled={rating === null}
            onClick={() => onAddToMyReviews(movie.id, rating)}
            sx={{
              py: 2,
              fontSize: "1.1rem",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Criar avaliação
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MovieDetail;
