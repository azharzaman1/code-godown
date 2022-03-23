import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    snippetName: "New Snippet",
    fileName: "",
    snippet: {},
    editorActiveTabIndex: 0,
    syntaxTheme: "a11yDark",
    dashboardLoading: true,
  },
  reducers: {
    SET_SNIPPET_NAME: (state, action) => {
      return {
        ...state,
        snippetName: action.payload,
      };
    },
    SET_FILE_NAME: (state, action) => {
      return {
        ...state,
        fileName: action.payload,
      };
    },
    SET_SNIPPET: (state, action) => {
      return {
        ...state,
        snippet: action.payload,
      };
    },
    SET_EDITOR_ACTIVE_TAB_INDEX: (state, action) => {
      return {
        ...state,
        editorActiveTabIndex: action.payload,
      };
    },
    RESET_SNIPPET: (state, action) => {
      return {
        ...state,
        snippet: {},
        snippetName: "",
        fileName: "",
        editorActiveTabIndex: 0,
      };
    },
    SET_SYNTAX_THEME: (state, action) => {
      return {
        ...state,
        syntaxTheme: action.payload,
      };
    },
    SET_DASHBOARD_LOADING: (state, action) => {
      return {
        ...state,
        dashboardLoading: action.payload,
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

export default appSlice.reducer;
