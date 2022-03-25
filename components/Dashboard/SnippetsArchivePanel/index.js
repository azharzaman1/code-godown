import { Grid } from "@mui/material";
import Heading from "../../Generic/Heading";
import Button from "../../Generic/Button";
import { Add, DeleteSweep } from "@mui/icons-material";
import useAuth from "../../../hooks/auth/useAuth";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import useAxiosPrivate from "../../../hooks/auth/useAxiosPrivate";
import SnippetCard from "./SnippetCard";

const SnippetsArchivePanel = () => {
  const axiosPrivate = useAxiosPrivate();
  const currentUser = useAuth();
  const [userSnippets, setUserSnippets] = useState([]);

  const { mutate: fetchSnippets } = useMutation(
    async (snippetIDs) => {
      return await axiosPrivate.post("/api/v1/snippets/many", snippetIDs);
    },
    {
      onSuccess: (res) => {
        console.log("Snippets fetch response", res);

        setUserSnippets(res.data.result);
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
    currentUser?.snippets?.length > 0 &&
      fetchSnippets({ ids: currentUser?.snippets });
  }, [currentUser?.snippets, fetchSnippets]);

  console.log(userSnippets);

  return (
    <div className="dashboard__snippetsArchiveCont w-full">
      {userSnippets?.length > 0 ? (
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          className="max-w-[100%] overflow-hidden"
        >
          {userSnippets?.map((snippet) => (
            <SnippetCard snippet={snippet} />
          ))}
        </Grid>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-5 mt-10">
          <DeleteSweep
            sx={{
              fontSize: 100,
              color: "lightgray",
            }}
          />
          <Heading type="secondary">No Snippets Found!</Heading>
          <Button type="icon" endIcon={<Add />}>
            Create
          </Button>
        </div>
      )}
    </div>
  );
};

export default SnippetsArchivePanel;
