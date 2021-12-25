import {
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import ThemeHeading from "../Generic/Heading";
import { experimentalStyled as styled } from "@mui/material/styles";
import ThemeText from "../Generic/Text";
import { Delete, Edit, Lock, Person, Share } from "@mui/icons-material";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  a11yDark,
  atomOneDark,
  atomOneDarkReasonable,
  atomOneLight,
  far,
  github,
  githubGist,
  gradientDark,
  tomorrowNightBlue,
  schoolBook,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useState } from "react";

const Card = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const SnippetCard = ({ name, uid, info, files, ...rest }) => {
  const [activeFile, setActiveFile] = useState(() => files[0]);
  const { createAt, isPrivate, snippetTags, snippetLabels } = info;
  const createdAtStr = new Date(createAt.toDate()).toLocaleString();

  const handleSnippetDelete = () => {};

  const handleSnippetShare = () => {};

  const handleSnippetEdit = () => {};

  return (
    <Grid item xs={2} sm={4} md={4} {...rest}>
      <Card className="snippet__card min-h-[595px] flex flex-col">
        <div className="snippetCard__header">
          <div className="flex items-center">
            <ThemeHeading type={"tertiary"}>{name}</ThemeHeading>
            <Tooltip title={isPrivate ? "Private" : "Public"}>
              {isPrivate ? (
                <Lock
                  sx={{ fontSize: "14px", marginLeft: "9px", marginTop: "2px" }}
                />
              ) : (
                <Person
                  sx={{ fontSize: "16px", marginLeft: "9px", marginTop: "2px" }}
                />
              )}
            </Tooltip>
          </div>
          <div className="flex-between-center">
            <ThemeText type="info" className="mt-2">
              {createdAtStr}
            </ThemeText>
            <Stack
              className="snippetCard__actions"
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <Tooltip title="Delete snippet">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={handleSnippetDelete}
                >
                  <Delete fontSize="inherit" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Share snippet">
                <IconButton
                  color="primary"
                  size="small"
                  onClick={handleSnippetShare}
                >
                  <Share fontSize="inherit" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit snippet">
                <IconButton
                  color="primary"
                  size="small"
                  onClick={handleSnippetEdit}
                >
                  <Edit fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Stack>
          </div>
        </div>

        <div className="snippetCard__body pt-2">
          <SyntaxHighlighter
            language="javascript"
            style={atomOneDark}
            showLineNumbers
            lineNumberStyle={{ fontSize: "10px" }}
            className="max-h-[375px] min-h-[375px]"
          >
            {activeFile?.code}
          </SyntaxHighlighter>
        </div>

        <div className="snippetCard__footer mt-auto">
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            className="mt-3 w-full overflow-x-scroll"
          >
            <ThemeText className="text-xs mb-2">Files:</ThemeText>
            {files?.map(({ fileName, key }) => (
              <Chip
                key={key}
                color={activeFile.key == key ? "primary" : "default"}
                label={fileName}
                variant="outlined"
                size="small"
                sx={{
                  marginBottom: "8px !important",
                }}
                onClick={() => {
                  setActiveFile(files[key]);
                }}
              />
            ))}
          </Stack>

          {/* <Divider flexItem sx={{ marginBottom: "10px", marginTop: "10px" }} /> */}

          <Stack direction="column" spacing={2}>
            {snippetLabels && (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                className="mt-3 w-full overflow-x-scroll"
              >
                <ThemeText className="text-xs mb-2">Labels:</ThemeText>
                {snippetLabels?.map(({ label, key, uid }) => (
                  <>
                    {label && (
                      <Chip
                        key={uid}
                        label={label}
                        size="small"
                        variant="outlined"
                        onClick={() => {}}
                        sx={{
                          marginBottom: "8px !important",
                        }}
                      />
                    )}
                  </>
                ))}
              </Stack>
            )}

            {snippetTags && (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                className="flex-wrap"
                className="mt-3 w-full overflow-x-scroll"
              >
                <ThemeText className="text-xs mb-2">Tags:</ThemeText>
                {snippetTags?.map(({ name, key, str }) => (
                  <Chip
                    key={key}
                    label={name}
                    variant="outlined"
                    size="small"
                    sx={{
                      marginBottom: "8px !important",
                    }}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        </div>
      </Card>
    </Grid>
  );
};

export default SnippetCard;
