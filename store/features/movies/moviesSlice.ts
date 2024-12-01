import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Movie} from "@prisma/client";
// Define the initial state
interface MoviesState {
  data: Movie[];
  loading: boolean;
  error: string | null;
  imageUrl: string | null;
}

type UpdateMovie = {
  id: string;
  title: string,
  published: string,
  poster: string
}

type createMovie = {
  title: string,
  published: string,
  poster: string
}

const initialState: MoviesState = {
  data: [],
  loading: false,
  error: null,
  imageUrl: null,
};

// Async thunk for fetching movies
export const fetchMovies = createAsyncThunk<Movie[]>(
  "movies/fetchMovies",
  async () => {
    const response = await fetch("/api/movies");

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    return (await response.json()) as Movie[];
  }
);

// Async thunk for creating a movie
export const createMovie = createAsyncThunk<Movie, { updates: Partial<createMovie> }>(
  "movies/createMovie",
  async (updates) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("Access token is missing");
        throw new Error("Unauthorized: Access token not found");
      }

      console.log(updates);

      const response = await fetch(`/api/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error:", errorText);
        throw new Error(`Failed to create movie: ${response.statusText}`);
      }

      return (await response.json()) as Movie;
    } catch (error) {
      console.error("Error in createMovie thunk:", error);
      throw error;
    }
  }
);

// Async thunk for editing a movie
export const editMovie = createAsyncThunk<
  Movie,
  { slug: string; updates: Partial<UpdateMovie> }
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
      .addCase(
        deleteMovie.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.data = state.data.filter(
            (movie) => movie.id !== action.payload
          );
        }
      )
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete movie";
      });
  },
});

export default moviesSlice.reducer;
