import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  selectActiveTabIndex,
  selectFileName,
  selectSnippet,
  selectSnippetName,
  selectTheme,
  SET_EDITOR_ACTIVE_TAB_INDEX,
  SET_SNIPPET,
  SET_UNFILLED_TAB_INDEXS,
} from "../../redux/slices/appSlice";
import { PlusIcon, XIcon } from "@heroicons/react/outline";
import { extractExtentionAndLanguage, fetcher } from "../../files/utils";
import Dialog from "../Generic/Dialog";
import useSWR from "swr";

const MonacoEditor = () => {
  const dispatch = useDispatch();
  let snippet = useSelector(selectSnippet);
  const themePreference = useSelector(selectTheme);
  const activeTabIndex = useSelector(selectActiveTabIndex);
  const [activeTab, setActiveTab] = useState(
    snippet?.find((tab) => tab.key == activeTabIndex)
  );
  const snippetName = useSelector(selectSnippetName);
  const [addingNewFile, setAddingNewFile] = useState(false);
  const [dialogOpen, setOpen] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const { data, error } = useSWR("/api/programming-langs", fetcher);

  console.log("Active Tab Index", activeTabIndex);
  console.log("Active Tab", activeTab);

  const router = useRouter();
  const { display } = router.query;

  // Switch Active Tab
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setActiveTab(snippet?.find((tab) => tab.key == activeTabIndex));
      console.log(
        "Lang",
        snippet
          ?.find((tab) => tab.key == activeTabIndex)
          ?.language.name.toLowerCase()
      );
    }
    return () => {
      mounted = false;
    };
  }, [snippet, activeTabIndex]);

  // Preparing Editor

  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      console.log("here is the monaco isntance:", monaco);
    }
  }, [monaco]);

  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  // will change a tab in snippet
  const handleEditorChange = (value, e) => {
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
        code: `// start coding here`,
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
          <>
            <Editor
              height="90vh"
              defaultLanguage={activeTab?.language.name.toLowerCase()}
              defaultValue={activeTab?.code}
              path={activeTab?.fileName}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              theme={themePreference === "dark" ? "vs-dark" : "light"}
            />
          </>
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
    </div>
  );
};

export default MonacoEditor;
