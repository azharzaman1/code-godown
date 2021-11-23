import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "user",
  initialState: {
    dashboardState: "snippets_display",
    snippetName: "New Snippet",
    fileName: "",
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
  },
});

export const { SET_DASHBOARD_STATE, SET_SNIPPET_NAME, SET_FILE_NAME } =
  appSlice.actions;

export const selectDashboardState = (state) => state.appStore.dashboardState;
export const selectSnippetName = (state) => state.appStore.snippetName;
export const selectFileName = (state) => state.appStore.fileName;

export default appSlice.reducer;
