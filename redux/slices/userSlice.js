import { createSlice } from "@reduxjs/toolkit";

const userRoles = {
  Admin: 5150,
  User: 2001,
  Student: 9100,
  Contributor: 1998,
  Moderator: 2025,
  Editor: 1984,
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    persistSession: true,
    snippets: [],
    labels: [],
    userType: "",
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
    SET_SESSION_PERSIST: (state, action) => {
      return {
        ...state,
        persistSession: action.payload,
      };
    },
    SET_USER_TYPE: (state, action) => {
      return {
        ...state,
        userType: action?.payload?.includes(userRoles.Admin)
          ? "Admin"
          : action?.payload?.includes(userRoles.Student)
          ? "Student"
          : action?.payload?.includes(userRoles.Student) &&
            !action?.payload?.includes(userRoles.Admin) &&
            !action?.payload?.includes(userRoles.Student)
          ? "User"
          : "",
      };
    },
    SET_SNIPPETS: (state, action) => {
      return {
        ...state,
        snippets: action.payload,
      };
    },
    SET_LABELS: (state, action) => {
      return {
        ...state,
        labels: action.payload,
      };
    },
  },
});

export const {
  SET_USER,
  SET_USER_TYPE,
  LOGOUT,
  SET_SESSION_PERSIST,
  SET_SNIPPETS,
  SET_LABELS,
} = userSlice.actions;

export const selectUser = (state) => state.userStore.currentUser;
export const selectSessionPersist = (state) => state.userStore.persistSession;
export const selectUserType = (state) => state.userStore.userType;
export const selectSnippets = (state) => state.userStore.snippets;
export const selectLabels = (state) => state.userStore.labels;

export const selectAllTags = (state) => {
  let snippetsArr = [...state.userStore.snippets];
  let tags = [];
  snippetsArr.forEach((snippet) => {
    tags = tags.concat(snippet.tags);
  });
  console.log(tags);
  const tagsArr = tags.map((tag) => tag.name);
  return [...new Set(tagsArr)];
};

export default userSlice.reducer;
