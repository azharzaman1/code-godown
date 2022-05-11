import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import Heading from "../../Generic/Heading";
import Button from "../../Generic/Button";
import { Add, DeleteSweep } from "@mui/icons-material";
import useAuth from "../../../hooks/auth/useAuth";
import { useMutation } from "react-query";
import useAxiosPrivate from "../../../hooks/auth/useAxiosPrivate";
import SnippetCard from "./SnippetCard";
import { selectSnippets, SET_SNIPPETS } from "../../../redux/slices/userSlice";
import SnippetCardSkeleton from "./SnippetCard/SnippetCardSkeleton";

const SnippetsArchivePanel = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const currentUser = useAuth();
  const userSnippets = useSelector(selectSnippets);

  const theme = useTheme();
  const isAboveMDBreakpoint = useMediaQuery(theme.breakpoints.up("md"));

  const { isLoading, mutate: fetchSnippets } = useMutation(
    async (snippetIDs) => {
      return await axiosPrivate.post("/api/v1/snippets/many", snippetIDs);
    },
    {
      onSuccess: (res) => {
        console.log("Snippets fetch response", res);
        dispatch(SET_SNIPPETS(res.data.result));
      },
      onError: (err) => {
        const statusCode = err.response.status;
        const statusText = err.response.statusText;
        enqueueSnackbar(statusText, {
          variant: "error",
        });
      },
    }
  );

  useEffect(() => {
    fetchSnippets({ ids: currentUser?.snippets });
  }, [currentUser?.snippets, fetchSnippets]);

  const handleAddNewSnippet = () => {
    document.getElementById("add-new-snippet-btn").click();
  };

  return (
    <div className="dashboard__snippetsArchiveCont w-full">
      {currentUser?.snippets?.length > 0 ? (
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          justifyContent={isAboveMDBreakpoint ? "flex-start" : "center"}
          className="max-w-[100%] overflow-hidden"
        >
          {/* Display snippets itself if, snippets are present in currentUser obj, and */}
          {/* Individual snippets are fetched from db */}
          {userSnippets?.length > 0 ? (
            userSnippets?.map((snippet) => <SnippetCard snippet={snippet} />)
          ) : (
            // display skeleton in case individiual snippets are being fetched
            // from ids present in currentUser object
            <>
              {currentUser?.snippets.map((skeleton) => (
                <SnippetCardSkeleton />
              ))}
            </>
          )}
        </Grid>
      ) : (
        // display empty snippets screen, if no snippets were present in db
        <div className="flex flex-col items-center justify-center space-y-5 my-7">
          <DeleteSweep
            sx={{
              fontSize: 100,
              color: "lightgray",
            }}
          />
          <Heading type="secondary">No Snippets Found!</Heading>
          <Button type="icon" endIcon={<Add />} onClick={handleAddNewSnippet}>
            Create
          </Button>
        </div>
      )}
    </div>
  );
};

export default SnippetsArchivePanel;
