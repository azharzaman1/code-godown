import { Divider, Paper } from "@mui/material";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import useAxiosPrivate from "../../../hooks/auth/useAxiosPrivate";
import Heading from "../../Generic/Heading";
import Text from "../../Generic/Text";

const AddNewLabel = ({ labelName, setLabelName }) => {
  return (
    <Paper className="p-4 pt-2">
      <Heading type="secondary">Add new Label</Heading>
      <Divider className="pt-3" />
      <form className="mt-5">
        <div className="flex flex-col space-y-2 mt-4 w-full">
          <Text component="label" htmlFor="snippet-name">
            Label name
          </Text>
          <input
            type="text"
            placeholder="e.g. Frontend snippets"
            id="label-name"
            className={`input w-full`}
            value={labelName}
            onChange={(e) => {
              setLabelName(e.target.value);
            }}
          />
        </div>
      </form>
    </Paper>
  );
};

export default AddNewLabel;
