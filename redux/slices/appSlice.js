import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    fileName: "",
    snippet: {},
    editorActiveTabIndex: 0,
    syntaxTheme: "atomOneDark",
    authLoading: true,
  },
  reducers: {
    SET_SNIPPET: (state, action) => {
      return {
        ...state,
        snippet: action.payload,
      };
    },
    RESET_SNIPPET: (state, action) => {
      return {
        ...state,
        snippet: {},
        fileName: "",
        editorActiveTabIndex: 0,
      };
    },
    SET_FILE_NAME: (state, action) => {
      return {
        ...state,
        fileName: action.payload,
      };
    },
    SET_EDITOR_ACTIVE_TAB_INDEX: (state, action) => {
      return {
        ...state,
        editorActiveTabIndex: action.payload,
      };
    },
    SET_SYNTAX_THEME: (state, action) => {
      return {
        ...state,
        syntaxTheme: action.payload,
      };
    },
    SET_AUTH_LOADING: (state, action) => {
      return {
        ...state,
        authLoading: action.payload,
      };
    },
  },
});

export const {
  SET_DASHBOARD_STATE,
  SET_SNIPPET_NAME,
  SET_FILE_NAME,
  SET_SNIPPET,
  SET_EDITOR_ACTIVE_TAB_INDEX,
  RESET_SNIPPET,
  SET_SYNTAX_THEME,
  SET_AUTH_LOADING,
} = appSlice.actions;

export const selectSnippetName = (state) => state.appStore.snippetName;
export const selectFileName = (state) => state.appStore.fileName;
export const selectSnippet = (state) => state.appStore.snippet;
export const selectActiveTabIndex = (state) =>
  state.appStore.editorActiveTabIndex;
export const selectSyntaxTheme = (state) => state.appStore.syntaxTheme;
export const selectDashboardLoading = (state) =>
  state.appStore.dashboardLoading;
export const selectDashboardCurrentState = (state) =>
  state.appStore.dashboardCurrentState;
export const selectAuthLoading = (state) => state.appStore.authLoading;

export default appSlice.reducer;
