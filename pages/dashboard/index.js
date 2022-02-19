import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Save, Send } from "@mui/icons-material";
import { useRouter } from "next/dist/client/router";
import { Paper } from "@mui/material";
import { useSnackbar } from "notistack";
import { NIL as NIL_UUID, v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { useTheme } from "next-themes";
import { ArrowLeftIcon, PlusIcon, XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import useSWR from "swr";

import Layout from "../../components/Dahsboard/Layout";
import Container from "../../components/Generic/Layout/Container";
import Loader from "../../components/Generic/Loader";

import { selectUser, selectUserFromDB } from "../../redux/slices/userSlice";
import SnippetsArchivePanel from "../../components/Dahsboard/SnippetsArchivePanel";
import AddNewSnippetPanel from "../../components/Dahsboard/AddNewSnippetPanel";
import {
  RESSET_SNIPPET,
  selectFileName,
  selectSnippet,
  selectSnippetName,
  selectTheme,
  SET_SNIPPET,
} from "../../redux/slices/appSlice";
import { extractExtentionAndLanguage, fetcher } from "../../files/utils";
import ThemeButton from "../../components/Generic/Button";
import { db } from "../../client/firebase";
import ThemeSwitch from "../../components/Dahsboard/ThemeSwitch";
import SyntaxThemes from "../../theming/SyntaxThemes";
import ThemeHeading from "../../components/Generic/Heading";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const snippetArr = useSelector(selectSnippet);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const userInDB = useSelector(selectUserFromDB);
  const snippetName = useSelector(selectSnippetName);
  const fileName = useSelector(selectFileName);
  const themePreference = useSelector(selectTheme);
  const { data, error } = useSWR("/api/programming-langs", fetcher);
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  const { display, file, snippet } = router.query;

  const displaySnippets = display === "snippets";
  const addingSnippetInfo = display === "add-new-snippet-info";
  const addingCodeToSnippet = display === "adding-code-to-snippet";
  const savingSnippet = display === "saving-snippet";

  const fileN = file || fileName || "file";
  const snippetN = snippet || snippetName || "New Snippet";

  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  useEffect(() => {
    setTimeout(() => {
      setDashboardLoading(false);
    }, 1000);
  }, []);

  const handleAddSnippet = () => {
    router.push({
      pathname: "/dashboard",
      query: {
        display: "add-new-snippet-info",
      },
    });
  };

  const handleContinueToPhase2 = () => {
    if (fileName.includes(".")) {
      const [fileExtention, language] = extractExtentionAndLanguage(
        fileName,
        data
      );
      dispatch(
        SET_SNIPPET({
          snippetName: snippetName,
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
              snippetName: snippetName,
              key: 0,
              fileName: fileName,
              code: `// start coding here`,
              extention: fileExtention,
              language: language ? language : "unknown",
              languageExtentions: language?.extensions,
              createdAt: new Date(),
              lastUpdatedAt: new Date(),
              snapshots: [],
            },
          ],
        })
      );
      router.push({
        pathname: "/dashboard",
        query: {
          display: "adding-code-to-snippet",
          snippet: snippetName,
        },
      });
    } else {
      enqueueSnackbar(`File name must contain extention, please recheck`, {
        variant: "info",
      });
    }
  };

  const handleSnippetSave = async () => {
    const snippetRef = doc(
      db,
      "users",
      user?.uid,
      "snippets",
      `snippet_${uuidv4()}`
    );
    await setDoc(snippetRef, snippetArr);

    dispatch(RESSET_SNIPPET());
    enqueueSnackbar(`Snippet saved successfully`, {
      variant: "success",
    });
    router.push({
      pathname: "/dashboard",
      query: {
        display: "snippets",
      },
    });
  };

  const handleDiscard = () => {
    dispatch(RESSET_SNIPPET());
    router.push({
      pathname: "/dashboard",
      query: {
        display: "snippets",
      },
    });
  };

  const dashboardHeaderTagline = displaySnippets
    ? userInDB?.userDetails?.displayName
      ? `${userInDB?.userDetails?.displayName}'s Snippets`
      : "Your Snippets"
    : addingSnippetInfo
    ? "Adding new snippet"
    : addingCodeToSnippet
    ? "Adding new snippet"
    : `Saving ${snippetName}`;

  {
    userInDB?.userDetails?.displayName
      ? `${userInDB?.userDetails?.displayName}'s Snippets`
      : "Your Snippets";
  }

  const mainButtonTitle =
    addingSnippetInfo || addingCodeToSnippet ? "Continue" : "Save Snippet";

  const mainButtonAction = addingSnippetInfo
    ? handleContinueToPhase2
    : addingCodeToSnippet
    ? () => {
        router.push({
          pathname: "/dashboard",
          query: {
            display: "saving-snippet",
          },
        });
      }
    : handleSnippetSave;

  const handleBackDirect = () => {
    router.push({
      pathname: "/dashboard",
      query: {
        display: "adding-code-to-snippet",
      },
    });
  };

  return (
    <Layout
      hideHeader={dashboardLoading}
      className={`min-w-full ${themePreference === "dark" && "dark-bg"}`}
      headerVariant={themePreference === "dark" ? "dark" : "light"}
    >
      {dashboardLoading ? (
        <div className="loader-container w-full min-h-[90vh] flex-center-center">
          <Loader label="hang on, while we prepare a dashboard for you" />
        </div>
      ) : (
        <Container>
          <div className="dashboard mt-1 flex flex-col">
            <Paper className="dashboard__contentHeader flex-between-center w-full h-16 rounded shadow px-3 space-x-3">
              <div className="hidden md:block">
                <div className="flex space-x-2">
                  <div className="flex flex-col">
                    <ThemeHeading type="tertiary">
                      {dashboardHeaderTagline}
                    </ThemeHeading>
                    {addingCodeToSnippet && (
                      <p
                        className={`info-text mt-1 ${
                          themePreference === "dark" && "dark"
                        }`}
                      >
                        {snippetN}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {displaySnippets && (
                <div className="flex-1 max-w-[550px]">
                  <form className="hidden lg:block">
                    <div className="flex-between-center rounded-md pl-3 border border-gray-600">
                      <input
                        type="text"
                        placeholder="Search snippet"
                        className={`py-2 outline-none flex-1 ${
                          themePreference === "dark" &&
                          "bg-transparent text-gray-300 placeholder-gray-400"
                        }`}
                      />
                      <div className="bg-red-400 rounded-r-md p-2 cursor-pointer">
                        <SearchIcon className="h-5 text-white" />
                      </div>
                    </div>
                  </form>
                </div>
              )}

              <div className="flex items-center justify-evenly space-x-2">
                <div className="lg:hidden">
                  <SearchIcon className="cursor-pointer h-6 mr-2" />
                </div>
                {displaySnippets && <ThemeSwitch themes={SyntaxThemes} />}
                {/* Header Dynamic Buttons */}
                {savingSnippet && (
                  <ThemeButton
                    type="icon"
                    size="small"
                    icon={<ArrowLeftIcon className="h-5" />}
                    text="Back"
                    onClick={handleBackDirect}
                  />
                )}
                {!displaySnippets && (
                  <ThemeButton
                    type="icon"
                    size="small"
                    icon={<XIcon className="h-5" />}
                    text="Discard"
                    onClick={handleDiscard}
                  />
                )}
                {displaySnippets && (
                  <ThemeButton
                    type="icon"
                    size="small"
                    icon={<PlusIcon className="h-5" />}
                    text="Add Snippet"
                    onClick={handleAddSnippet}
                  />
                )}
                {addingSnippetInfo || addingCodeToSnippet || savingSnippet ? (
                  <ThemeButton
                    type="icon"
                    size="small"
                    text={mainButtonTitle}
                    icon={
                      savingSnippet && (
                        <Save fontSize="medium" className="h-5" />
                      )
                    }
                    afterIcon={
                      addingSnippetInfo || addingCodeToSnippet ? (
                        <Send fontSize="medium" className="h-5" />
                      ) : (
                        false
                      )
                    }
                    onClick={mainButtonAction}
                  />
                ) : (
                  <></>
                )}
              </div>
            </Paper>
            <div className="dashboard__content mt-1 shadow min-h-[600px]">
              {displaySnippets || snippetArr?.files?.length < 1 ? (
                <SnippetsArchivePanel />
              ) : (
                <></>
              )}

              {addingSnippetInfo || addingCodeToSnippet || savingSnippet ? (
                <AddNewSnippetPanel />
              ) : (
                <></>
              )}
            </div>
          </div>
        </Container>
      )}
    </Layout>
  );
};

export default Dashboard;
