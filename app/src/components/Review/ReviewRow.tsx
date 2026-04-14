import { Box, CircularProgress, Divider, IconButton, Typography } from "@mui/material";
import type { MyReview } from "../../types";
import { getImageUrlProduct } from "../../utils/generateImageProduct";
import { useCallback } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

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
  const imageUrl = getImageUrlProduct(movie.image?.url);
  const ratingValue = rating;

  const handleIncrement = useCallback(() => {
    onUpdateRating(documentId, rating + 1);
  }, [documentId, rating, onUpdateRating]);

  const handleDecrement = useCallback(() => {
    if (rating <= 1) {
      onRemove(documentId);
    } else {
      onUpdateRating(documentId, rating - 1);
    }
  }, [documentId, rating, onRemove, onUpdateRating]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          py: 2,
          opacity: isProcessing ? 0.6 : 1,
          transition: "opacity 0.2s",
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          alt={movie.title}
          sx={{
            width: 80,
            height: 80,
            objectFit: "cover",
            borderRadius: 1,
            flexShrink: 0,
          }}
        />

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="subtitle1" fontWeight={600} noWrap>
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gênero: {movie.genre}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton
            size="small"
            onClick={handleDecrement}
            disabled={isProcessing}
            aria-label="Diminuir quantidade"
          >
            <Minus size={16} />
          </IconButton>
          <Box sx={{ width: 32, textAlign: "center" }}>
            {isProcessing ? (
              <CircularProgress size={16} />
            ) : (
              <Typography variant="body1" fontWeight={600}>
                {rating}
              </Typography>
            )}
          </Box>
          <IconButton
            size="small"
            onClick={handleIncrement}
            disabled={isProcessing}
            aria-label="Aumentar quantidade"
          >
            <Plus size={16} />
          </IconButton>
        </Box>

        <Typography
          variant="subtitle1"
          fontWeight={700}
          color="primary.main"
          sx={{ minWidth: 80, textAlign: "right" }}
        >
          {ratingValue.toFixed(0)}
        </Typography>
        <IconButton
          color="error"
          size="small"
          onClick={() => onRemove(documentId)}
          disabled={isProcessing}
          aria-label="Remover item"
        >
          <Trash2 size={18} />
        </IconButton>
      </Box>
      <Divider />
    </>
  );
}

export default ReviewRow;