import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { Edit } from "@mui/icons-material";
import SnippetLabels from "./SnippetLabels";
import {
  Checkbox,
  Chip,
  IconButton,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import { PlusIcon } from "@heroicons/react/outline";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/dist/client/router";
import { selectUser, selectUserInDB } from "../../../redux/slices/userSlice";
import {
  selectLabelName,
  selectSnippet,
  selectSnippetName,
  selectTheme,
  SET_LABEL_NAME,
  SET_SELECTED_LABEL_KEY,
  SET_SNIPPET,
  SET_SNIPPET_NAME,
} from "../../../redux/slices/appSlice";
import { db } from "../../../client/firebase";
import { splitAtCharacter } from "../../../files/utils";
import Text from "../../Generic/Text";
import Button from "../../Generic/Button";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const SaveSnippet = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userInDB = useSelector(selectUserInDB);
  const snippet = useSelector(selectSnippet);
  const snippetName = useSelector(selectSnippetName);
  const themePreference = useSelector(selectTheme);
  const [isPrivate, setIsPrivate] = useState(false);
  const [tagsString, setTagsString] = useState("");
  const [tags, setTags] = useState([]);
  const [addingLabel, setAddingLabel] = useState(false);
  const labelName = useSelector(selectLabelName);
  const { enqueueSnackbar } = useSnackbar();
  const dark = themePreference === "dark";

  const handleFileDelete = (key) => {
    if (snippet?.files?.length > 1) {
      const restOfFiles = snippet?.files?.filter((file) => file.key !== key);
      dispatch(
        SET_SNIPPET({
          ...snippet,
          files: restOfFiles?.sort((a, b) => a.key - b.key),
        })
      );
    } else {
      enqueueSnackbar(`Snippet must contain atleast 1 file`, {
        variant: "info",
      });
    }
  };

  const handleTagsGen = () => {
    const tagsArr = splitAtCharacter(tagsString, ",");
    let tagsToAdd = [];
    tagsArr?.forEach((tagName, index) => {
      tagsToAdd.push({
        name: tagName,
        key: index,
        str: tagName.replace(/\s/g, "_").toLowerCase(),
      });
    });

    dispatch(
      SET_SNIPPET({
        ...snippet,
        snippetInfo: {
          ...snippet?.snippetInfo,
          snippetTags: tagsToAdd,
        },
      })
    );

    setTags(tagsArr);
  };

  const handleTagDelete = (name) => {
    let restOfTags = tags?.filter((tag) => tag !== name);
    setTags(restOfTags);
    setTagsString(restOfTags.join(","));
  };

  const handleLabelAddition = () => {
    const docRef = doc(db, "users", user?.uid);
    let previousLabels = userInDB?.labels ? userInDB?.labels : [];
    let uid = `label_${uuidv4()}`;
    setDoc(
      docRef,
      {
        labels: [
          ...previousLabels,
          {
            name: labelName,
            snippets: [],
            createAt: new Date(),
            key: previousLabels?.length,
            uid: uid,
          },
        ],
      },
      { merge: true }
    );
    dispatch(
      SET_SNIPPET({
        ...snippet,
        snippetInfo: {
          ...snippet?.snippetInfo,
          snippetLabels: [
            {
              label: labelName,
              key: 0,
              uid: uid,
            },
          ],
        },
      })
    );
    dispatch(SET_SELECTED_LABEL_KEY(previousLabels?.length + 1));
    setAddingLabel(false);
  };

  const handleIsPrivateChange = (e) => {
    dispatch(
      SET_SNIPPET({
        ...snippet,
        snippetInfo: {
          ...snippet?.snippetInfo,
          isPrivate: !isPrivate,
        },
      })
    );
    setIsPrivate(!isPrivate);
  };

  return (
    <Paper className="addingNewSnippet__intialPhaseContainer pt-4 pb-8 px-4">
      <form className="w-[400px] m-w-[90vw]">
        <div className="flex flex-col space-y-2 mt-6">
          <ThemeText component="label" htmlFor="snippet_name_input">
            Snippet name
          </ThemeText>
          <input
            type="ThemeText"
            placeholder="e.g. Snippet #1"
            id="snippet_name_input"
            className={`input w-full ${dark && "dark"}`}
            value={snippetName}
            onChange={(e) => dispatch(SET_SNIPPET_NAME(e.target.value))}
          />
        </div>
        <div className="flex flex-col space-y-2 mt-6">
          <ThemeText>File{snippet?.files?.length > 1 && "s"}</ThemeText>
          <Stack direction="row" spacing={1} sx={{ overflowX: "scroll" }}>
            {snippet?.files?.map(({ key, fileName }) => (
              <Chip
                key={key}
                label={fileName}
                color="primary"
                onDelete={() => handleFileDelete(key)}
                className="mb-2"
              />
            ))}
          </Stack>
        </div>

        <div className="flex flex-col space-y-2 mt-6">
          <Text>Labels</Text>
          {userInDB?.labels?.length > 0 && !addingLabel ? (
            <SnippetLabels
              onButtonClick={() => {
                setAddingLabel(true);
                dispatch(SET_LABEL_NAME(""));
              }}
            />
          ) : (
            <>
              {addingLabel ? (
                <>
                  <input
                    type="text"
                    placeholder="e.g. Font-end-dev snippets etc."
                    id="tags_input"
                    className={`input w-full ${dark && "dark"}`}
                    value={labelName}
                    onChange={(e) => dispatch(SET_LABEL_NAME(e.target.value))}
                  />
                  {labelName.length > 0 && (
                    <Button
                      type={dark ? "text" : "primary"}
                      size={dark && "small"}
                      className="text-center max-w-sm mt-3"
                      onClick={handleLabelAddition}
                    >
                      Add label
                    </Button>
                  )}
                </>
              ) : (
                <ThemeButton
                  type="icon"
                  className="w-40 justify-evenly"
                  onClick={() => setAddingLabel(true)}
                >
                  <PlusIcon className="h-5" /> Create label
                </ThemeButton>
              )}
            </>
          )}
        </div>

        <div className="flex flex-col space-y-2 mt-6">
          <ThemeText component="label" htmlFor="snippet_name_input">
            Tags
          </ThemeText>
          {tags.length > 0 ? (
            <>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ overflowX: "scroll" }}
              >
                {tags?.map((name, i) => (
                  <Chip
                    key={i}
                    label={name}
                    color="primary"
                    onDelete={() => {
                      handleTagDelete(name);
                    }}
                    className="mb-2"
                  />
                ))}
                <Tooltip title="Edit" placement="right">
                  <IconButton onClick={() => setTags([])}>
                    <Edit fontSize="small" className="text-gray-400" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="e.g. JavsScript,ReactJs,Components"
                id="tags_input"
                className={`input w-full ${dark && "dark"}`}
                value={tagsString}
                onChange={(e) => setTagsString(e.target.value)}
              />
              {tagsString.length > 0 && (
                <ThemeButton
                  type={dark ? "text" : "primary"}
                  size={dark && "small"}
                  className="text-center mt-3"
                  onClick={handleTagsGen}
                >
                  Add
                </ThemeButton>
              )}
            </>
          )}
        </div>
        <div className="flex items-center space-x mt-6">
          <Checkbox
            color="primary"
            value={isPrivate}
            sx={{
              borderColor: "text.primary",
            }}
            onChange={handleIsPrivateChange}
            {...label} // spreading labels
          />
          <ThemeText>Is private?</ThemeText>
        </div>
      </form>
    </Paper>
  );
};

export default SaveSnippet;
