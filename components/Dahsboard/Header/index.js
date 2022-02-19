import { Save, Send } from "@mui/icons-material";
import { Paper } from "@mui/material";
import { ArrowLeftIcon, PlusIcon, XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import ThemeButton from "../../../components/Generic/Button";
import ThemeSwitch from "../../../components/Dahsboard/ThemeSwitch";
import SyntaxThemes from "../../../theming/SyntaxThemes";
import ThemeHeading from "../../../components/Generic/Heading";
import { RESSET_SNIPPET, selectTheme } from "../../../redux/slices/appSlice";
import { selectUserFromDB } from "../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { doc } from "firebase/firestore";
import { db } from "../../../client/firebase";
import { fetcher } from "../../../files/utils";
import useSWR from "swr";
import { NIL as NIL_UUID, v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

const DashboardHeader = ({ dashboardMode = "snippets" }) => {
  const userInDB = useSelector(selectUserFromDB);
  const themePreference = useSelector(selectTheme);
  const displaySnippets = dashboardMode === "snippets";
  const addingSnippetInfo = dashboardMode === "add-new-snippet-info";
  const addingCodeToSnippet = dashboardMode === "adding-code-to-snippet";
  const savingSnippet = dashboardMode === "saving-snippet";
  const { data, error } = useSWR("/api/programming-langs", fetcher);

  const router = useRouter();

  const handleAddSnippet = () => {
    router.push({
      pathname: "/dashboard",
      query: {
        display: "add-new-snippet-info",
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
            icon={savingSnippet && <Save fontSize="medium" className="h-5" />}
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
  );
};

export default DashboardHeader;
