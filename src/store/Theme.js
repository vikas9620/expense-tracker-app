import { createSlice } from "@reduxjs/toolkit";

const initialvalue = { premium: false, darkMode: false };

const themeSlice = createSlice({
  name: "theme",
  initialState: initialvalue,
  reducers: {
    activatePremium(state) {
      state.premium = !state.premium;
    },
    
    toggleTheme(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const themeAction = themeSlice.actions;

export default themeSlice.reducer;
