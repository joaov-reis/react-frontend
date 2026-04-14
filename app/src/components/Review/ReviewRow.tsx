import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import type { MyReview } from "../../types";
import { getImageUrlMovie } from "../../utils/generateImageMovie";
import { useCallback } from "react";
import { Trash2 } from "lucide-react";

interface ReviewRowProps {
  review: MyReview;
  isProcessing: boolean;
  onUpdateRating: (documentId: string, rating: number) => void;
  onRemove: (documentId: string) => void;
}

function ReviewRow({
  isProcessing,
  review,
  onRemove,
  onUpdateRating,
}: ReviewRowProps) {
  const { documentId, rating, movie } = review;
  const imageUrl = getImageUrlMovie(movie.image?.url);

  const handleChangeRating = useCallback(
    (_: React.SyntheticEvent, newValue: number | null) => {
      if (newValue === null) return;
      onUpdateRating(documentId, newValue);
    },
    [documentId, onUpdateRating],
  );

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        py={2}
      >
        <Box display="flex" gap={2} alignItems="center">
          <Box
            component="img"
            src={imageUrl}
            alt={movie.title}
            sx={{
              width: 80,
              height: 120,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />

          <Box>
            <Typography variant="h6" fontWeight={700}>
              {movie.title}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Gênero: {movie.genre}
            </Typography>

            {isProcessing ? (
              <CircularProgress size={20} />
            ) : (
              <Box display="flex" alignItems="center" gap={1}>
                <Rating
                  value={rating}
                  precision={1}
                  onChange={handleChangeRating}
                />
                <Typography variant="body2" color="text.secondary">
                  {rating}/5
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <IconButton
          onClick={() => onRemove(documentId)}
          disabled={isProcessing}
          aria-label="Remover avaliação"
        >
          <Trash2 size={18} />
        </IconButton>
      </Box>

      <Divider />
    </>
  );
}

export default ReviewRow;