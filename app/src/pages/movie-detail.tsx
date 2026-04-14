/* eslint-disable react-hooks/preserve-manual-memoization */
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import type { Movie } from "../types";
import { useQuery } from "@tanstack/react-query";
import { MINUTES_30 } from "../constants";
import { api } from "../services/api";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import { useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/slices/auth-slice";
import { addReview } from "../store/slices/review-slice";
import { MovieDetailSkeleton } from "../components/MovieDetail";
import MovieDetail from "../components/MovieDetail";

interface ResponseSingleMovie {
  data: Movie;
}

function PageMovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {isAuthenticated} = useSelector(selectAuth)

  const {
    data: movieData,
    isLoading,
    isError,
  } = useQuery<ResponseSingleMovie>({
    queryKey: ["movie", id],
    queryFn: async () => {
      const response = await api.get(`/movies/${id}?populate=image`);
      return response.data;
    },
    enabled: !!id,
    staleTime: MINUTES_30,
  });

  const handleAddReview = useCallback(
  async (movieId: number, rating: number | null) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!movieData?.data || rating === null) return;

    try {
      await dispatch(
        addReview({
          movie: movieData.data,
          rating,
        }),
      ).unwrap();

      toast.success(`Avaliação para "${movieData.data.title}" salva com sucesso!`);
    } catch {
      toast.error("Não foi possível salvar a avaliação.");
    }
  },
  [dispatch, isAuthenticated, movieData, navigate, toast],
);

  if (isLoading) {
    return (
      <Box py={4}>
        <MovieDetailSkeleton />
      </Box>
    );
  }

  if (isError || !movieData) {
    return (
      <Box textAlign="center" py={10}>
        <Typography variant="h5" color="error" gutterBottom>
          Filme não encontrado.
        </Typography>
        <Button
          startIcon={<ArrowLeft />}
          onClick={() => navigate("/movies")}
          sx={{ mt: 2 }}
        >
          Voltar para catálogo de filmes
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowLeft />}
        onClick={() => navigate("/movies")}
        sx={{ mb: 4, color: "text.secondary" }}
      >
        Voltar para a vitrine
      </Button>
      <MovieDetail onAddToMyReviews={handleAddReview} movie={movieData.data} />
    </Box>
  );
}

export default PageMovieDetail;