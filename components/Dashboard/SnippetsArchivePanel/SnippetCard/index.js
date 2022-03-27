import { useState } from "react";
import { Chip, Grid, Paper, Stack, Tooltip } from "@mui/material";
import { Lock } from "@mui/icons-material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useSelector } from "react-redux";
import { selectSyntaxTheme } from "../../../../redux/slices/appSlice";
import Dialog from "../../../Generic/Dialog";
import ThemeHeading from "../../../Generic/Heading";
import ThemeText from "../../../Generic/Text";
// syntax themes
import atomOneDark from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import atomOneLight from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-light";
import a11yDark from "react-syntax-highlighter/dist/cjs/styles/hljs/a11y-dark";
import a11yLight from "react-syntax-highlighter/dist/cjs/styles/hljs/a11y-light";
import far from "react-syntax-highlighter/dist/cjs/styles/hljs/far";
import github from "react-syntax-highlighter/dist/cjs/styles/hljs/github";
import githubGist from "react-syntax-highlighter/dist/cjs/styles/hljs/github-gist";
import gradientDark from "react-syntax-highlighter/dist/cjs/styles/hljs/gradient-dark";
import tomorrowNightBlue from "react-syntax-highlighter/dist/cjs/styles/hljs/tomorrow-night-blue";
import schoolBook from "react-syntax-highlighter/dist/cjs/styles/hljs/school-book";
import { format, parseISO } from "date-fns";
import SnippetCardActions from "./SnippetCardActions";

const syntaxThemes = {
  atomOneDark: atomOneDark,
  atomOneLight: atomOneLight,
  a11yDark: a11yDark,
  a11yLight: a11yLight,
  far: far,
  github: github,
  githubGist: githubGist,
  gradientDark: gradientDark,
  tomorrowNightBlue: tomorrowNightBlue,
  schoolBook: schoolBook,
};

const SnippetCard = ({ snippet, ...rest }) => {
  const syntaxTheme = useSelector(selectSyntaxTheme);
  let [snippetFiles, setSnippetFiles] = useState(() => snippet.files);
  const [activeFile, setActiveFile] = useState(() => snippet.files[0]);

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Grid
      item
      xs={12}
      sm={4}
      md={4}
      {...rest}
      className="snippet__card w-full min-h-[500px]"
    >
      <Paper sx={{ px: 2, py: 2 }} className="flex flex-col">
        <div className="snippetCard__header">
          <div className="flex items-center">
            <ThemeHeading type="tertiary">{snippet?.snippetName}</ThemeHeading>
            {snippet?.snippetInfo?.isPrivate ? (
              <Tooltip title="Private">
                <Lock
                  sx={{ fontSize: "14px", marginLeft: "9px", marginTop: "2px" }}
                />
              </Tooltip>
            ) : (
              <></>
            )}
          </div>
          <div className="flex-between-center">
            <ThemeText type="info" className="mt-2">
              {format(
                parseISO(snippet?.createdAt),
                "yyyy/MM/dd hh:mm aaaaa'm'"
              )}
            </ThemeText>
            <SnippetCardActions snippet={snippet} />
          </div>
        </div>

        <div className="snippetCard__body pt-2">
          <SyntaxHighlighter
            language={activeFile?.language?.name?.toLowerCase() || "javascript"}
            style={syntaxThemes[syntaxTheme]}
            lineNumberStyle={{ fontSize: "10px" }}
            className="max-h-[375px] min-h-[375px] max-w-[100%]"
            // wrapLongLines
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
            {snippetFiles?.map(({ fileName, key, downloadButton, onClick }) => (
              <Chip
                key={key}
                color="primary"
                label={fileName}
                variant={activeFile.key == key ? "" : "outlined"}
                size="small"
                sx={{
                  marginBottom: "8px !important",
                }}
                onClick={() => {
                  setActiveFile(snippetFiles[key]);
                }}
              />
            ))}
          </Stack>
        </div>
      </Paper>
      {/* For delete */}
      <Dialog
        title="Delete Snippet"
        dialogContent="Are you sure, This action can not be undone for now."
        open={dialogOpen}
        setOpen={setDialogOpen}
        dialogActions={[
          {
            label: "Cancel",
            action: () => {
              setDialogOpen(false);
            },
          },
          {
            label: "Delete",
            action: () => {},
          },
        ]}
      />
    </Grid>
  );
};

export default SnippetCard;