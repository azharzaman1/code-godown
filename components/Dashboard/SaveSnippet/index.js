import { useTheme } from "@emotion/react";
import { Divider, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSnippetName,
  SET_SNIPPET_NAME,
} from "../../../redux/slices/appSlice";
import Heading from "../../Generic/Heading";
import Text from "../../Generic/Text";

const SaveSnippet = () => {
  const dispatch = useDispatch();
  const snippetName = useSelector(selectSnippetName);
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <Paper className="addingNewSnippet__intialPhaseContainer pt-4 pb-8 px-4">
      <div>
        <Heading type="tertiary">Add new snippet</Heading>
        <Divider className="pt-3" />
      </div>
      <form>
        <div className="flex flex-col space-y-4 mt-4">
          <div className="flex flex-col w-full md:w-2/3 lg:w-1/2 xl:w-1/3 space-y-2">
            <Text component="label" htmlFor="snippet-name">
              Snippet name
            </Text>
            <input
              type="text"
              placeholder="e.g. Snippet #1"
              id="snippet-name"
              className={`input w-full`}
              value={snippetName}
              onChange={(e) => dispatch(SET_SNIPPET_NAME(e.target.value))}
            />
          </div>
          <div className="flex flex-col w-full md:w-2/3 lg:w-1/2 xl:w-1/3 space-y-2">
            <Text component="label" htmlFor="snippet-desc">
              Description
            </Text>
            <input
              type="text"
              placeholder="Add snippet description"
              id="snippet-desc"
              className={`input w-full`}
              value={snippetName}
              onChange={(e) => dispatch(SET_SNIPPET_NAME(e.target.value))}
            />
          </div>
        </div>
      </form>
    </Paper>
  );
};

export default SaveSnippet;
