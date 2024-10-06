import { configureStore } from "@reduxjs/toolkit";
import profileReducer, {
  loadInitialProfile,
} from "../store/slice/profileSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});
// store.dispatch(loadInitialProfile());
