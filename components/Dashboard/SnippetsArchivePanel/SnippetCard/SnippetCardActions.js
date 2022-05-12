import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { Delete, Download, Edit, Share } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import useAuth from "../../../../hooks/auth/useAuth";
import useAxiosPrivate from "../../../../hooks/auth/useAxiosPrivate";
import Modal from "../../../Generic/Modal";
import { SET_USER } from "../../../../redux/slices/userSlice";
import { SET_SNIPPET } from "../../../../redux/slices/appSlice";
import Tooltip from "../../../Generic/Tooltip";
import SharePanel from "../../SharePanel";

const SnippetCardActions = ({ snippet }) => {
  const currentUser = useAuth();
  const [sharePanelOpen, setSharePanelOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [action, setAction] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // react-query snippet Delete
  const { mutate: deleteSnippet } = useMutation(
    async (snippetData) => {
      return await axiosPrivate.delete(
        `/api/v1/snippets/${snippet?._id}_${snippet?.owner?.userID}`, // both will be splited server-side
        snippetData
      );
    },
    {
      onSuccess: (res) => {
        console.log("Snippet delete response", res);
        dispatch(SET_USER({ ...currentUser, snippets: res.data.snippets }));
        enqueueSnackbar(`Snippet was deleted successfully!`, {
          variant: "success",
        });
        console.log("first", router);
        if (router.pathname.includes("/dashboard/snippet/")) {
          router.replace("/dashboard");
        }
        setDialogOpen(false);
        setDeleting(false);
      },
      onError: (err) => {
        const statusCode = err.response.status;
        const statusText = err.response.statusText;
        enqueueSnackbar(statusText, {
          variant: "error",
        });
        setDeleting(false);
      },
    }
  );

  const handleSnippetDelete = async () => {
    setDeleting(true);
    deleteSnippet({
      userID: currentUser?._id,
    });
  };

  const actions = {
    delete: {
      title: `Delete "${snippet?.snippetName?.trim()}" snippet`,
      desc: `Are you sure you want to delete this snippet. This action cannot be undone.`,
      confirmAction: handleSnippetDelete,
    },
  };

  const handleSnippetEdit = () => {
    dispatch(SET_SNIPPET(snippet));
    router.push({
      pathname: "/dashboard/editor",
      query: {
        mode: "edit-snippet",
        snippet: snippet?.snippetName,
      },
    });
  };

  return (
    <>
      <Stack
        className="snippetCard__actions"
        direction="row"
        spacing={1}
        alignItems="center"
      >
        <Tooltip content="Download snippet" className="">
          <IconButton size="small" color="primary" onClick={() => {}}>
            <Download fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <Tooltip content="Edit snippet">
          <IconButton color="primary" size="small" onClick={handleSnippetEdit}>
            <Edit fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <Tooltip content="Delete snippet">
          <IconButton
            size="small"
            color="primary"
            onClick={() => {
              setAction("delete");
              setDialogOpen(true);
            }}
          >
            <Delete fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <Tooltip content="Share snippet">
          <IconButton
            color="primary"
            size="small"
            onClick={() => {
              setSharePanelOpen(true);
            }}
          >
            <Share fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Stack>
      <Modal
        warning
        title={actions[action]?.title}
        desc={actions[action]?.desc}
        open={dialogOpen}
        setOpen={setDialogOpen}
        loading={deleting}
        confirmAction={actions[action]?.confirmAction}
      />

      {/* <SlideOver open={sharePanelOpen} setOpen={setSharePanelOpen} /> */}
      <SharePanel
        open={sharePanelOpen}
        setOpen={setSharePanelOpen}
        snippet={snippet}
      />
    </>
  );
};

export default SnippetCardActions;
