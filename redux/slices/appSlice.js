import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    snippetName: "New Snippet",
    fileName: "",
    themePreference: "dark",
    snippet: {},
    editorActiveTabIndex: 0,
    labelName: "",
    selectedLabelKey: 0,
    syntaxTheme: "atomOneDark",
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
    RESSET_SNIPPET: (state, action) => {
      return {
        ...state,
        snippet: {},
        snippetName: "",
        fileName: "",
        selectedLabelKey: 0,
        labelName: "",
        editorActiveTabIndex: 0,
      };
    },
    SET_LABEL_NAME: (state, action) => {
      return {
        ...state,
        labelName: action.payload,
      };
    },
    SET_SELECTED_LABEL_KEY: (state, action) => {
      return {
        ...state,
        selectedLabelKey: action.payload,
      };
    },
    SET_SYNTAX_THEME: (state, action) => {
      return {
        ...state,
        syntaxTheme: action.payload,
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
  RESSET_SNIPPET,
  SET_LABEL_NAME,
  SET_SELECTED_LABEL_KEY,
  SET_SYNTAX_THEME,
} = appSlice.actions;

export const selectSnippetName = (state) => state.appStore.snippetName;
export const selectFileName = (state) => state.appStore.fileName;
export const selectTheme = (state) => state.appStore.themePreference;
export const selectSnippet = (state) => state.appStore.snippet;
export const selectActiveTabIndex = (state) =>
  state.appStore.editorActiveTabIndex;
export const selectLabelName = (state) => state.appStore.labelName;
export const selectSelectedLabelKey = (state) =>
  state.appStore.selectedLabelKey;
export const selectSyntaxTheme = (state) => state.appStore.syntaxTheme;

export default appSlice.reducer;
