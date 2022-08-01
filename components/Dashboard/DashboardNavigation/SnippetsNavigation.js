import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import dashify from "dashify";

import AddNewLabel from "./AddNewLabel";
import useAxiosPrivate from "../../../hooks/auth/useAxiosPrivate";
import { selectAllTags, SET_LABELS } from "../../../redux/slices/userSlice";
import {
  selectSnippetsFilters,
  SET_SNIPPETS_FILTERS,
} from "../../../redux/slices/appSlice";
import useAuth from "../../../hooks/auth/useAuth";

import Tag from "../../Generic/Tag";
import Text from "../../Generic/Text";
import Modal from "../../Generic/Modal";
import Loader from "../../Generic/Loader";

const SnippetsNavigation = () => {
  const snippetsFilters = useSelector(selectSnippetsFilters);
  const tags = useSelector(selectAllTags);
  const [allCheckboxChecked, setAllCheckboxChecked] = useState(true);
  const [addNewLabel, setAddNewLabel] = useState(false);
  const [labelName, setLabelName] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [labelToDelete, setLabelToDelete] = useState(null);

  const dispatch = useDispatch();
  const currentUser = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    data: labels,
    isLoading,
    isError,
    error,
    refetch: fetchLabels,
  } = useQuery(
    "fetch-all-labels",
    async () => {
      return await axiosPrivate.get("/api/v1/labels");
    },
    {
      enabled: false,
      onSuccess: (res) => {
        console.log("Labels fetch response", res);
        dispatch(SET_LABELS(res.data.found));
      },
    }
  );

  useEffect(() => {
    let mounted = true;
    mounted && fetchLabels();
    return () => (mounted = false);
  }, [false]);

  const { mutate: postLabel } = useMutation(
    async (labelsData) => {
      return await axiosPrivate.post(`/api/v1/labels`, labelsData);
    },
    {
      onSuccess: (res) => {
        console.log("Label post response", res);

        if (res.status === 201 && res.data.updatedUser) {
          enqueueSnackbar("Label added", { variant: "success" });
          fetchLabels();
          setAddNewLabel(false);
          setLabelName("");
        }
      },
      onError: (err) => {
        const statusText = err.response.statusText;
        enqueueSnackbar(statusText, {
          variant: "error",
        });
      },
    }
  );

  const handleAddNewLabel = () => {
    postLabel({
      userID: currentUser?._id,
      label: {
        name: labelName,
        slug: dashify(labelName),
      },
    });
  };

  const { mutate: deleteLabel } = useMutation(
    async () => {
      return await axiosPrivate.delete(`/api/v1/labels/${labelToDelete?._id}`);
    },
    {
      onSuccess: (res) => {
        console.log("Label delete response", res);

        if (res.status === 200) {
          enqueueSnackbar("Label deleted", { variant: "success" });
          setDeleteDialogOpen(false);
          fetchLabels();
        }
      },
      onError: (err) => {
        const statusText = err.response.statusText;
        enqueueSnackbar(statusText, {
          variant: "error",
        });
      },
    }
  );

  const handleLabelDelete = () => {
    console.log(labelToDelete);
    deleteLabel();
  };

  if (isLoading) {
    return <Loader color="light" />;
  }

  if (isError) {
    return <Text>Nothing found!</Text>;
  }

  return (
    <div className="flex flex-col">
      <div>
        {labels?.length > 0 && (
          <div className="navigation-by-labels mt-3 flex flex-col space-y-2">
            <div key="all" className="items-center flex space-x-2">
              <input
                defaultChecked
                id="all-snippets-checkbox"
                type="checkbox"
                onChange={(e) => {
                  setAllCheckboxChecked(e.target.checked);
                  dispatch(
                    SET_SNIPPETS_FILTERS({
                      ...snippetsFilters,
                      snippetsDisplay: "ALL",
                      snippetsDisplayByLabel: false,
                      labels: [],
                    })
                  );
                }}
              />
              <label
                htmlFor="all-snippets-checkbox"
                className="text-primaryText dark:text-primaryTextDark"
              >
                All
              </label>
            </div>
            {labels &&
              labels.data.found.map((label) => (
                <div className="flex items-center justify-between">
                  <div key={label._id} className="items-center flex space-x-2">
                    <input
                      id={label.slug}
                      type="checkbox"
                      onChange={(e) => {
                        dispatch(
                          SET_SNIPPETS_FILTERS({
                            ...snippetsFilters,
                            snippetsDisplay: allCheckboxChecked
                              ? "ALL"
                              : "DISPLAY_BY_LABEL",
                            snippetsDisplayByLabel: true,
                            labels: e.target.checked
                              ? [...snippetsFilters.labels, label]
                              : snippetsFilters.labels.filter(
                                  (lab) => lab._id != label._id
                                ),
                          })
                        );
                      }}
                    />
                    <label
                      htmlFor={label.slug}
                      className="text-primaryText dark:text-primaryTextDark"
                    >
                      {label.slug}
                    </label>
                  </div>
                  <div>
                    <IconButton
                      size="small"
                      color="primary"
                      sx={{ opacity: 0.8 }}
                      onClick={() => {
                        setDeleteDialogOpen(true);
                        setLabelToDelete(label);
                      }}
                    >
                      <Delete fontSize="inherit" />
                    </IconButton>
                  </div>
                </div>
              ))}
          </div>
        )}
        {/* <div className="create-new-label mt-2 flex">
          <Button
            type="text-icon"
            className="justify-center"
            startIcon={<Add />}
            onClick={() => {
              setAddNewLabel(true);
            }}
          >Create label</Button>
        </div> */}
      </div>
      {tags?.length > 0 && (
        <div className="mt-5">
          <Text className="underline underline-offset-2">
            Recently used tags:
          </Text>
          <div className="navigation-by-tags mt-2 flex items-center flex-wrap">
            {tags.slice(0, 10).map((tag) => (
              <Tag clickable className="mt-1 mr-2">
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      )}

      <Modal
        open={addNewLabel}
        modalContent={
          <AddNewLabel labelName={labelName} setLabelName={setLabelName} />
        }
        setOpen={setAddNewLabel}
        confirmLabel="Save"
        confirmAction={handleAddNewLabel}
      />

      <Modal
        warning
        title={`Delete label`}
        desc={`Are you sure you want to delete this label. This action cannot be undone. Dont worry your snippets will not be deleted!`}
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        confirmAction={handleLabelDelete}
      />
    </div>
  );
};

export default SnippetsNavigation;
