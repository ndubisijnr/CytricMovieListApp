import { Movie } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
interface MoviesState {
  data: Movie[];
  loading: boolean;
  error: string | null;
  imageUrl:string | null;
}

const initialState: MoviesState = {
  data: [],
  loading: false,
  error: null,
  imageUrl:null
};


// Async thunk for fetching movies
export const fetchMovies = createAsyncThunk<Movie[]>(
  "movies/fetchMovies",
  async () => {
    const response = await fetch("/api/movies");

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    return (
        await response.json()) as Movie[];
  }
);

// Async thunk for creating a movie
export const createMovie = createAsyncThunk<Movie, {updates:Partial<Movie>}>("movies/createMovie", async ({updates}) => {
    const response = await fetch(`/api/movies`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(updates),
    });

    if (!response.ok) {

        console.log(response);
    }

    return (await response.json()) as Movie;
});


// Async thunk for editing a movie
export const editMovie = createAsyncThunk<
  Movie,
  { slug: string; updates: Partial<Movie> }
>("movies/editMovie", async ({ slug, updates }) => {
  const response = await fetch(`/api/movies/${slug}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Failed to edit movie");
  }

  return (await response.json()) as Movie;
});

// Async thunk for deleting a movie
export const deleteMovie = createAsyncThunk<string, string>(
  "movies/deleteMovie",
  async (slug) => {
    const response = await fetch(`/api/movies/${slug}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete movie");
    }

    return slug; // Return the deleted movie ID
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        // Handling createMovie
        .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
        .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })

        // Handling editMovie
       .addCase(editMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       .addCase(editMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.loading = false;
        const index = state.data.findIndex(
          (movie) => movie.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload; // Update the movie data
        }
      })
       .addCase(editMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to edit movie";
      })

        // Handling deleteMovie
       .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       .addCase(deleteMovie.fulfilled, (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.data = state.data.filter(
            (movie) => movie.id !== action.payload
          );
        })
       .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete movie";
      });
  },
});

export default moviesSlice.reducer;
