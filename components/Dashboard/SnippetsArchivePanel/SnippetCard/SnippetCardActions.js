import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { Delete, Download, Edit, Share } from "@mui/icons-material";
import { IconButton, Stack, Tooltip } from "@mui/material";
import useAuth from "../../../../hooks/auth/useAuth";
import useAxiosPrivate from "../../../../hooks/auth/useAxiosPrivate";
import Modal from "../../../Generic/Modal";
import { useDispatch } from "react-redux";
import { SET_USER } from "../../../../redux/slices/userSlice";

const SnippetCardActions = ({ snippet }) => {
  const currentUser = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [action, setAction] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();

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
      title: `Delete "${snippet?.snippetName.trim()}" snippet`,
      desc: `Are you sure you want to delete this snippet. This action cannot be undone.`,
      confirmAction: handleSnippetDelete,
    },
  };

  //   const handleSnippetEdit = (uid) => {
  //     dispatch(SET_DASHBOARD_LOADING(true));
  //     const snippetToEdit = snippets?.find((snippet) => snippet.id === uid);
  //     dispatch(SET_SNIPPET(snippetToEdit?.data));
  //     dispatch(SET_SNIPPET_NAME(snippetToEdit?.data?.snippetName));
  //     router.push({
  //       pathname: "/dashboard",
  //       query: {
  //         display: "edit-snippet",
  //       },
  //     });
  //   };

  return (
    <>
      <Stack
        className="snippetCard__actions"
        direction="row"
        spacing={1}
        alignItems="center"
      >
        <Tooltip title="Delete snippet">
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
        <Tooltip title="Download snippet">
          <IconButton size="small" color="primary" onClick={() => {}}>
            <Download fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Share snippet">
          <IconButton color="primary" size="small" onClick={() => {}}>
            <Share fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit snippet">
          <IconButton color="primary" size="small" onClick={() => {}}>
            <Edit fontSize="inherit" />
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
    </>
  );
};

export default SnippetCardActions;

/*
{
      onSuccess: (res) => {
        console.log("Snippet delete response", res);
        enqueueSnackbar(`Snippet was deleted successfully!`, {
          variant: "success",
        });
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
*/
