import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Heading from "../../Generic/Heading";
import Button from "../../Generic/Button";
import SnippetCard from "./SnippetCard";
import { Add, DeleteSweep } from "@mui/icons-material";
import useAuth from "../../../hooks/auth/useAuth";
import { useState } from "react";

const SnippetsArchivePanel = () => {
  const currentUser = useAuth();
  const [userSnippets, setUserSnippets] = useState([]);
  return (
    <div className="dashboard__snippetsArchiveCont w-full">
      {currentUser.snippets.length > 0 ? (
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          className="max-w-[100%] overflow-hidden"
        >
          {userSnippets?.map(({ id, data }) => (
            <SnippetCard
              name={data.snippetName}
              key={id}
              uid={id}
              info={data.snippetInfo}
              files={data.files}
            />
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
