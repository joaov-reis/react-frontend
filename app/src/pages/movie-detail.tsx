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

  const handleAddReview = useCallback(async () => {
    if (!isAuthenticated) return navigate("/login")

    if (!movieData?.data) return;
    try {
      await dispatch(addReview(movieData.data)).unwrap();
      toast.success(
        `Filme "${movieData.data.title}" adicionado as suas avaliações!`,
      );
    } catch {
      toast.error("Não foi possível adicionar o filme às avaliações.");
    }
  }, [movieData, dispatch, toast, isAuthenticated]);

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
          onClick={() => navigate("/products")}
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