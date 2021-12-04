import { IconButton, Paper, Tooltip } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
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
  SET_UNFILLED_TAB_INDEXS,
} from "../../redux/slices/appSlice";
import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";
import { PlusIcon, XIcon } from "@heroicons/react/outline";
import {
  extractExtentionAndLanguage,
  fetcher,
  splitAtCharacter,
} from "../../files/utils";
import useSWR from "swr";
import { useSnackbar } from "notistack";
import Dialog from "../Generic/Dialog";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

const AddNewSnippetPanel = () => {
  const dispatch = useDispatch();
  let snippet = useSelector(selectSnippet);
  const activeTabIndex = useSelector(selectActiveTabIndex);
  const [activeTab, setActiveTab] = useState(
    snippet?.find((tab) => tab.key == activeTabIndex)
  );

  const snippetName = useSelector(selectSnippetName);
  const fileName = useSelector(selectFileName);
  const themePreference = useSelector(selectTheme);
  const [addingNewFile, setAddingNewFile] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const { data, error } = useSWR("/api/programming-langs", fetcher);
  const { enqueueSnackbar } = useSnackbar();
  const [dialogOpen, setOpen] = useState(false);

  console.log("Active Tab Index", activeTabIndex);
  console.log("Active Tab", activeTab);

  const router = useRouter();
  const { display } = router.query;

  // Switch Active Tab
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setActiveTab(snippet?.find((tab) => tab.key == activeTabIndex));
    }
    return () => {
      mounted = false;
    };
  }, [snippet, activeTabIndex]);

  // will change a tab in snippet
  const handleEditorChange = (e) => {
    let value = e.target.value;
    const restOfSnippet = snippet.filter((tab) => tab.key !== activeTabIndex);
    console.log("Rest", restOfSnippet);
    let snippetToSet = [...restOfSnippet, { ...activeTab, code: value }];
    console.log("change snippetToSet", snippetToSet);
    dispatch(SET_SNIPPET(snippetToSet.sort((a, b) => a.key - b.key)));
  };

  // Add New File Handler
  const handleAddNewFile = (e) => {
    e.preventDefault();
    if (newFileName.includes(".")) {
      const [fileExtention, language] = extractExtentionAndLanguage(
        newFileName,
        data
      );
      const fileKey = snippet?.at(-1)
        ? snippet?.at(-1).key + 1
        : snippet?.length;

      let fileToAdd = {
        snippetName: snippetName,
        key: fileKey,
        extention: fileExtention,
        fileName: newFileName,
        code: "// start coding here",
        language: language ? language : "unknown",
        languageExtentions: language?.extensions,
      };
      console.log("fileToAdd", fileToAdd);
      let snippetToSet = [...snippet, fileToAdd];
      console.log("snippetToSet", snippetToSet);
      dispatch(SET_SNIPPET(snippetToSet));
      dispatch(SET_EDITOR_ACTIVE_TAB_INDEX(fileKey));
      setAddingNewFile(false);
      setNewFileName("");
    } else {
      enqueueSnackbar(
        `Enter valid file name including extention, (e.g. index.html)`,
        {
          variant: "info",
        }
      );
    }
  };

  const handleFileDelete = () => {
    let tabToDeleteKey = activeTabIndex;
    const restOfSnippet = snippet?.filter((tab) => tab.key !== tabToDeleteKey); // 1- Filter snippet tabs
    dispatch(SET_UNFILLED_TAB_INDEXS(activeTabIndex));
    dispatch(SET_SNIPPET(restOfSnippet.sort((a, b) => a.key - b.key)));
    dispatch(SET_EDITOR_ACTIVE_TAB_INDEX(restOfSnippet[0]?.key));
    setOpen(false);
  };

  return (
    <>
      {/* Adding new snippet phase 1 [Info] */}
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

      {/* Adding new snippet phase 2 [Coding] */}

      {display === "finalize-new-snippet" && (
        <div className="editor-container w-full">
          <div className="editor-navigation text-white flex items-center select-none">
            {snippet &&
              snippet.map(({ fileName, key }) => (
                <div
                  key={key}
                  className={`tab-button ${
                    key === activeTabIndex && "active"
                  } flex items-center space-x-4`}
                  onClick={() => {
                    dispatch(SET_EDITOR_ACTIVE_TAB_INDEX(key));
                  }}
                >
                  <span>{fileName}</span>
                  <span
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    {key === activeTabIndex && (
                      <XIcon className="h-5 text-gray-400" />
                    )}
                  </span>
                </div>
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
            {snippet.length > 0 ? (
              <CodeEditor
                minHeight="80vh"
                value={activeTab?.code}
                language={
                  activeTab?.extention
                    ? splitAtCharacter(activeTab?.extention, ".")[1]
                    : "js"
                }
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
            ) : (
              <h2
                className={`primary-heading mt-10 ml-1 ${
                  themePreference === "dark" && "dark"
                }`}
              >
                No files selected
              </h2>
            )}
          </div>
        </div>
      )}

      <Dialog
        title={
          "Are you sure, you want to delete this file. This action is irreversible"
        }
        open={dialogOpen}
        setOpen={setOpen}
        dialogActions={[
          {
            label: "Cancel",
            action: () => {
              setOpen(false);
            },
          },
          { label: "Agree", action: handleFileDelete },
        ]}
      />
    </>
  );
};

export default AddNewSnippetPanel;
