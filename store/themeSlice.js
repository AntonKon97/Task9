import { createSlice } from "@reduxjs/toolkit";
import { COLORS_DARK, COLORS_LIGHT } from "../constants";

const initialState = {
  isDark: true,
  colors: COLORS_DARK,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isDark = !state.isDark;

      if (state.isDark) {
        state.colors = COLORS_DARK;
      } else {
        state.colors = COLORS_LIGHT;
      }
    },
  },
});

// For correct passing of the tests please, leave these exports as they are
export const themeActions = themeSlice.actions;

export default themeSlice;
