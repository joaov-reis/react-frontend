/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router";
import { HOST_API } from "../../services/api";
import type { Movie } from "../../types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Popcorn } from "lucide-react";
import { getImageUrlMovie } from "../../utils/generateImageMovie";
export { default as CardSkeleton } from "./Skeleton";

interface CardMovieProps {
  movie: Movie;
}

function CardMovie({ movie }: CardMovieProps) {
  const navigate = useNavigate();

  const { documentId, title, genre, duration, image } = movie;

  const imageUrl = getImageUrlMovie(image?.url);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" gutterBottom noWrap>
          {title}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" color="primary.main" fontWeight="bold">
          {duration}
          </Typography>
          <Typography variant="h5" color="primary.main" fontWeight="bold">
          {genre}
          </Typography>
          <Button
            variant="contained"
            size="small"
            startIcon={<Popcorn size={18} />}
            onClick={() => navigate(`/movie/${documentId}`)}
          >
            Ver Mais
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CardMovie;
