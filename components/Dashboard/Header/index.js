import { Add, ArrowBack, Close, Save, Send } from "@mui/icons-material";
import { Paper } from "@mui/material";
import { SearchIcon } from "@heroicons/react/solid";
import {
  RESSET_SNIPPET,
  selectFileName,
  selectSnippet,
  selectSnippetName,
  SET_DASHBOARD_CURRENT_STATE,
  SET_SNIPPET,
} from "../../../redux/slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { extractExtentionAndLanguage, fetcher } from "../../../files/utils";
import Button from "../../../components/Generic/Button";
import ThemeSwitch from "../../../components/Dashboard/ThemeSwitch";
import SyntaxThemes from "../../../theming/SyntaxThemes";
import ThemeHeading from "../../../components/Generic/Heading";
import useSWR from "swr";
import Modal from "../../Generic/Modal";
import { useState } from "react";
import PreEditor from "../PreEditor";
import useAuth from "../../../hooks/auth/useAuth";

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const snippetArr = useSelector(selectSnippet);
  const snippetName = useSelector(selectSnippetName);
  const fileName = useSelector(selectFileName);
  const currentUser = useAuth();
  const { data, error } = useSWR("/api/programming-langs", fetcher);
  const [addSnippetDialogOpen, setAddSnippetDialogOpen] = useState(false);
  const router = useRouter();

  const displaySnippets = router.asPath === "/dashboard";
  const addingSnippetInfo =
    router.asPath === "/dashboard" && addSnippetDialogOpen;
  const addingCodeToSnippet = router.asPath === "/dashboard/editor";
  const savingSnippet = router.asPath === "/dashboard/save-snippet";

  const { enqueueSnackbar } = useSnackbar();

  const handleDiscard = () => {
    dispatch(RESSET_SNIPPET());
    router.push({ pathname: "/dashboard" });
  };

  const handleBackDirect = () => {
    router.push({ pathname: "/dashboard/editor" });
  };

  const pushToEditor = () => {
    if (fileName.includes(".")) {
      setAddSnippetDialogOpen(false);
      const [fileExtention, language] = extractExtentionAndLanguage(
        fileName,
        data
      );
      const snippetTemplate = {
        snippetName: snippetName,
        description: "",
        uid: `snippet_${uuidv4()}`,
        snippetInfo: {
          createAt: new Date(),
          isPrivate: true,
        },
        files: [
          {
            snippetName: snippetName,
            key: 0,
            fileName: fileName,
            code: `// start coding here`,
            extention: fileExtention,
            language: {
              ...language,
              extensions: language?.extensions?.slice(0, 3),
            },
          },
        ],
      };
      dispatch(SET_SNIPPET(snippetTemplate));
      router.push({
        pathname: "/dashboard/editor",
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

  const mainButtonAction = addingCodeToSnippet
    ? () => {
        router.push({ pathname: "/dashboard/save-snippet" });
      }
    : savingSnippet
    ? handleSnippetSave
    : () => {
        alert("Unknown Action");
      };

  const dashboardHeaderTagline = displaySnippets
    ? currentUser?.firstName
      ? `${currentUser?.firstName}'s Snippets`
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
          <Button
            type="text-icon"
            startIcon={<ArrowBack />}
            onClick={handleBackDirect}
          >
            Back
          </Button>
        )}
        {!displaySnippets && (
          <Button
            type="text-icon"
            startIcon={<Close />}
            onClick={handleDiscard}
          >
            Discard
          </Button>
        )}
        {displaySnippets ? (
          <Button
            type="icon"
            endIcon={<Add />}
            onClick={() => {
              setAddSnippetDialogOpen(true);
            }}
          >
            Add Snippet
          </Button>
        ) : (
          <Button
            type="icon"
            startIcon={savingSnippet && <Save />}
            endIcon={!savingSnippet && <Send />}
            onClick={mainButtonAction}
          >
            {mainButtonTitle}
          </Button>
        )}
      </div>
      <Modal
        open={addSnippetDialogOpen}
        modalContent={<PreEditor />}
        setOpen={setAddSnippetDialogOpen}
        confirmLabel="Add Snippet"
        confirmAction={pushToEditor}
      />
    </Paper>
  );
};

export default DashboardHeader;
