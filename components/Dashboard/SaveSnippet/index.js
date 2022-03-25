import { Switch } from "@headlessui/react";
import { Edit } from "@mui/icons-material";
import { Divider, IconButton, Paper, Stack, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET_SNIPPET,
  selectSnippet,
  SET_SNIPPET,
  SET_SNIPPET_NAME,
} from "../../../redux/slices/appSlice";
import Chip from "../../Generic/Chip";
import Heading from "../../Generic/Heading";
import Button from "../../Generic/Button";
import Text from "../../Generic/Text";
import LabelSelect from "./LabelSelect";
import { splitAtCharacter } from "../../../files/utils";
import dashify from "dashify";

const SaveSnippet = () => {
  const dispatch = useDispatch();
  const snippet = useSelector(selectSnippet);
  const [tagsString, setTagsString] = useState("");
  const [tags, setTags] = useState([]);
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

  const handleSnippetScopeSwitch = (state) => {
    dispatch(
      SET_SNIPPET({
        ...snippet,
        snippetInfo: { ...snippet.snippetInfo, isPrivate: state },
      })
    );
  };

  const handleTagsGen = () => {
    const tagsArr = splitAtCharacter(tagsString, ",").filter(
      (tag) => tag !== ""
    );

    const tagsToAdd = tagsArr.map((tagName, index) => [
      {
        name: tagName.trim(),
        key: index,
        slug: dashify(tagName.trim()),
      },
    ]);

    dispatch(
      SET_SNIPPET({
        ...snippet,
        tags: tagsToAdd,
      })
    );

    setTags(tagsArr);
  };

  const handleTagDelete = (name) => {
    let restOfTags = tags?.filter((tag) => tag !== name);
    setTags(restOfTags);
    setTagsString(restOfTags.join(","));
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
          <div className="flex flex-col w-full md:w-2/3 lg:w-1/2 xl:w-1/3 space-y-2">
            <Text component="label" htmlFor="snippet-tags-input">
              Tags
            </Text>
            {tags.length > 0 ? (
              <>
                <div className="flex items-center space-x-2 max-w-full flex-wrap">
                  {tags?.map((name, i) => (
                    <Chip
                      color="light"
                      size="small"
                      key={i}
                      closeIconAction={() => {
                        handleTagDelete(name);
                      }}
                    >
                      {name}
                    </Chip>
                  ))}
                  <Tooltip title="Edit" placement="right">
                    <IconButton onClick={() => setTags([])}>
                      <Edit fontSize="small" className="text-gray-400" />
                    </IconButton>
                  </Tooltip>
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="e.g. JavsScript,ReactJs,Components"
                  id="snippet-tags-input"
                  className={`input w-full`}
                  value={tagsString}
                  onChange={(e) => setTagsString(e.target.value)}
                />
                {tagsString.length > 0 && (
                  <Button
                    type="text"
                    className="w-full flex justify-center mt-3"
                    onClick={handleTagsGen}
                  >
                    Add
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Private */}
          <div className="flex flex-col w-full md:w-2/3 lg:w-1/2 xl:w-1/3 space-y-2 mt-2">
            <Switch.Group>
              <div className="flex items-center">
                <Switch.Label className="mr-4">Keep code private?</Switch.Label>
                <Switch
                  checked={snippet?.snippetInfo?.isPrivate}
                  onChange={handleSnippetScopeSwitch}
                  className={`${
                    snippet?.snippetInfo?.isPrivate
                      ? "bg-primary"
                      : "bg-gray-200 dark:bg-backgroundV1Dark"
                  } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 -z-0`}
                >
                  <span
                    className={`${
                      snippet?.snippetInfo?.isPrivate
                        ? "translate-x-6"
                        : "translate-x-1"
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                  />
                </Switch>
              </div>
            </Switch.Group>
          </div>
        </div>
      </form>
    </Paper>
  );
};

export default SaveSnippet;

// TODO: redirect back to dashboard archive if no files inside snippet object
