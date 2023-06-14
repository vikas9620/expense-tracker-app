import { createSlice } from "@reduxjs/toolkit";

const initialvalue = { isLoggedIn: false, token: null, userId: null };

const authSlice = createSlice({
  name: "auth",
  initialState: initialvalue,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    setToken(state, action) {
      state.token = action.payload.token;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    setUserId(state, action) {
      state.userId = action.payload.userId;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer