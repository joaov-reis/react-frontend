import { Alert, Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../store";
import { fetchReviews, removeReview, selectReviews, updateReview } from "../store/slices/review-slice";
import { ReviewsEmpty } from "../components/Review/ReviewEmpty";
import { ReviewSkeleton } from "../components/Review/ReviewSkeleton";
import ReviewRow from "../components/Review/ReviewRow";

function MyReviewsPage() {
  const dispatch = useAppDispatch();
  const {
    reviews,
    status,
    error,
    processingItemIds,
  } = useSelector(selectReviews);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const handleUpdateRating = useCallback(
    (documentId: string, rating: number) => {
      dispatch(updateReview({ documentId, rating }));
    },
    [dispatch],
  );

  const handleRemove = useCallback(
    (documentId: string) => {
      dispatch(removeReview(documentId));
    },
    [dispatch],
  );

  const isLoading = status === "loading";
  const isFailed = status === "failed";
  const isEmpty = status === "succeeded" && reviews.length === 0;
  const hasItems = status === "succeeded" && reviews.length > 0;

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight={700}
        color="primary.main"
        sx={{ mb: 4 }}
      >
        Minhas Avaliações
      </Typography>

      {isFailed && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error ?? "Ocorreu um erro ao carregar as avaliações."}
        </Alert>
      )}

      {isLoading && <ReviewSkeleton />}
      {isEmpty && <ReviewsEmpty />}

      {hasItems && (
        <Grid container spacing={4} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 8 }}>
            {reviews.map((review) => (
              <ReviewRow
                key={review.documentId}
                review={review}
                isProcessing={processingItemIds.includes(review.documentId)}
                onRemove={handleRemove}
                onUpdateRating={handleUpdateRating}
              />
            ))}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default MyReviewsPage;