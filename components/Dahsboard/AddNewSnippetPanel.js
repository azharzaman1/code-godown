import { IconButton, Paper, Tooltip } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TWText } from "../../files/theming/TWComponents";
import {
  selectActiveTabIndex,
  selectFileName,
  selectSnippet,
  selectSnippetName,
  selectTheme,
  SET_EDITOR_ACTIVE_TAB_INDEX,
  SET_FILE_NAME,
  SET_SNIPPET,
  SET_SNIPPET_NAME,
} from "../../redux/slices/appSlice";
import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";
import { PlusIcon } from "@heroicons/react/outline";
import { extractExtentionAndLanguage, fetcher } from "../../files/utils";
import useSWR from "swr";
import { useSnackbar } from "notistack";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

const AddNewSnippetPanel = () => {
  const dispatch = useDispatch();
  let snippet = useSelector(selectSnippet);
  const activeTabIndex = useSelector(selectActiveTabIndex);
  const snippetName = useSelector(selectSnippetName);
  const fileName = useSelector(selectFileName);
  const themePreference = useSelector(selectTheme);
  const [addingNewFile, setAddingNewFile] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const { data, error } = useSWR("/api/programming-langs", fetcher);
  const { enqueueSnackbar } = useSnackbar();

  console.log("Active Tab Index", activeTabIndex);
  console.log("Active Tab", snippet[activeTabIndex]);

  const router = useRouter();
  const { display } = router.query;

  // will change a tab in snippet
  const handleEditorChange = (e) => {
    let value = e.target.value;
    const restOfSnippet = snippet.filter((tab) => tab.key !== activeTabIndex);
    console.log("Rest", restOfSnippet);
    let snippetToSet = [
      ...restOfSnippet,
      { ...snippet[activeTabIndex], code: value },
    ];
    console.log("snippetToSet", snippetToSet);
    dispatch(SET_SNIPPET(snippetToSet));
  };

  const handleAddNewFile = (e) => {
    e.preventDefault();
    if (newFileName.includes(".")) {
      const [fileExtention, language] = extractExtentionAndLanguage(
        newFileName,
        data
      );
      let fileToAdd = {
        snippetName: snippetName,
        key: snippet?.length,
        extention: fileExtention,
        fileName: newFileName,
        code: "// start coding here",
        language: language ? language : "unknown",
        languageExtentions: language?.extensions,
      };
      let snippetToSet = [...snippet, fileToAdd];
      dispatch(SET_SNIPPET(snippetToSet));
      setAddingNewFile(false);
      dispatch(SET_EDITOR_ACTIVE_TAB_INDEX(snippet.length));
      setNewFileName("");
    } else {
      enqueueSnackbar(`File name must contain extention, please recheck`, {
        variant: "info",
      });
    }
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
          <div className="editor-navigation text-white flex items-center">
            {snippet &&
              snippet.map(({ fileName, key }) => (
                <button
                  key={key}
                  className={`tab-button ${key === activeTabIndex && "active"}`}
                  onClick={() => {
                    dispatch(SET_EDITOR_ACTIVE_TAB_INDEX(key));
                  }}
                >
                  {fileName}
                </button>
              ))}
            {addingNewFile && (
              <form onSubmit={handleAddNewFile}>
                <input
                  autoFocus
                  value={newFileName}
                  onChange={(e) => {
                    setNewFileName(e.target.value);
                  }}
                  type="text"
                  className="w-32 outline-none bg-transparent pl-2"
                />
                <input type="submit" name="Add" className="hidden" />
              </form>
            )}
            <Tooltip title="Add file" placement="right">
              <IconButton
                onClick={
                  addingNewFile
                    ? handleAddNewFile
                    : () => {
                        setAddingNewFile(true);
                      }
                }
              >
                <PlusIcon className="h-7 p-1 text-gray-200" />
              </IconButton>
            </Tooltip>
          </div>
          <div>
            <CodeEditor
              minHeight="80vh"
              value={snippet[activeTabIndex]?.code}
              language="js"
              placeholder="Please enter code."
              onChange={handleEditorChange}
              padding={15}
              style={{
                fontSize: 14,
                backgroundColor: "#eee",
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewSnippetPanel;
