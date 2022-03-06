import { Add, ArrowBack, Close, Save, Send } from "@mui/icons-material";
import { Paper } from "@mui/material";
import { SearchIcon } from "@heroicons/react/solid";
import {
  RESSET_SNIPPET,
  selectDashboardCurrentState,
  selectFileName,
  selectSnippet,
  selectSnippetName,
  selectTheme,
  SET_DASHBOARD_CURRENT_STATE,
  SET_SNIPPET,
} from "../../../redux/slices/appSlice";
import { selectUserInDB } from "../../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { doc } from "firebase/firestore";
import { db } from "../../../client/firebase";
import { NIL as NIL_UUID, v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { extractExtentionAndLanguage, fetcher } from "../../../files/utils";
import ThemeButton from "../../../components/Generic/Button";
import ThemeSwitch from "../../../components/Dahsboard/ThemeSwitch";
import SyntaxThemes from "../../../theming/SyntaxThemes";
import ThemeHeading from "../../../components/Generic/Heading";
import useSWR from "swr";

const DashboardHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const snippetArr = useSelector(selectSnippet);
  const snippetName = useSelector(selectSnippetName);
  const fileName = useSelector(selectFileName);
  const userInDB = useSelector(selectUserInDB);
  const themePreference = useSelector(selectTheme);
  const dashboardCurrentState = useSelector(selectDashboardCurrentState);
  const { data, error } = useSWR("/api/programming-langs", fetcher);

  const fileN = fileName || "file";

  const displaySnippets = dashboardCurrentState === "displaySnippets";
  const addingSnippetInfo =
    dashboardCurrentState === "addNewSnippet_addingInfo";
  const addingCodeToSnippet =
    dashboardCurrentState === "addNewSnippet_addingCode";
  const savingSnippet = dashboardCurrentState === "savingSnippet";

  const { enqueueSnackbar } = useSnackbar();

  const handleAddSnippet = () => {
    dispatch(SET_DASHBOARD_CURRENT_STATE("addNewSnippet_addingInfo"));
    router.push({
      pathname: "/dashboard/add-snippet",
    });
  };

  const handleDiscard = () => {
    dispatch(RESSET_SNIPPET());
    router.push({ pathname: "/dashboard" });
    dispatch(SET_DASHBOARD_CURRENT_STATE("displaySnippets"));
  };

  const handlerDirectToCodePhase = () => {
    if (fileName.includes(".")) {
      const [fileExtention, language] = extractExtentionAndLanguage(
        fileName,
        data
      );
      const snippetTemplate = {
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
      };
      dispatch(SET_SNIPPET(snippetTemplate));
      dispatch(SET_DASHBOARD_CURRENT_STATE("addNewSnippet_addingCode"));
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
    dispatch(SET_DASHBOARD_CURRENT_STATE("displaySnippets"));
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
    ? handlerDirectToCodePhase
    : addingCodeToSnippet
    ? () => {
        dispatch(SET_DASHBOARD_CURRENT_STATE("savingSnippet"));
      }
    : handleSnippetSave;

  const handleBackDirect = () => {
    dispatch(SET_DASHBOARD_CURRENT_STATE("addNewSnippet_addingCode"));
  };

  return (
    <Paper className="dashboard__contentHeader flex justify-between items-center w-full h-16 px-3 space-x-3">
      <div className="hidden md:block">
        <div className="flex space-x-2">
          <div className="flex flex-col">
            <ThemeHeading type="tertiary">
              {dashboardHeaderTagline}
            </ThemeHeading>
          </div>
        </div>
      </div>

      {/* {displaySnippets && (
        <div className="flex-1 max-w-[550px]">
          <form className="hidden lg:block">
            <div className="flex-between-center rounded-md pl-3 border border-borderColor dark:border-borderColorDark">
              <input
                type="text"
                placeholder="Search snippet"
                className={`py-2 outline-none flex-1 ${
                  themePreference === "dark" &&
                  "bg-transparent text-gray-300 placeholder-gray-400"
                }`}
              />
              <div className="bg-red-400 p-2 cursor-pointer">
                <SearchIcon className="h-5 text-white" />
              </div>
            </div>
          </form>
        </div>
      )} */}

      <div className="flex items-center justify-evenly space-x-2">
        <div className="lg:hidden">
          <SearchIcon className="cursor-pointer h-6 mr-2" />
        </div>
        {displaySnippets && <ThemeSwitch themes={SyntaxThemes} />}
        {/* Header Dynamic Buttons */}
        {savingSnippet && (
          <ThemeButton
            type="text-icon"
            startIcon={<ArrowBack />}
            onClick={handleBackDirect}
          >
            Back
          </ThemeButton>
        )}
        {!displaySnippets && (
          <ThemeButton
            type="text-icon"
            startIcon={<Close />}
            onClick={handleDiscard}
          >
            Discard
          </ThemeButton>
        )}
        {displaySnippets ? (
          <ThemeButton type="icon" endIcon={<Add />} onClick={handleAddSnippet}>
            Add Snippet
          </ThemeButton>
        ) : (
          // addingSnippetInfo || addingCodeToSnippet || savingSnippet
          <ThemeButton
            type="icon"
            startIcon={savingSnippet && <Save />}
            endIcon={!savingSnippet && <Send />}
            onClick={mainButtonAction}
          >
            {mainButtonTitle}
          </ThemeButton>
        )}
      </div>
    </Paper>
  );
};

export default DashboardHeader;
