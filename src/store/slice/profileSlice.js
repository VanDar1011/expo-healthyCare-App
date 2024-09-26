import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userId: null,
    email: null,
    name: null,
  },
  reducers: {
    setProfileRedux: (state, action) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    clearProfileRedux: (state) => {
      state.userId = null;
      state.email = null;
      state.name = null;
    },
  },
});

export const { setProfileRedux, clearProfileRedux } = profileSlice.actions;
export default profileSlice.reducer;
