import { useEffect, useState } from "react";
import { Chip, Grid, IconButton, Paper, Stack, Tooltip } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import {
  Delete,
  Download,
  Edit,
  Lock,
  Person,
  Share,
} from "@mui/icons-material";
import SyntaxHighlighter from "react-syntax-highlighter";
import ThemeHeading from "../Generic/Heading";
import ThemeText from "../Generic/Text";
import { useSelector } from "react-redux";
import {
  selectSyntaxTheme,
  SET_DASHBOARD_LOADING,
  SET_SNIPPET,
  SET_SNIPPET_NAME,
} from "../../redux/slices/appSlice";
import Dialog from "../Generic/Dialog";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../client/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { selectSnippets } from "../../redux/slices/userSlice";
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
import ThemeChip from "../Generic/Chip";

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

const Card = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const SnippetCard = ({ name, uid, info, files, ...rest }) => {
  const dispatch = useDispatch();
  const syntaxTheme = useSelector(selectSyntaxTheme);
  const snippets = useSelector(selectSnippets);
  let [snippetFiles, setSnippetFiles] = useState(() => files);
  const [activeFile, setActiveFile] = useState(() => snippetFiles[0]);
  const { createAt, isPrivate, snippetTags, snippetLabels } = info;
  const createdAtStr = new Date(createAt.toDate()).toLocaleString();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [snippetToDeleteUID, setSnippetToDeleteUID] = useState("");
  const enqueueSnackbar = useSnackbar();
  const router = useRouter();

  useEffect(() => {
    let p1 = snippetFiles.slice(0, activeFile.key + 1);
    let p2 = snippetFiles.slice(activeFile.key + 1);
    p1.push({
      downloadButton: true,
      onClick: () => handleFileDownload,
    });
    // setSnippetFiles(p1.concat(p2));
  }, [activeFile]);

  const handleFileDownload = () => {};

  const handleSnippetDelete = async () => {
    await deleteDoc(
      doc(db, "users", user?.uid, "snippets", snippetToDeleteUID)
    );

    enqueueSnackbar(`Snippet was deleted successfully!`, {
      variant: "info",
    });
  };

  const handleSnippetShare = () => {
    setDialogOpen(true);
  };

  const handleSnippetEdit = (uid) => {
    dispatch(SET_DASHBOARD_LOADING(true));
    const snippetToEdit = snippets?.find((snippet) => snippet.id === uid);
    dispatch(SET_SNIPPET(snippetToEdit?.data));
    dispatch(SET_SNIPPET_NAME(snippetToEdit?.data?.snippetName));
    router.push({
      pathname: "/dashboard",
      query: {
        display: "edit-snippet",
      },
    });
  };

  const handleSnippetDownload = () => {};

  return (
    <Grid item xs={2} sm={4} md={4} {...rest}>
      <Card className="snippet__card min-h-[500px] flex flex-col">
        <div className="snippetCard__header">
          <div className="flex items-center">
            <ThemeHeading type="tertiary">{name}</ThemeHeading>
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
                  onClick={() => {
                    setDialogOpen(true);
                    setSnippetToDeleteUID(uid);
                  }}
                >
                  <Delete fontSize="inherit" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Download snippet">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={handleSnippetDownload}
                >
                  <Download fontSize="inherit" />
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
                  onClick={() => handleSnippetEdit(uid)}
                >
                  <Edit fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Stack>
          </div>
        </div>

        <div className="snippetCard__body pt-2">
          <SyntaxHighlighter
            language={activeFile?.language?.name?.toLowerCase() || "javascript"}
            style={syntaxThemes[syntaxTheme]}
            lineNumberStyle={{ fontSize: "10px" }}
            className="max-h-[375px] min-h-[375px]"
            // showLineNumbers
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
            {snippetFiles?.map(({ fileName, key, downloadButton, onClick }) => (
              <>
                {downloadButton ? (
                  <Tooltip title="Download file" key={key}>
                    <IconButton color="primary" size="small" onClick={onClick}>
                      <Download fontSize="small" sx={{ color: "gray" }} />
                    </IconButton>
                  </Tooltip>
                ) : (
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
                      setActiveFile(snippetFiles[key]);
                    }}
                  />
                )}
              </>
            ))}
          </Stack>

          {/* <Stack direction="column" spacing={2}>
            {snippetLabels && (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                className="mt-3 w-full overflow-x-scroll"
              >
                <ThemeText className="text-xs mb-2">Labels:</ThemeText>
                {snippetLabels?.map(({ label, uid }) => (
                  <ThemeChip key={uid}>{label}</ThemeChip>
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
          </Stack> */}
        </div>
      </Card>
      {/* For delete */}
      <Dialog
        title="Are you sure, you want to delete this file. This action can not be undone!"
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
            action: handleSnippetDelete,
          },
        ]}
      />
    </Grid>
  );
};

export default SnippetCard;
