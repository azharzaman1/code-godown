import { Divider, Paper } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSnippet,
  selectSnippetName,
  SET_SNIPPET,
  SET_SNIPPET_NAME,
} from "../../../redux/slices/appSlice";
import Heading from "../../Generic/Heading";
import Text from "../../Generic/Text";

const SaveSnippet = () => {
  const dispatch = useDispatch();
  const snippet = useSelector(selectSnippet);
  const snippetName = useSelector(selectSnippetName);
  const [desc, setDesc] = useState("");

  const handleNameChange = (e) => {
    dispatch(
      SET_SNIPPET({
        ...snippet,
        snippetName: e.target.value,
      })
    );
    dispatch(SET_SNIPPET_NAME(e.target.value));
  };

  const handleDescChange = (e) => {
    dispatch(
      SET_SNIPPET({
        ...snippet,
        description: e.target.value,
      })
    );
  };

  return (
    <Paper className="w-full pt-4 pb-8 px-4">
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
              value={snippet?.snippetName}
              onChange={handleNameChange}
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
              value={snippet?.description}
              onChange={handleDescChange}
            />
          </div>
        </div>
      </form>
    </Paper>
  );
};

export default SaveSnippet;
