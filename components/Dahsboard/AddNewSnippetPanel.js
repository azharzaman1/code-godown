import { Paper } from "@mui/material";
import { useRouter } from "next/dist/client/router";
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
  const dispatch = useDispatch();
  const snippetName = useSelector(selectSnippetName);
  const fileName = useSelector(selectFileName);
  const themePreference = useSelector(selectTheme);

  const router = useRouter();
  const { display } = router.query;

  console.log("hy", display);

  return (
    <>
      {/* Adding new snippet phase 1 [Info] */}
      {display === "add-new-snippet-info" || display === "saving-snippet" ? (
        <Paper className="addingNewSnippet__intialPhaseContainer pt-4 pb-8 px-4 my-4 mx-4">
          <form>
            <div className="flex flex-col space-y-2 mt-4">
              <TWText
                dark={themePreference === "dark"}
                component="label"
                htmlFor="snippet_name_input"
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
            {display === "add-new-snippet-info" && (
              <div className="flex flex-col space-y-2 mt-4">
                <TWText
                  dark={themePreference === "dark"}
                  component="label"
                  htmlFor="file_name_input"
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
            )}
          </form>
        </Paper>
      ) : (
        <></>
      )}

      {/* Adding new snippet phase 2 [Coding] */}

      {display === "finalize-new-snippet" && <Editor />}
    </>
  );
};

export default AddNewSnippetPanel;
