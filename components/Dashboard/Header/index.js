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
import ThemeSwitch from "../../../components/Dashboard/ThemeSwitch";
import SyntaxThemes from "../../../theming/SyntaxThemes";
import ThemeHeading from "../../../components/Generic/Heading";
import useSWR from "swr";

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const snippetArr = useSelector(selectSnippet);
  const snippetName = useSelector(selectSnippetName);
  const fileName = useSelector(selectFileName);
  const userInDB = useSelector(selectUserInDB);
  const { data, error } = useSWR("/api/programming-langs", fetcher);
  const router = useRouter();

  const displaySnippets = router.asPath === "/dashboard";
  const addingSnippetInfo = router.asPath === "/dashboard/add-snippet";
  const addingCodeToSnippet = router.asPath === "/dashboard/add-snippet/editor";
  const savingSnippet = router.asPath === "/dashboard/add-snippet/save";

  console.log(
    displaySnippets,
    addingSnippetInfo,
    addingCodeToSnippet,
    savingSnippet
  );

  const { enqueueSnackbar } = useSnackbar();

  const handleDiscard = () => {
    dispatch(RESSET_SNIPPET());
    router.push({ pathname: "/dashboard" });
  };

  const handleBackDirect = () => {
    router.push({ pathname: "/dashboard/add-snippet/editor" });
  };

  const pushToEditor = () => {
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
      router.push({
        pathname: "/dashboard/add-snippet/editor",
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
    dispatch(SET_DASHBOARD_CURRENT_STATE("displaySnippets"));
  };

  // <Dynamic Content>

  const mainButtonTitle =
    addingSnippetInfo || addingCodeToSnippet ? "Continue" : "Save Snippet";

  const mainButtonAction = addingSnippetInfo
    ? pushToEditor
    : addingCodeToSnippet
    ? () => {
        router.push({ pathname: "/dashboard/add-snippet/save" });
      }
    : savingSnippet
    ? handleSnippetSave
    : () => {
        alert("Unknown Action");
      };

  const dashboardHeaderTagline = displaySnippets
    ? userInDB?.userDetails?.displayName
      ? `${userInDB?.userDetails?.displayName}'s Snippets`
      : "Your Snippets"
    : addingSnippetInfo || addingCodeToSnippet
    ? "Adding new snippet"
    : savingSnippet
    ? `Saving ${snippetName}`
    : "Code Godown";

  // </Dynamic Content>

  return (
    <Paper className="dashboard__contentHeader flex justify-between items-center w-full py-2 px-3 space-x-3">
      <div className="hidden sm:block">
        <div className="flex space-x-2">
          <div className="flex flex-col">
            <ThemeHeading type="tertiary">
              {dashboardHeaderTagline}
            </ThemeHeading>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end space-x-2 ml-auto flex-1">
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
          <ThemeButton
            type="icon"
            endIcon={<Add />}
            onClick={() => {
              router.push({
                pathname: "/dashboard/add-snippet",
              });
            }}
          >
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
