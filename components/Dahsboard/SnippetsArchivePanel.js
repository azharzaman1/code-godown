import { ArrowBack, Send } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectSnippets } from "../../redux/slices/userSlice";
import ThemeButton from "../Generic/Button";
import SnippetCard from "./SnippetCard";

const SnippetsArchivePanel = () => {
  const snippets = useSelector(selectSnippets);
  return (
    <div className="dashboard__snippetsArchiveCont flex flex-col md:flex-row mt-1">
      <div className="archivePanel__right w-full">
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
        <div className="my-5 flex flex-wrap space-x-3 items-center justify-evenly">
          <ThemeButton className="mt-2">Primary Button</ThemeButton>
          <ThemeButton className="mt-2" type="text">
            Text Button
          </ThemeButton>
          <ThemeButton className="mt-2" type="secondary">
            Secondary Button
          </ThemeButton>
          <ThemeButton className="mt-2" type="icon" endIcon={<Send />}>
            Icon Button
          </ThemeButton>
        </div>
      </div>
    </div>
  );
};

export default SnippetsArchivePanel;
