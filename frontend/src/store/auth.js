import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    id: null,
    token: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.id = null;
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions; // Correctly export authActions
export default authSlice.reducer;
