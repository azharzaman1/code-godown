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
  },
});

export const { SET_USER } = userSlice.actions;

export const selectUser = (state) => state.userStore.currentUser;
export const selectUserInDB = (state) => state.userStore.userInDB;
export const selectLoggedOutState = (state) =>
  state.userStore.loggedOutRecently;
export const selectSnippets = (state) => state.userStore.snippets;

export default userSlice.reducer;
