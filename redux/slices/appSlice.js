import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    fileName: "",
    snippet: {},
    editorActiveTabIndex: 0,
    syntaxTheme: "atomOneDark",
    authLoading: true,
    dashboardNavigationMode: "Snippets",
    snippetsFilters: {
      snippetsDisplay: "ALL",
      snippetsDisplayByLabel: false,
      labels: [],
      snippetsDisplayByTag: false,
      tags: [],
    },
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
    SET_DASHBOARD_NAVIGATION_MODE: (state, action) => {
      return {
        ...state,
        dashboardNavigationMode: action.payload,
      };
    },
    SET_SNIPPETS_FILTERS: (state, action) => {
      return {
        ...state,
        snippetsFilters: action.payload,
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
  SET_DASHBOARD_NAVIGATION_MODE,
  SET_SNIPPETS_FILTERS,
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
export const selectDashboardNavigationMode = (state) =>
  state.appStore.dashboardNavigationMode;
export const selectSnippetsFilters = (state) => state.appStore.snippetsFilters;

export default appSlice.reducer;
