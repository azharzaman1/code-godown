import { Divider, Grid, Paper, Tooltip } from "@mui/material";
import ThemeHeading from "../Generic/Heading";
import { experimentalStyled as styled } from "@mui/material/styles";
import ThemeText from "../Generic/Text";
import { Lock, Person } from "@mui/icons-material";

const Card = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const SnippetCard = ({ name, uid, info, files, ...rest }) => {
  const { createAt, isPrivate } = info;

  return (
    <Grid item xs={2} sm={4} md={4} {...rest}>
      <Card className="min-h-[350px] flex flex-col">
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

          <ThemeText type="info" className="mt-2">
            {new Date(createAt.toDate()).toLocaleString()}
          </ThemeText>
          <Divider flexItem sx={{ marginTop: "10px" }} />
        </div>

        <div className="snippetCard__body pt-2">.</div>
        <div className="snippetCard__footer mt-auto">
          <Divider flexItem sx={{ marginTop: "10px" }} />
        </div>
      </Card>
    </Grid>
  );
};

export default SnippetCard;
