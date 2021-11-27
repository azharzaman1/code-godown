import { Paper } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { options } from "../../files/editorOptions";
import { TWText } from "../../files/theming/TWComponents";
import {
  selectActiveTabIndex,
  selectFileName,
  selectSnippet,
  selectSnippetName,
  selectTheme,
  SET_FILE_NAME,
  SET_SNIPPET,
  SET_SNIPPET_NAME,
} from "../../redux/slices/appSlice";
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const AddNewSnippetPanel = () => {
  const dispatch = useDispatch();
  const snippet = useSelector(selectSnippet);
  const activeTabIndex = useSelector(selectActiveTabIndex);
  const snippetName = useSelector(selectSnippetName);
  const fileName = useSelector(selectFileName);
  const themePreference = useSelector(selectTheme);
  const [theme, setTheme] = useState("vs-dark");

  console.log("Active Tab Index", activeTabIndex);
  console.log("Active Tab", snippet[activeTabIndex]);

  const router = useRouter();
  const { display } = router.query;

  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    console.log("Mounted");
  }

  // will change a tab in snippet
  const handleEditorChange = (value, e) => {
    const restOfSnippet = snippet.filter((tab) => tab.key !== activeTabIndex);
    console.log("Rest", restOfSnippet);
    let snippetToSet = [
      ...restOfSnippet,
      { ...snippet[activeTabIndex], code: value },
    ];
    console.log("snippetToSet", snippetToSet);
    // dispatch(SET_SNIPPET(snippetToSet));
  };

  return (
    <>
      {display === "add-new-snippet-info" && (
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
          </form>
        </Paper>
      )}

      {display === "finalize-new-snippet" && (
        <div className="editor-container w-full">
          <Editor
            height="100vh"
            defaultLanguage={snippet[
              activeTabIndex
            ]?.language?.name.toLowerCase()}
            defaultValue={snippet[activeTabIndex]?.code}
            theme={theme}
            options={options}
            onMount={handleEditorDidMount}
            onChange={handleEditorChange}
          />
        </div>
      )}
    </>
  );
};

export default AddNewSnippetPanel;
