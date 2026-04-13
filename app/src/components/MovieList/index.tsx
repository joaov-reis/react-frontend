import { Grid, Typography } from "@mui/material";
import type { ResponseMovies } from "../../types";
import CardMovie, { CardSkeleton } from "../CardMovie";
import { PaginationCustom } from "../PaginationCustom";

interface MovieListProps {
  isLoading: boolean;
  isError: boolean;
  data?: ResponseMovies;
  searchText: string;
  page: number;
  totalPage?: number;
  setPage: (page: number) => void;
}
function MovieList({
  isLoading,
  isError,
  data,
  searchText,
  page,
  setPage,
  totalPage = 6,
}: MovieListProps) {
  if (isLoading) {
    return (
      <Grid container spacing={4}>
        {Array.from(new Array(totalPage)).map((_, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <CardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center" sx={{ py: 5 }}>
        Erro ao carregar os filmes.
      </Typography>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <Typography align="center" color="text.secondary" sx={{ py: 5 }}>
        Nenhum filme encontrado para "{searchText}".
      </Typography>
    );
  }

  return (
    <>
      <Grid container spacing={4}>
        {data.data.map((movie) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={movie.documentId}>
            <CardMovie movie={movie} />
          </Grid>
        ))}
      </Grid>

      <PaginationCustom
        pageCount={data?.meta?.pagination?.pageCount || 0}
        page={page}
        onChange={setPage}
      />
    </>
  );
}

export default MovieList;