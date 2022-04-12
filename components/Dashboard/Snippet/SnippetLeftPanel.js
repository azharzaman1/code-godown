import { LocalOfferOutlined, Lock } from "@mui/icons-material";
import { Divider, Paper } from "@mui/material";
import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { selectSnippet } from "../../../redux/slices/appSlice";
import Heading from "../../Generic/Heading";
import Text from "../../Generic/Text";
import Tooltip from "../../Generic/Tooltip";
import Tag from "../../Generic/Tag";
import Label from "../../Generic/Label";

const SnippetLeftPanel = ({ snippet }) => {
  return (
    <div className="snippet-left-panel mt-2">
      {/* Portion 1 */}

      <div className="">
        {/* Snippet Info Header */}
        <div className="snippet-info-header pl-2 md:pl-4">
          <div className="flex items-center space-x-2">
            <Heading type="tertiary">{snippet?.snippetName}</Heading>
            {snippet?.snippetInfo?.isPrivate && (
              <Tooltip content="Private">
                <Lock
                  sx={{ fontSize: "14px", marginLeft: "9px", marginTop: "2px" }}
                />
              </Tooltip>
            )}
          </div>
          <div className="flex justify-between items-center mt-1">
            <Text type="info">
              {format(
                parseISO(snippet?.createdAt || new Date().toISOString()),
                "yyyy/MM/dd hh:mm aaaaa'm'"
              )}
            </Text>
          </div>
        </div>

        <Divider className="hidden lg:block py-1" />

        <div className="snippet-info-body hidden lg:flex lg:flex-col lg:space-y-2 py-3 pl-2 md:pl-4">
          <div className="">
            <Text bold>{snippet?.owner?.fullName}</Text>
            <Text type="info">{snippet?.owner?.email}</Text>
          </div>
        </div>
      </div>

      <Divider className="hidden lg:block" />

      {/* Portion 2 */}

      <div className="snippet-info-footer hidden lg:flex lg:flex-col lg:space-y-2 mt-3 pl-2 md:pl-4">
        <div className="tags flex items-center flex-wrap">
          {snippet?.labels?.map((label) => (
            <Label>{label.name}</Label>
          ))}
        </div>
        {/* Tags */}
        <div className="tags flex items-center flex-wrap">
          {snippet?.tags?.map((tag) => (
            <Tag>{tag.name}</Tag>
          ))}
        </div>
      </div>

      {/* Portion 3 */}
      <Paper className="p-2 mt-5 hidden lg:block ml-2">
        {/* Snippet Info Header */}
        <div className="snippet-info-header">
          <div className="flex items-center space-x-2">
            <Heading type="tertiary">Recent activity</Heading>
          </div>
        </div>
        <div className="snippet-page-activity overflow-y-scroll max-h-64 mt-2">
          {snippet?.snapshots?.length > 0 &&
            snippet?.snapshots
              ?.slice()
              ?.reverse()
              ?.map((snap, i) => {
                // preparing versions to display
                let versions = [];
                for (let y = 2; y < snippet?.snapshots?.length + 2; y++) {
                  versions.push(y);
                }
                return (
                  <ActivityEvent
                    event={`Updated (v-0.${versions.reverse()[i]})`}
                    at={snap?.createdAt}
                    className="mt-2"
                  />
                );
              })}
          <ActivityEvent
            event="Added (v-0.1)"
            at={snippet?.createdAt}
            className="mt-2"
          />
        </div>
      </Paper>
    </div>
  );
};

const ActivityEvent = ({ event, at, ...rest }) => {
  return (
    <div {...rest}>
      <Text>{event}</Text>
      <Text type="info">
        @
        {format(
          parseISO(at || new Date().toISOString()),
          "yyyy/MM/dd hh:mm aaaaa'm'"
        )}
      </Text>
    </div>
  );
};

export default SnippetLeftPanel;
