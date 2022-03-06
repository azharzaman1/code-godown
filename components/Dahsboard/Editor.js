import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  selectActiveTabIndex,
  selectSnippet,
  selectTheme,
  SET_EDITOR_ACTIVE_TAB_INDEX,
  SET_SNIPPET,
} from "../../redux/slices/appSlice";
import { PlusIcon } from "@heroicons/react/outline";
import { extractExtentionAndLanguage, fetcher } from "../../files/utils";
import Dialog from "../Generic/Dialog";
import useSWR from "swr";
import ThemeButton from "../Generic/Button";
import { NIL as NIL_UUID, v4 as uuidv4 } from "uuid";
import { useSnackbar } from "notistack";

const MonacoEditor = () => {
  const dispatch = useDispatch();
  let snippetObj = useSelector(selectSnippet);
  const themePreference = useSelector(selectTheme);
  const activeTabIndex = useSelector(selectActiveTabIndex);
  const [activeTab, setActiveTab] = useState(
    snippetObj?.files?.find((tab) => tab.key == activeTabIndex)
  );
  const [addingNewFile, setAddingNewFile] = useState(false);
  const [dialogOpen, setOpen] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const { data, error } = useSWR("/api/programming-langs", fetcher);

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const { snippet } = router.query;

  // Switch Active Tab
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setActiveTab(snippetObj?.files?.find((tab) => tab.key == activeTabIndex));
    }
    return () => {
      mounted = false;
    };
  }, [snippetObj, activeTabIndex]);

  // Preparing Editor

  const monaco = useMonaco();

  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  // will change a tab in snippet
  const handleEditorChange = (value, e) => {
    const restOfFiles = snippetObj?.files?.filter(
      (tab) => tab.key !== activeTabIndex
    );
    let snippetToSet = {
      ...snippetObj,
      files: [...restOfFiles, { ...activeTab, code: value }]?.sort(
        (a, b) => a.key - b.key
      ),
    };
    dispatch(SET_SNIPPET(snippetToSet));
  };

  // Add New File Handler
  const handleAddNewFile = (e) => {
    e.preventDefault();
    if (newFileName.includes(".")) {
      const [fileExtention, language] = extractExtentionAndLanguage(
        newFileName,
        data
      );

      let snippetToSet;
      let fileKey;
      if (snippetObj?.files?.length > 0) {
        // normal behaviour
        fileKey = snippetObj?.files?.at(-1).key + 1;
        snippetToSet = {
          ...snippetObj,
          files: [
            ...snippetObj?.files,
            {
              snippetName: snippetObj,
              key: snippetObj?.files?.at(-1).key + 1,
              extention: fileExtention,
              fileName: newFileName,
              code: `// start coding here`,
              language: language ? language : "unknown",
              languageExtentions: language?.extensions,
              createdAt: new Date(),
              lastUpdatedAt: new Date(),
              snapshots: [],
            },
          ],
        };
      } else {
        // if page refreshed by user
        console.log("altered called");
        fileKey = 0;
        snippetToSet = {
          snippetName: snippet,
          uid: `snippet_${uuidv4()}`,
          snippetInfo: {
            snippetLabels: [
              {
                label: "",
                key: "",
                uid: `label_${NIL_UUID}`,
              },
            ],
            snippetTags: [],
            createAt: new Date(),
            lastUpdatedAt: new Date(),
            snapshots: [],
            isPrivate: false,
          },
          files: [
            {
              snippetName: snippet,
              key: 0,
              extention: fileExtention,
              fileName: newFileName,
              code: `// start coding here`,
              language: language ? language : "unknown",
              languageExtentions: language?.extensions,
              createdAt: new Date(),
              lastUpdatedAt: new Date(),
              snapshots: [],
            },
          ],
        };
      }
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
    const restOfFiles = snippetObj?.files?.filter(
      (tab) => tab.key !== tabToDeleteKey
    );
    dispatch(
      SET_SNIPPET({
        ...snippetObj,
        files: restOfFiles?.sort((a, b) => a.key - b.key),
      })
    );
    dispatch(SET_EDITOR_ACTIVE_TAB_INDEX(restOfFiles[0]?.key));
    setOpen(false);
  };

  return (
    <div className="editor-container w-full">
      <div className="editor-navigation text-white flex items-center select-none">
        {snippetObj &&
          snippetObj?.files?.map(({ fileName, key }) => (
            <ThemeButton
              key={key}
              type="tab"
              active={key == activeTabIndex}
              tabCloseButton={key == activeTabIndex}
              onClick={() => {
                dispatch(SET_EDITOR_ACTIVE_TAB_INDEX(key));
              }}
              closeButtonOnClick={() => {
                setOpen(true);
              }}
            >
              {fileName}
            </ThemeButton>
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
        {snippetObj?.files?.length > 0 && (
          <Editor
            height="75vh"
            defaultLanguage={
              activeTab?.language?.name?.toLowerCase() || "javascript"
            }
            defaultValue={activeTab?.code}
            path={activeTab?.fileName}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            theme={themePreference === "dark" ? "vs-dark" : "light"}
            loading={<h1>Loading...</h1>}
          />
        )}
      </div>
      {/* File delete confirmation dialog */}
      <Dialog
        title={
          "Are you sure, you want to delete this file. This action can not be undone!"
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
