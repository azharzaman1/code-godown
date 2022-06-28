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
  selectSyntaxTheme,
  SET_EDITOR_ACTIVE_TAB_INDEX,
} from "../../../redux/slices/appSlice";
import { useQuery } from "react-query";
import useAxiosPrivate from "../../../hooks/auth/useAxiosPrivate";
import { useSnackbar } from "notistack";
import { Skeleton } from "@mui/material";
import { useTheme } from "next-themes";
import useAuth from "../../../hooks/auth/useAuth";

const SnippetDisplay = () => {
  const currentUser = useAuth();

  const activeTabIndex = useSelector(selectActiveTabIndex);
  const themePreference = useTheme();
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
    isLoading: loadingSnippet,
    isError: errorLoadingSnippet,
    error,
    refetch: fetchSnippet,
  } = useQuery(
    ["fetch-snippet-by-id", router.query._id],
    async () => {
      return await axiosPrivate.get(
        `${
          currentUser && !router.query.feature
            ? "/api/v1/snippets/"
            : "/api/v1/public/snippets/"
        }${router.query._id}`
      );
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

  return (
    <div className="w-full p-2 md:p-4 pl-0 md:pl-0">
      <div className="snippet-content-container max-w-full flex flex-col space-y-5 lg:flex-row lg:items-start lg:justify-start lg:space-y-0 lg:space-x-2">
        <div className="min-w-full lg:min-w-[200px] lg:max-w-[25%] xl:max-w-[20%] xl:min-w-[250px]">
          <SnippetLeftPanel
            snippet={snippet?.data?.found}
            dataIsLoading={loadingSnippet}
          />
        </div>

        <div className="snippet-code-container flex-1">
          {/* snippet code header - tabs - actions */}
          <div className="flex items-center justify-between pr-5">
            <div className="editor-navigation flex-1 flex items-center select-none overflow-x-scroll">
              {loadingSnippet ? (
                <div className="flex items-center space-x-1">
                  <Skeleton variant="rectangular" width={110} height={37} />
                  <Skeleton variant="rectangular" width={90} height={37} />
                  <Skeleton variant="rectangular" width={130} height={37} />
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>

            <div className="hidden lg:block ">
              {loadingSnippet ? (
                <div className="flex items-center space-x-4">
                  <Skeleton
                    variant="rectangular"
                    width={20}
                    height={20}
                    sx={{ borderRadius: 9999 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={20}
                    height={20}
                    sx={{ borderRadius: 9999 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={20}
                    height={20}
                    sx={{ borderRadius: 9999 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={20}
                    height={20}
                    sx={{ borderRadius: 9999 }}
                  />
                </div>
              ) : (
                <SnippetCardActions snippet={snippet?.data?.found} />
              )}
            </div>
          </div>

          {/* snippet code editor */}
          <div className="mt-1.5 w-full">
            <Editor
              height="70vh"
              defaultLanguage={
                activeTab?.language?.name?.toLowerCase() || "javascript"
              }
              defaultValue={activeTab?.code}
              path={activeTab?.fileName}
              onMount={handleEditorDidMount}
              theme={themePreference === "dark" ? "vs-dark" : "github"}
              loading={<Loader type={2} size="large" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetDisplay;
