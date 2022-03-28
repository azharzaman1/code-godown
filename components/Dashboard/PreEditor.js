import { Divider, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  selectFileName,
  selectSnippet,
  SET_FILE_NAME,
  SET_SNIPPET,
} from "../../redux/slices/appSlice";
import Heading from "../Generic/Heading";
import Text from "../Generic/Text";

const PreEditor = () => {
  const dispatch = useDispatch();
  const snippet = useSelector(selectSnippet);
  const fileName = useSelector(selectFileName);

  return (
    <Paper className="p-4 pt-2">
      <Heading type="secondary">Add new snippet</Heading>
      <Divider className="pt-3" />
      <form className="mt-5">
        <div className="flex flex-col space-y-2 mt-4 w-full">
          <Text component="label" htmlFor="snippet-name">
            Snippet name
          </Text>
          <input
            type="text"
            placeholder="e.g. Snippet #1"
            id="snippet-name"
            className={`input w-full`}
            value={snippet?.snippetName}
            onChange={(e) =>
              dispatch(SET_SNIPPET({ ...snippet, snippetName: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col space-y-2 mt-4 w-full">
          <Text component="label" htmlFor="file-name">
            File name
          </Text>
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
