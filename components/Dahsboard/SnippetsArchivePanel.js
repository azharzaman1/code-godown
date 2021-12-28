import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUserFromDB } from "../../redux/slices/userSlice";
import Navigation from "./Navigation";
import SnippetCard from "./SnippetCard";

const SnippetsArchivePanel = () => {
  const snippets = useSelector(selectUserFromDB)?.snippets;
  return (
    <div className="dashboard__snippetsArchiveCont flex flex-col md:flex-row mt-1 md:space-x-2">
      <div className="archivePanel__left w-full md:w-1/6 bg-gray-800">
        <Navigation />
      </div>
      <div className="archivePanel__right w-full md:w-5/6 bg-gray-800">
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {snippets?.map(({ snippetName, uid, snippetInfo, files }) => (
            <SnippetCard
              name={snippetName}
              key={uid}
              uid={uid}
              info={snippetInfo}
              files={files}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default SnippetsArchivePanel;
