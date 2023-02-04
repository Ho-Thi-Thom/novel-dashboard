import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      // check google login
      // add state
      state.user = null;
    },
    logout: (state) => {
      state.user = {};
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
