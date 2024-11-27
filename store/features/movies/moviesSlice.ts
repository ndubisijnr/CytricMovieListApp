import { Movie } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface MoviesState {
  data: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  data: [],
  loading: false,
  error: null,
};

// Async thunk for fetching movies
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await fetch("/api/movies");
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return await response.json();
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default moviesSlice.reducer;
