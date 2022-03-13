import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    SET_USER: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    LOGOUT: (state, action) => {
      return {
        ...state,
        currentUser: null,
      };
    },
  },
});

export const { SET_USER, LOGOUT } = userSlice.actions;

export const selectUser = (state) => state.userStore.currentUser;

export default userSlice.reducer;
