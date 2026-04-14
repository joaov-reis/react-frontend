import { Alert, Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { CartItemSkeleton } from "../components/Cart/CartItemSkeleton";
import { CartEmpty } from "../components/Cart/CartEmpty";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../store";
import CartSummary from "../components/Cart/CartSummary";
import CartItemRow from "../components/Cart/CartItemRow";
import { fetchReviews, removeReview, selectReviews, updateReview } from "../store/slices/review-slice";

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

      {isLoading && <CartItemSkeleton />}
      {isEmpty && <CartEmpty />}

      {hasItems && (
        <Grid container spacing={4} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 8 }}>
            {reviews.map((review) => (
              <CartItemRow
                key={review.documentId}
                review={review}
                isProcessing={processingItemIds.includes(review.documentId)}
                onRemove={handleRemove}
                onUpdateQuantity={handleUpdateRating}
              />
            ))}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CartSummary
              totalAmount={0}
              totalQuantity={0}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default MyReviewsPage;