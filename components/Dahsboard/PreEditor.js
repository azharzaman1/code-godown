import { Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  selectFileName,
  selectSnippetName,
  selectTheme,
  SET_FILE_NAME,
  SET_SNIPPET_NAME,
} from "../../redux/slices/appSlice";
import ThemeText from "../Generic/Text";

const PreEditor = () => {
  const dispatch = useDispatch();
  const snippetName = useSelector(selectSnippetName);
  const fileName = useSelector(selectFileName);
  const themePreference = useSelector(selectTheme);

  return (
    <Paper className="pt-4 pb-8 px-4">
      <form>
        <div className="flex flex-col space-y-2 mt-4">
          <ThemeText component="label" htmlFor="snippet_name_input">
            Snippet name
          </ThemeText>
          <input
            type="text"
            placeholder="e.g. Snippet #1"
            id="snippet_name_input"
            className={`input max-w-sm ${themePreference === "dark" && "dark"}`}
            value={snippetName}
            onChange={(e) => dispatch(SET_SNIPPET_NAME(e.target.value))}
          />
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <ThemeText component="label" htmlFor="file_name_input">
            File name
          </ThemeText>
          <input
            type="text"
            placeholder="e.g. index.html"
            id="file_name_input"
            className={`input max-w-sm ${themePreference === "dark" && "dark"}`}
            value={fileName}
            onChange={(e) => dispatch(SET_FILE_NAME(e.target.value))}
          />
        </div>
      </form>
    </Paper>
  );
};

export default PreEditor;
