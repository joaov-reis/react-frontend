/* eslint-disable react-hooks/set-state-in-effect */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Box, TextField, Typography } from "@mui/material";
import { useDebounce } from "../hooks/useDebounce";
import { MINUTES_30 } from "../constants";
import MovieList from "../components/MovieList";
import type { ResponseMovies } from "../types";

function Movies() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const pageSize = 1;

  const debouncedSearch = useDebounce<string>(searchTerm, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, isError } = useQuery<ResponseMovies>({
    queryKey: ["movies", page, debouncedSearch],
    queryFn: async () => {
      let url = `/movies?populate=poster&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

      if (debouncedSearch) {
        url += `&filters[$or][0][title][$containsi]=${debouncedSearch}`;
      }
      const { data } = await api.get(url);
      return data;
    },
    staleTime: MINUTES_30,
    placeholderData: (previousData) => previousData,
  });

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 4, color: "primary.main" }}
      >
        Filmes
      </Typography>

      <SearchBar onChange={setSearchTerm} value={searchTerm} />
      <MovieList
        isLoading={isLoading}
        isError={isError}
        data={data}
        searchText={debouncedSearch}
        page={page}
        setPage={setPage}
        totalPage={pageSize}
      />
    </Box>
  );
}

export default Movies;

const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <Box sx={{ mb: 4 }}>
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Buscar por nome ou descrição..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ backgroundColor: "background.paper", borderRadius: 1 }}
    />
  </Box>
);
