import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state for authentication
interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; email: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Async thunk for logging in a user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }) => {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json(); // This should return user data and a token

    // Store the access token in localStorage
    localStorage.setItem("accessToken", data.accessToken);

    return data;
  }
);

// Async thunk for logging out a user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  return;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle login pending
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle login success
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: { id: string; email: string };
            accessToken: string;
          }>
        ) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
          localStorage.setItem("accessToken", action.payload.accessToken); // Store the token
        }
      )
      // Handle login failure
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })
      // Handle logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem("accessToken"); // Remove the token
      });
  },
});

export default authSlice.reducer;
