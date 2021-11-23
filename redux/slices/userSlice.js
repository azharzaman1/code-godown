import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    userInDB: null,
    loggedOutRecently: false,
  },
  reducers: {
    SETUSER: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
        loggedOutRecently: false,
      };
    },

    SET_USER_FROM_DB: (state, action) => {
      return {
        ...state,
        userInDB: action.payload,
      };
    },

    LOGOUT: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
        loggedOutRecently: true,
      };
    },
  },
});

export const { SETUSER, LOGOUT, SET_USER_FROM_DB } = userSlice.actions;

export const selectUser = (state) => state.userStore.currentUser;
export const selectUserFromDB = (state) => state.userStore.userInDB;
export const selectLoggedOutState = (state) =>
  state.userStore.loggedOutRecently;

export default userSlice.reducer;
