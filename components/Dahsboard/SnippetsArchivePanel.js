import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectSnippets, selectUserFromDB } from "../../redux/slices/userSlice";
import Navigation from "./Navigation";
import SnippetCard from "./SnippetCard";

const SnippetsArchivePanel = () => {
  const snippets = useSelector(selectSnippets);
  return (
    <div className="dashboard__snippetsArchiveCont flex flex-col md:flex-row mt-1 md:space-x-2">
      <div className="archivePanel__left w-full md:w-1/6">
        <Navigation />
      </div>
      <div className="archivePanel__right w-full md:w-5/6">
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
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
      </div>
    </div>
  );
};

export default SnippetsArchivePanel;
