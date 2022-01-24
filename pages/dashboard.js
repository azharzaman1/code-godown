import { ArrowLeftIcon, PlusIcon, XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import Loader from "../components/Generic/Loader";
import Layout from "../components/Layout";
import Container from "../components/Generic/Container";
import { selectUser, selectUserFromDB } from "../redux/slices/userSlice";
import SnippetsArchivePanel from "../components/Dahsboard/SnippetsArchivePanel";
import { useDispatch, useSelector } from "react-redux";
import { Save, Send } from "@mui/icons-material";
import AddNewSnippetPanel from "../components/Dahsboard/AddNewSnippetPanel";
import { useRouter } from "next/dist/client/router";
import { Paper } from "@mui/material";
import {
  RESSET_SNIPPET,
  selectFileName,
  selectSnippet,
  selectSnippetName,
  selectTheme,
  SET_SNIPPET,
  SET_THEME,
} from "../redux/slices/appSlice";
import { extractExtentionAndLanguage, fetcher } from "../files/utils";
import useSWR from "swr";
import { useSnackbar } from "notistack";
import ThemeButton from "../components/Generic/Button";
import { NIL as NIL_UUID, v4 as uuidv4 } from "uuid";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../client/firebase";
import ThemeSwitch from "../components/Dahsboard/ThemeSwitch";
import SyntaxThemes from "../theming/SyntaxThemes";

const dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const snippetArr = useSelector(selectSnippet);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const userInDB = useSelector(selectUserFromDB);
  const snippets = useSelector(selectUserFromDB)?.snippets;
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

  useEffect(() => {
    setTimeout(() => {
      setDashboardLoading(false);
    }, 1000);
    dispatch(SET_THEME("dark"));
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
    let snippetsToSet = [snippetArr, ...snippets];
    console.log("<", snippetsToSet);
    const docRef = doc(db, "users", user?.uid);
    await updateDoc(docRef, {
      snippets: snippetsToSet,
    });
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
            <Paper className="dashboard__contentHeader flex-between-center w-full px-4 h-16 rounded shadow">
              <div className="">
                <div className="flex space-x-2">
                  <div className="flex flex-col">
                    <h3
                      className={`tertiary-heading ${
                        themePreference === "dark" && "dark"
                      }`}
                    >
                      {dashboardHeaderTagline}
                    </h3>
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
                <div className="hidden md:block flex-1 max-w-[550px]">
                  <form>
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

              <div className="flex space-x-2">
                {displaySnippets && <ThemeSwitch themes={SyntaxThemes} />}
                {/* Header Dynamic Buttons */}
                {savingSnippet && (
                  <ThemeButton type="icon-text" onClick={handleBackDirect}>
                    <ArrowLeftIcon className="h-4 pr-2" /> Back
                  </ThemeButton>
                )}
                {!displaySnippets && (
                  <ThemeButton type="icon-text" onClick={handleDiscard}>
                    <XIcon className="h-4 pr-2" /> Discard
                  </ThemeButton>
                )}
                {displaySnippets && (
                  <ThemeButton type="icon" onClick={handleAddSnippet}>
                    <PlusIcon className="h-4 pr-2" /> Add New
                  </ThemeButton>
                )}
                {addingSnippetInfo || addingCodeToSnippet || savingSnippet ? (
                  <ThemeButton type="icon" onClick={mainButtonAction}>
                    {savingSnippet && (
                      <Save fontSize="medium" className="pr-2" />
                    )}
                    {mainButtonTitle}
                    {addingSnippetInfo || addingCodeToSnippet ? (
                      <Send fontSize="medium" className="pl-2" />
                    ) : (
                      <></>
                    )}
                  </ThemeButton>
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

export default dashboard;
