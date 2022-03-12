import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectSnippets } from "../../../redux/slices/userSlice";
import Heading from "../../Generic/Heading";
import Button from "../../Generic/Button";
import SnippetCard from "./SnippetCard";
import { Add, DeleteSweep } from "@mui/icons-material";

const SnippetsArchivePanel = () => {
  const snippets = useSelector(selectSnippets);
  return (
    <div className="dashboard__snippetsArchiveCont w-full">
      {snippets.length > 0 ? (
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          className="max-w-[100%] overflow-hidden"
        >
          {snippets?.map(({ id, data }) => (
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
        <div className="flex flex-col items-center justify-center space-y-5">
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
