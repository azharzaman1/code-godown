import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import Editor from "@monaco-editor/react";
import DashboardLayout from "../../../components/Dashboard/Layout";
import SnippetLeftPanel from "../../../components/Dashboard/Snippet/SnippetLeftPanel";
import SnippetCardActions from "../../../components/Dashboard/SnippetsArchivePanel/SnippetCard/SnippetCardActions";
import Button from "../../../components/Generic/Button";
import Loader from "../../../components/Generic/Loader";
import {
  selectActiveTabIndex,
  selectSnippet,
  SET_EDITOR_ACTIVE_TAB_INDEX,
} from "../../../redux/slices/appSlice";
import { useQuery } from "react-query";
import useAxiosPrivate from "../../../hooks/auth/useAxiosPrivate";
import { useSnackbar } from "notistack";

const Snippet = () => {
  const activeTabIndex = useSelector(selectActiveTabIndex);
  const [activeTab, setActiveTab] = useState({});

  const axiosPrivate = useAxiosPrivate();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const dispatch = useDispatch();
  const editorRef = useRef(null);

  // handling editor mount
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  // react-query snippet fetch by id
  const {
    data: snippet,
    isIdle,
    isLoading: loadingSnippet,
    isError: errorLoadingSnippet,
    error,
    refetch: fetchSnippet,
    isFetching,
  } = useQuery(
    "fetch-snippet-by-id",
    async () => {
      console.log(router);
      return await axiosPrivate.get(`/api/v1/snippets/${router.query._id}`);
    },
    {
      enabled: false,
      onSuccess: (res) => {
        console.log("Snippet fetch response", res);
        setActiveTab(res.data.found.files[0]);
      },
      onError: (err) => {
        const statusText = err.response.statusText;
        enqueueSnackbar(statusText, {
          variant: "error",
        });
      },
    }
  );

  // switching active tab
  useEffect(() => {
    let mounted = true;

    if (mounted && snippet) {
      setActiveTab(
        snippet.data.found.files.find((tab) => tab.key == activeTabIndex)
      );
    }

    return () => {
      mounted = false;
    };
  }, [snippet, activeTabIndex]);

  useEffect(() => {
    fetchSnippet();
  }, [router.query._id, fetchSnippet]);

  if (loadingSnippet) {
    return <span>Loading...</span>;
  } else if (errorLoadingSnippet) {
    return <span>Error: {error.message}</span>;
  } else {
    return (
      <div className="w-full p-2 md:p-4 pl-0 md:pl-0">
        <div className="snippet-content-container flex flex-col space-y-5 lg:flex-row lg:items-start lg:space-y-0 lg:space-x-2">
          <SnippetLeftPanel snippet={snippet?.data?.found} />
          <div className="snippet-code-container w-full">
            <div className="flex items-center justify-between">
              <div className="editor-navigation text-white flex-1 flex items-center select-none overflow-x-scroll">
                {snippet?.data?.found &&
                  snippet?.data?.found.files?.map(({ fileName, key }) => (
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

              <div className="hidden lg:block">
                <SnippetCardActions snippet={snippet?.data?.found} />
              </div>
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
  }
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

/*
import Editor from "@monaco-editor/react";
import { useRouter } from "next/router";
import { Paper } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../../components/Dashboard/Layout";
import SnippetLeftPanel from "../../../components/Dashboard/Snippet/SnippetLeftPanel";
import SnippetCardActions from "../../../components/Dashboard/SnippetsArchivePanel/SnippetCard/SnippetCardActions";
import Button from "../../../components/Generic/Button";
import Loader from "../../../components/Generic/Loader";
import useAxiosPrivate from "../../../hooks/auth/useAxiosPrivate";
import {
  selectActiveTabIndex,
  selectSnippet,
  SET_EDITOR_ACTIVE_TAB_INDEX,
} from "../../../redux/slices/appSlice";

const Snippet = () => {
  const snippetFromState = useSelector(selectSnippet);
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const { enqueueSnackbar } = useSnackbar();
  const [snippet, setSnippet] = useState({});

  const {
    isIdle,
    isLoading,
    isError,
    error,
    refetch: fetchSnippet,
    isFetching,
  } = useQuery(
    "fetch-snippet-by-id",
    async () => {
      return await axiosPrivate.get(`/api/v1/snippets/${router.query._id}`);
    },
    {
      placeholderData: snippetFromState,
      onSuccess: (res) => {
        console.log("Snippet fetch response", res);
        setSnippet(res.data.found);
      },
      onError: (err) => {
        const statusText = err.response.statusText;
        enqueueSnackbar(statusText, {
          variant: "error",
        });
      },
    }
  );

  console.log("snippet", snippet);

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

  console.log({ router });

  return (
    <div className="w-full p-2 md:p-4 pl-0 md:pl-0">
      <div className="snippet-content-container flex flex-col space-y-5 lg:flex-row lg:items-start lg:space-y-0 lg:space-x-2">
        <SnippetLeftPanel snippet={snippet} />
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

            <div className="hidden lg:block">
              <SnippetCardActions snippet={snippet} />
            </div>
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

*/
