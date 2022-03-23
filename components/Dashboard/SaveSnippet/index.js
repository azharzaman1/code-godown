import { Divider, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET_SNIPPET,
  selectSnippet,
  SET_SNIPPET,
  SET_SNIPPET_NAME,
} from "../../../redux/slices/appSlice";
import Chip from "../../Generic/Chip";
import Combobox from "../../Generic/Combobox";
import Heading from "../../Generic/Heading";
import Text from "../../Generic/Text";
import LabelSelect from "./LabelSelect";

const SaveSnippet = () => {
  const dispatch = useDispatch();
  const snippet = useSelector(selectSnippet);
  const router = useRouter();

  useEffect(() => {
    if (snippet?.files?.length < 1) {
      router.replace("/dashboard");
      dispatch(RESET_SNIPPET());
    }
  }, [router, snippet.files]);

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

  const handleChipClose = (id) => {
    console.log(id);
    const restOfFiles = snippet?.files.filter((file) => file.key != id);
    dispatch(SET_SNIPPET({ ...snippet, files: restOfFiles }));
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
            <textarea
              type="text"
              placeholder="Add snippet description"
              id="snippet-desc"
              className={`input w-full`}
              value={snippet?.description}
              onChange={handleDescChange}
            />
          </div>
          <div className="flex flex-col w-full md:w-2/3 lg:w-1/2 xl:w-1/3 space-y-2">
            <Text>Files</Text>
            <div className="flex items-center space-x-2 max-w-full flex-wrap">
              {snippet.files?.map((file) => (
                <Chip
                  key={file.key}
                  size="small"
                  color="light"
                  closeIconAction={() => handleChipClose(file.key)}
                >
                  {file.fileName}
                </Chip>
              ))}
            </div>
          </div>
          {/* Labels */}
          <div className="flex flex-col w-full md:w-2/3 lg:w-1/2 xl:w-1/3 space-y-2">
            <Text>Labels</Text>
            <LabelSelect />
          </div>
          {/* Tags */}
          {/* Private */}
        </div>
      </form>
    </Paper>
  );
};

export default SaveSnippet;

// TODO: redirect back to dashboard archive if no files inside snippet object
