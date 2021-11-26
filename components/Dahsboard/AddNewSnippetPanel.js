import { Paper } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TWText } from "../../files/theming/TWComponents";
import {
  selectFileName,
  selectSnippetName,
  selectTheme,
  SET_FILE_NAME,
  SET_SNIPPET_NAME,
} from "../../redux/slices/appSlice";
import Editor from "./Editor";

const AddNewSnippetPanel = () => {
  const [code, setCode] = useState("// Enter your code here");
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("light");
  const snippetName = useSelector(selectSnippetName);
  const fileName = useSelector(selectFileName);
  const dispatch = useDispatch();
  const themePreference = useSelector(selectTheme);

  console.log(code);

  const router = useRouter();
  const { display } = router.query;

  return (
    <>
      {display === "add-new-snippet-info" && (
        <Paper className="addingNewSnippet__intialPhaseContainer pt-4 pb-8 px-4 my-4 mx-4">
          <form>
            <div className="flex flex-col space-y-2 mt-4">
              <TWText
                dark={themePreference === "dark"}
                component="label"
                for="snippet_name_input"
              >
                Snippet name
              </TWText>
              <input
                type="text"
                placeholder="e.g. Snippet #1"
                id="snippet_name_input"
                className={`input max-w-sm ${
                  themePreference === "dark" && "dark"
                }`}
                value={snippetName}
                onChange={(e) => dispatch(SET_SNIPPET_NAME(e.target.value))}
              />
            </div>

            <div className="flex flex-col space-y-2 mt-4">
              <TWText
                dark={themePreference === "dark"}
                component="label"
                for="file_name_input"
              >
                File name
              </TWText>
              <input
                type="text"
                placeholder="e.g. index.html"
                id="file_name_input"
                className={`input max-w-sm ${
                  themePreference === "dark" && "dark"
                }`}
                value={fileName}
                onChange={(e) => dispatch(SET_FILE_NAME(e.target.value))}
              />
            </div>
          </form>
        </Paper>
      )}

      {display === "finalize-new-snippet" && (
        <div className="editor-container w-full">
          <Editor />
        </div>
      )}
    </>
  );
};

export default AddNewSnippetPanel;
