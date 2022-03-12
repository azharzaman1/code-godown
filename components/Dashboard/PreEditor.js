import { Divider, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  selectFileName,
  selectSnippetName,
  SET_FILE_NAME,
  SET_SNIPPET_NAME,
} from "../../redux/slices/appSlice";
import Heading from "../Generic/Heading";
import ThemeText from "../Generic/Text";

const PreEditor = () => {
  const dispatch = useDispatch();
  const snippetName = useSelector(selectSnippetName);
  const fileName = useSelector(selectFileName);

  return (
    <Paper className="p-4 pt-2">
      <Heading type="secondary">Add new snippet</Heading>
      <Divider className="pt-3" />
      <form className="mt-5">
        <div className="flex flex-col space-y-2 mt-4 w-full">
          <ThemeText component="label" htmlFor="snippet-name">
            Snippet name
          </ThemeText>
          <input
            type="text"
            placeholder="e.g. Snippet #1"
            id="snippet-name"
            className={`input w-full`}
            value={snippetName}
            onChange={(e) => dispatch(SET_SNIPPET_NAME(e.target.value))}
          />
        </div>
        <div className="flex flex-col space-y-2 mt-4 w-full">
          <ThemeText component="label" htmlFor="file-name">
            File name
          </ThemeText>
          <input
            type="text"
            placeholder="e.g. index.html"
            id="file-name"
            className={`input w-full`}
            value={fileName}
            onChange={(e) => dispatch(SET_FILE_NAME(e.target.value))}
          />
        </div>
      </form>
    </Paper>
  );
};

export default PreEditor;
