import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  user: any;
  isAuthenticated: boolean;
  token: string | null;
  status: "idle" | "loading" | "fulfilled" | "rejected";
  error: any;
};

// Define a type for the slice state
const initialState: InitialStateType = {
  user: null,
  isAuthenticated: false,
  token: null,
  status: "idle",
  error: null,
};

/**
 * authSlice is a reducer function that accepts state and action as arguments,
 * and returns the next state of the app.
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.token;
      state.token = action.payload.token;
    },

    login: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.status = "idle";
    },

    setAuthStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setCredentials, login, logout, setAuthStatus } =
  authSlice.actions;
export default authSlice.reducer;
