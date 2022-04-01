import Editor from "@monaco-editor/react";
import { Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../../components/Dashboard/Layout";
import SnippetLeftPanel from "../../../components/Dashboard/Snippet/SnippetLeftPanel";
import Button from "../../../components/Generic/Button";
import Loader from "../../../components/Generic/Loader";
import {
  selectActiveTabIndex,
  selectSnippet,
  SET_EDITOR_ACTIVE_TAB_INDEX,
} from "../../../redux/slices/appSlice";

const Snippet = () => {
  const snippet = useSelector(selectSnippet);
  const activeTabIndex = useSelector(selectActiveTabIndex);
  const [activeTab, setActiveTab] = useState(() =>
    snippet?.files?.find((tab) => tab.key == activeTabIndex)
  );

  useEffect(() => {
    let mounted = true;

    mounted &&
      setActiveTab(snippet?.files?.find((tab) => tab.key == activeTabIndex));

    return () => {
      mounted = false;
    };
  }, [snippet, activeTabIndex]);

  const dispatch = useDispatch();
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <div className="w-full p-2 md:p-4">
      <div className="snippet-content-container flex flex-col space-y-5 lg:flex-row lg:items-start lg:space-y-0 lg:space-x-2">
        <SnippetLeftPanel />
        <div className="snippet-code-container w-full">
          <div className="flex items-center justify-between">
            <div className="editor-navigation text-white flex-1 flex items-center select-none overflow-x-scroll">
              {snippet &&
                snippet?.files?.map(({ fileName, key }) => (
                  <Button
                    key={key}
                    type="tab"
                    size="medium"
                    active={key == activeTabIndex}
                    onClick={() => {
                      dispatch(SET_EDITOR_ACTIVE_TAB_INDEX(key));
                    }}
                  >
                    {fileName}
                  </Button>
                ))}
            </div>

            <div className="hidden lg:block">[Actions]</div>
          </div>

          <div className="w-full mt-1">
            <Editor
              height="70vh"
              defaultLanguage={
                activeTab?.language?.name?.toLowerCase() || "javascript"
              }
              defaultValue={activeTab?.code}
              path={activeTab?.fileName}
              onMount={handleEditorDidMount}
              theme={"vs-dark"}
              loading={<Loader />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Snippet.getLayout = (page) => (
  <DashboardLayout
    title="Add Snippet | Dashboard"
    className={`min-w-full bg-slate-900`}
  >
    {page}
  </DashboardLayout>
);

export default Snippet;
