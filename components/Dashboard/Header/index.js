import { useState } from "react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";

import { Add, ArrowBack, Close, Save, Send } from "@mui/icons-material";
import { Paper } from "@mui/material";
import { SearchIcon } from "@heroicons/react/solid";

import {
  RESET_SNIPPET,
  selectFileName,
  selectSnippet,
  SET_SNIPPET,
} from "../../../redux/slices/appSlice";
import {
  CompareObjects,
  extractExtentionAndLanguage,
  fetcher,
} from "../../../files/utils";
import Button from "../../../components/Generic/Button";
import ThemeSwitch from "../../../components/Dashboard/ThemeSwitch";
import SyntaxThemes from "../../../theming/SyntaxThemes";
import Heading from "../../../components/Generic/Heading";
import Modal from "../../Generic/Modal";
import PreEditor from "../PreEditor";
import useAuth from "../../../hooks/auth/useAuth";
import { useMutation } from "react-query";
import useAxiosPrivate from "../../../hooks/auth/useAxiosPrivate";
import {
  selectSnippets,
  SET_SNIPPETS,
  SET_USER,
} from "../../../redux/slices/userSlice";
import dashify from "dashify";

const DashboardHeader = () => {
  const currentUser = useAuth();
  const snippetObj = useSelector(selectSnippet);
  const fileName = useSelector(selectFileName);
  const snippets = useSelector(selectSnippets);

  const [saving, setSaving] = useState();

  const { data, error } = useSWR("/api/programming-langs", fetcher);
  const [addSnippetDialogOpen, setAddSnippetDialogOpen] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const { enqueueSnackbar } = useSnackbar();

  // display snippet
  const displaySnippets = router.pathname === "/dashboard";

  // initiating snippet
  const addingSnippetInfo =
    router.pathname === "/dashboard" && addSnippetDialogOpen;

  // adding code to new snippet
  const addingCodeToNewSnippet =
    router.pathname === "/dashboard/editor" &&
    router.query.mode === "adding-snippet";

  // editing snippet
  const editingSnippet =
    router.pathname === "/dashboard/editor" &&
    router.query.mode === "edit-snippet";

  // saving new snippet
  const savingSnippet =
    router.pathname === "/dashboard/save-snippet" &&
    router.query.mode === "new-snippet";

  // saving edited snippet
  const savingEditedSnippet =
    router.pathname === "/dashboard/save-snippet" &&
    router.query.mode === "edit-snippet";

  // displaying indiv snippet
  const viewingSnippet = router.pathname === "/dashboard/snippet/[snippetID]";

  const handleDiscard = () => {
    dispatch(RESET_SNIPPET());
    router.push({ pathname: "/dashboard" });
  };

  const handleBackDirect = () => {
    if (savingEditedSnippet) {
      router.push({
        pathname: "/dashboard/editor",
        query: {
          mode: "edit-snippet",
          snippet: snippetObj?.snippetName,
        },
      });
    } else {
      router.push({
        pathname: "/dashboard/editor",
        query: {
          mode: "adding-snippet",
          snippet: snippetObj?.snippetName,
        },
      });
    }
  };

  const pushToEditor = () => {
    if (fileName.includes(".")) {
      setAddSnippetDialogOpen(false);
      const [fileExtention, language] = extractExtentionAndLanguage(
        fileName,
        data
      );
      const snippetUID = `snippet_${uuidv4()}`;
      const snippetTemplate = {
        snippetName: snippetObj?.snippetName,
        slug: dashify(snippetObj?.snippetName),
        uid: snippetUID || `snippet_${uuidv4()}`,
        description: "",
        snippetInfo: {
          isPrivate: true,
        },
        files: [
          {
            key: 0,
            fileName: fileName,
            snippetName: snippetObj?.snippetName,
            snippetUID: snippetUID || `snippet_${uuidv4()}`,
            ownerID: currentUser?._id,
            code: `// start coding here`,
            extention: fileExtention,
            language: {
              ...language,
              extensions: language?.extensions?.slice(0, 3),
            },
          },
        ],
        labels: [],
        tags: [],
      };
      dispatch(SET_SNIPPET(snippetTemplate));
      router.push({
        pathname: "/dashboard/editor",
        query: {
          mode: "adding-snippet",
          snippet: snippetObj?.snippetName,
        },
      });
    } else {
      enqueueSnackbar(`File name must contain extention, please recheck`, {
        variant: "info",
      });
    }
  };

  // add snippet to db react-query
  const { mutate: postSnippet } = useMutation(
    async (snippetData) => {
      return await axiosPrivate.post("/api/v1/snippets", snippetData);
    },
    {
      onSuccess: (res) => {
        console.log("Snippet Post Response", res);

        if (res.status === 201 || res.status === 200) {
          router.replace("/dashboard");
          dispatch(RESET_SNIPPET());
          dispatch(SET_USER(res.data.updatedUser));
          enqueueSnackbar(`Snippet added successfully`, {
            variant: "success",
          });
          setSaving(false);
        }
      },
      onError: (err) => {
        const statusCode = err.response.status;
        const statusText = err.response.statusText;
        enqueueSnackbar(statusText, {
          variant: "error",
        });
        setSaving(false);
      },
    }
  );

  const handleSnippetSave = async () => {
    setSaving(true);
    const snippetToSave = {
      userID: currentUser._id,
      snippet: {
        ...snippetObj,
        // ADDING INFO
        owner: {
          email: currentUser?.email,
          userID: currentUser?._id,
          fullName: currentUser?.fullName,
        },
      },
    };
    postSnippet(snippetToSave);
  };

  // update snippet react-query
  const { mutate: updateSnippet } = useMutation(
    async (snippetData) => {
      return await axiosPrivate.put(
        `/api/v1/snippets/${snippetObj?._id}`,
        snippetData
      );
    },
    {
      onSuccess: (res) => {
        console.log("Snippet Update Response", res);

        if (res.status === 201 || res.status === 200) {
          // updating snippet in the global(redux) state
          const restOfSnippets = snippets?.filter(
            (snippet) => snippet._id !== res.data.updated._id
          );
          dispatch(SET_SNIPPETS([res.data.updated, ...restOfSnippets]));
          router.replace("/dashboard");
          dispatch(RESET_SNIPPET());
          enqueueSnackbar(`Snippet updated successfully`, {
            variant: "success",
          });
          setSaving(false);
        }
      },
      onError: (err) => {
        const statusCode = err.response.status;
        const statusText = err.response.statusText;
        enqueueSnackbar(statusText, {
          variant: "error",
        });
        setSaving(false);
      },
    }
  );

  const handleSnippetUpdate = () => {
    setSaving(true);

    let targetSnippet = {
      ...snippets?.filter((snippet) => snippet._id === snippetObj?._id)[0],
    };
    const tagsAreSame = CompareObjects(targetSnippet?.tags, snippetObj?.tags);
    const labelIsSame =
      targetSnippet?.labels[0]?.name === snippetObj?.labels[0]?.name;

    const prevSnapshots = targetSnippet?.snapshots;

    // deleting not to include in snapshot
    delete targetSnippet?._id;
    delete targetSnippet?.createdAt;
    delete targetSnippet?.updatedAt;
    delete targetSnippet?.__v;
    delete targetSnippet?.snapshots;
    delete targetSnippet?.likes;
    delete targetSnippet?.owners;
    delete targetSnippet?.owner;
    delete targetSnippet?.forks;
    delete targetSnippet?.comments;

    let updatedFiles = [];
    snippetObj?.files?.forEach((file) => {
      updatedFiles.push({ ...file, snippetName: snippetObj?.snippetName });
    });

    updateSnippet({
      snippet: {
        snippetName: snippetObj?.snippetName,
        description: snippetObj?.description,
        slug: snippetObj?.slug,
        snippetInfo: snippetObj?.snippetInfo,
        files: updatedFiles,
        tags: tagsAreSame ? null : snippetObj?.tags,
        labels: labelIsSame ? null : snippetObj?.labels,
        snapshots: [
          ...prevSnapshots,
          { createdAt: new Date(), snapshot: targetSnippet },
        ],
      },
    });
  };

  // <Dynamic Content>

  const mainButtonTitle =
    addingSnippetInfo || addingCodeToNewSnippet || editingSnippet
      ? "Continue"
      : "Save Snippet";

  const mainButtonAction = addingCodeToNewSnippet
    ? () => {
        router.push({
          pathname: "/dashboard/save-snippet",
          query: {
            mode: "new-snippet",
          },
        });
      }
    : editingSnippet
    ? () => {
        router.push({
          pathname: "/dashboard/save-snippet",
          query: {
            mode: "edit-snippet",
          },
        });
      }
    : savingSnippet
    ? handleSnippetSave
    : savingEditedSnippet
    ? handleSnippetUpdate
    : () => {
        alert("Unknown Action");
      };

  const dashboardHeaderTagline = displaySnippets
    ? currentUser?.firstName
      ? `${currentUser?.firstName}'s Snippets`
      : "Your Snippets"
    : addingSnippetInfo || addingCodeToNewSnippet
    ? "Adding new snippet"
    : savingSnippet
    ? `Saving ${snippetObj?.snippetName}`
    : viewingSnippet
    ? "[SNIPPET NAME]"
    : "Code Godown";

  // </Dynamic Content>

  return (
    <Paper className="dashboard__contentHeader flex justify-between items-center w-full py-2 px-3 space-x-3">
      <div className="hidden sm:block">
        <div className="flex space-x-2">
          <div className="flex flex-col">
            <Heading type="tertiary">{dashboardHeaderTagline}</Heading>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end space-x-2 ml-auto flex-1">
        {!viewingSnippet && (
          <div className="lg:hidden">
            <SearchIcon className="cursor-pointer h-6 mr-2" />
          </div>
        )}
        {displaySnippets && <ThemeSwitch themes={SyntaxThemes} />}

        {/* Header Dynamic Buttons */}
        {savingSnippet || savingEditedSnippet ? (
          <Button
            type="text-icon"
            startIcon={<ArrowBack />}
            onClick={handleBackDirect}
          >
            Back
          </Button>
        ) : (
          <></>
        )}
        {!displaySnippets && !viewingSnippet ? (
          <Button
            type="text-icon"
            startIcon={<Close />}
            onClick={handleDiscard}
          >
            Discard
          </Button>
        ) : (
          <></>
        )}
        {displaySnippets && (
          <Button
            id="add-new-snippet-btn"
            type="icon"
            endIcon={<Add />}
            onClick={() => {
              setAddSnippetDialogOpen(true);
              dispatch(RESET_SNIPPET());
            }}
          >
            Add Snippet
          </Button>
        )}
        {!viewingSnippet && !displaySnippets ? (
          <Button
            type="icon"
            loading={saving}
            startIcon={savingSnippet || savingEditedSnippet ? <Save /> : null}
            endIcon={!savingSnippet && !savingEditedSnippet ? <Send /> : null}
            onClick={mainButtonAction}
          >
            {mainButtonTitle}
          </Button>
        ) : (
          <></>
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
