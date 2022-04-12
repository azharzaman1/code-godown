import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { format, parseISO } from "date-fns";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Grid, Stack, Tooltip } from "@mui/material";
import { Lock } from "@mui/icons-material";
import {
  selectSyntaxTheme,
  SET_SNIPPET,
} from "../../../../redux/slices/appSlice";
import SnippetCardActions from "./SnippetCardActions";
import Heading from "../../../Generic/Heading";
import Text from "../../../Generic/Text";
import Chip from "../../../Generic/Chip";
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

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSnippetOpen = () => {
    router.push({
      pathname: `/dashboard/snippet/${snippet?.slug}`,
      query: {
        snippet: snippet?.snippetName,
        _id: snippet?._id,
      },
    });
  };

  return (
    <Grid
      item
      xs={12}
      sm={4}
      md={4}
      {...rest}
      className="snippet__card w-full min-h-[500px]"
    >
      <div className="flex flex-col px-4 pt-4 pb-2 bg-backgroundContrast dark:bg-backgroundContrastDark rounded-lg shadow-md">
        <div className="snippetCard__header">
          <div className="flex items-center">
            <Heading
              type="tertiary"
              className="cursor-pointer hover:underline underline-offset-2"
              onClick={handleSnippetOpen}
            >
              {snippet?.snippetName}
            </Heading>

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
            <Text type="info" className="mt-2">
              {format(
                parseISO(snippet?.createdAt),
                "yyyy/MM/dd hh:mm aaaaa'm'"
              )}
            </Text>
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
          <Stack direction="column">
            <div className="files mt-2 w-full flex items-center flex-wrap">
              {snippetFiles?.map(({ fileName, key }) => (
                <Chip
                  key={key}
                  color={activeFile.key == key ? "primaryContained" : "light"}
                  size="small"
                  className="mb-2 mr-2 mt-1"
                  onClick={() => {
                    setActiveFile(snippetFiles[key]);
                  }}
                >
                  {fileName}
                </Chip>
              ))}
            </div>
            <div className="flex flex-col space-y-2 mt-1">
              <div className="tags flex items-center flex-wrap">
                {snippet?.tags?.map((tag) => (
                  <span className="mt-1 mr-2 text-sm text-secondaryText dark:text-secondaryTextDark">
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          </Stack>
        </div>
      </div>
    </Grid>
  );
};

export default SnippetCard;
