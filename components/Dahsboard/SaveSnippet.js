import {
  Checkbox,
  Chip,
  IconButton,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  selectSnippet,
  selectSnippetName,
  selectTheme,
  SET_SNIPPET,
  SET_SNIPPET_NAME,
} from "../../redux/slices/appSlice";
import { TWText } from "../../files/theming/TWComponents";
import { useState } from "react";
import ThemeButton from "../Generic/Button";
import { splitAtCharacter } from "../../files/utils";
import { Edit } from "@mui/icons-material";
import { useSnackbar } from "notistack";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const SaveSnippet = () => {
  const dispatch = useDispatch();
  const snippet = useSelector(selectSnippet);
  const snippetName = useSelector(selectSnippetName);
  const themePreference = useSelector(selectTheme);
  const dark = themePreference === "dark";
  const [tagsString, setTagsString] = useState("");
  const [tags, setTags] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleFileDelete = (key) => {
    if (snippet.length > 1) {
      const restOfSnippet = snippet?.filter((file) => file.key !== key);
      dispatch(SET_SNIPPET(restOfSnippet));
    } else {
      enqueueSnackbar(`Snippet must contain atleast 1 file`, {
        variant: "info",
      });
    }
  };

  const handleTagsGen = () => {
    const tagsArr = splitAtCharacter(tagsString, ",");
    console.log(tagsArr);
    setTags(tagsArr);
  };

  const handleTagDelete = (name) => {
    let restOfTags = tags?.filter((tag) => tag !== name);
    setTags(restOfTags);
    setTagsString(restOfTags.join(","));
  };

  return (
    <Paper className="addingNewSnippet__intialPhaseContainer pt-4 pb-8 px-4 my-4 mx-4">
      <form>
        <div className="flex flex-col space-y-2 mt-4">
          <TWText
            dark={themePreference === "dark"}
            component="label"
            htmlFor="snippet_name_input"
          >
            Snippet name
          </TWText>
          <input
            type="text"
            placeholder="e.g. Snippet #1"
            id="snippet_name_input"
            className={`input max-w-sm ${themePreference === "dark" && "dark"}`}
            value={snippetName}
            onChange={(e) => dispatch(SET_SNIPPET_NAME(e.target.value))}
          />
        </div>
        <div className="flex flex-col space-y-2 mt-4 max-w-sm">
          <TWText dark={themePreference === "dark"}>
            File{snippet.length > 1 && "s"}
          </TWText>
          <Stack direction="row" spacing={1}>
            {snippet?.map(({ key, fileName }) => (
              <Chip
                key={key}
                label={fileName}
                color="primary"
                onDelete={() => handleFileDelete(key)}
              />
            ))}
          </Stack>
        </div>

        <div className="flex flex-col space-y-2 mt-4">
          <TWText
            dark={themePreference === "dark"}
            component="label"
            htmlFor="snippet_name_input"
          >
            Tags
          </TWText>
          {tags.length > 0 ? (
            <>
              <Stack direction="row" spacing={1} alignItems="center">
                {tags?.map((name, i) => (
                  <Chip
                    key={i}
                    label={name}
                    color="primary"
                    variant="outlined"
                    onDelete={() => {
                      handleTagDelete(name);
                    }}
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
                className={`input max-w-sm ${
                  themePreference === "dark" && "dark"
                }`}
                value={tagsString}
                onChange={(e) => setTagsString(e.target.value)}
              />
              {tagsString.length > 0 && (
                <ThemeButton
                  type={dark ? "text" : "primary"}
                  size={dark && "small"}
                  className="text-center max-w-sm mt-3"
                  onClick={handleTagsGen}
                >
                  Add
                </ThemeButton>
              )}
            </>
          )}
        </div>
        <div className="flex items-center space-x mt-4">
          <Checkbox color="primary" {...label} defaultChecked />
          <TWText dark={themePreference === "dark"}>Is private?</TWText>
        </div>
      </form>
    </Paper>
  );
};

export default SaveSnippet;
