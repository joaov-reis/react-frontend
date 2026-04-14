import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import type { RootState } from "..";
import { logout } from "./auth-slice";
import type {
  Movie,
  MyReview,
  ResponseMyReviews,
} from "../../types";

const StatusReview = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
} as const;

type StatusReview = (typeof StatusReview)[keyof typeof StatusReview];

interface ReviewState {
  reviews: MyReview[];
  status: StatusReview;
  error: string | null;
  processingItemIds: string[];
}

const initialState: ReviewState = {
  reviews: [],
  status: StatusReview.IDLE,
  error: null,
  processingItemIds: [],
};

export const fetchReviews = createAsyncThunk(
  "review/fetchReviews",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<ResponseMyReviews>(
        "/my-reviews?populate[filme][populate][image]=*",
      );
      return data.data;
    } catch {
      return rejectWithValue(
        "Não foi possível carregar sua página de avaliações.",
      );
    }
  },
);

export const updateReview = createAsyncThunk(
  "review/updateReview",
  async (
    { documentId, rating }: { documentId: string; rating: number },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await api.put(`/my-reviews/${documentId}`, {
        data: { rating },
      });
      return data.data as MyReview;
    } catch {
      return rejectWithValue("Não foi possível atualizar a avaliação.");
    }
  },
);

export const addReview = createAsyncThunk(
  "review/addReview",
  async (movie: Movie, { dispatch, rejectWithValue }) => {
    try {
      const { data: existing } = await api.get<ResponseMyReviews>(
        `/my-reviews?filters[movie][documentId][$eq]=${movie.documentId}&populate[product][populate][image]=*`,
      );
      const existingReview = existing.data[0] ?? null;

      if (existingReview) {
        await dispatch(
          updateReview({
            documentId: existingReview.documentId,
            rating: existingReview.rating + 1,
          }),
        );
        return null;
      }

      const { data } = await api.post("/my-reviews", {
        data: {
          movie: movie.documentId,
          rating: 1,
        },
      });

      return { ...data.data, movie } as MyReview;
    } catch {
      return rejectWithValue("Não foi possível adicionar a avaliação.");
    }
  },
);

export const removeReview = createAsyncThunk(
  "review/removeReview",
  async (documentId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/my-reviews/${documentId}`);
      return documentId;
    } catch {
      return rejectWithValue("Não foi possível remover a avaliação.");
    }
  },
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearReviews: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => {
      return initialState;
    });

    builder.addCase(fetchReviews.pending, (state) => {
      state.status = StatusReview.LOADING;
      state.error = null;
    });

    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.status = StatusReview.SUCCEEDED;
      state.reviews = action.payload;
    });

    builder.addCase(fetchReviews.rejected, (state, action) => {
      state.status = StatusReview.FAILED;
      state.reviews = [];
      state.error = action.payload as string;
    });

    builder.addCase(addReview.fulfilled, (state, action) => {
      if (action.payload) {
        state.reviews.push(action.payload);
      }
    });

    builder.addCase(updateReview.pending, (state, action) => {
      state.processingItemIds.push(action.meta.arg.documentId);
    });

    builder.addCase(updateReview.fulfilled, (state, action) => {
      state.processingItemIds = state.processingItemIds.filter(
        (id) => id !== action.meta.arg.documentId,
      );
      const index = state.reviews.findIndex(
        (item) => item.documentId === action.payload.documentId,
      );
      if (index !== -1) {
        state.reviews[index].rating = action.payload.rating;
      }
    });
    builder.addCase(updateReview.rejected, (state, action) => {
      state.processingItemIds = state.processingItemIds.filter(
        (id) => id !== action.meta.arg.documentId,
      );
    });

    builder.addCase(removeReview.pending, (state, action) => {
      state.processingItemIds.push(action.meta.arg);
    });

    builder.addCase(removeReview.fulfilled, (state, action) => {
      state.processingItemIds = state.processingItemIds.filter(
        (id) => id !== action.payload,
      );
      state.reviews = state.reviews.filter(
        (review) => review.documentId !== action.payload,
      );
    });
    builder.addCase(removeReview.rejected, (state, action) => {
      state.processingItemIds = state.processingItemIds.filter(
        (id) => id !== action.meta.arg,
      );
    });
  },
});

export const selectReviews = (state: RootState) => state.reviews;
export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
