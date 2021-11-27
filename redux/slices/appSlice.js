import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "user",
  initialState: {
    dashboardState: "snippets_display",
    snippetName: "New Snippet",
    fileName: "",
    themePreference: "dark",
    snippet: [],
    editorActiveTabIndex: 0,
  },
  reducers: {
    SET_DASHBOARD_STATE: (state, action) => {
      return {
        ...state,
        dashboardState: action.payload,
      };
    },
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
    SET_THEME: (state, action) => {
      return {
        ...state,
        themePreference: action.payload,
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
  },
});

export const {
  SET_DASHBOARD_STATE,
  SET_SNIPPET_NAME,
  SET_FILE_NAME,
  SET_THEME,
  SET_SNIPPET,
  SET_EDITOR_ACTIVE_TAB_INDEX,
} = appSlice.actions;

export const selectDashboardState = (state) => state.appStore.dashboardState;
export const selectSnippetName = (state) => state.appStore.snippetName;
export const selectFileName = (state) => state.appStore.fileName;
export const selectTheme = (state) => state.appStore.themePreference;
export const selectSnippet = (state) => state.appStore.snippet;
export const selectActiveTabIndex = (state) =>
  state.appStore.editorActiveTabIndex;

export default appSlice.reducer;
