import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Divider } from "@mui/material";
import ThemeButton from "../Generic/Button";
import { PlusIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFromDB } from "../../redux/slices/userSlice";
import { useState } from "react";
import {
  SET_SNIPPET,
  selectSnippet,
  selectLabelName,
} from "../../redux/slices/appSlice";
import { NIL as NIL_UUID, v4 as uuidv4 } from "uuid";

const SnippetLabels = ({ onButtonClick }) => {
  const userInDB = useSelector(selectUserFromDB);
  const labelName = useSelector(selectLabelName);
  const snippet = useSelector(selectSnippet);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  const onSelectChange = (e) => {
    setValue(e.target.value);
    let restOfSnippet = snippet.filter((file) => file.key != 0);
    let fileToEdit = snippet.find((file) => file.key == 0);

    const selecteddLabel = userInDB?.labels?.find(
      (label) => label.key == e.target.value - 1
    );
    dispatch(
      SET_SNIPPET([
        {
          ...fileToEdit,
          snippetLabel: {
            label: labelName,
            key: 0,
            uid: selecteddLabel ? selecteddLabel?.uid : "uid",
          },
        },
        ...restOfSnippet,
      ])
    );
  };

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <Select id="labels-select" value={value} onChange={onSelectChange}>
        <MenuItem value={0} sx={{ paddingLeft: "30px" }}>
          None
        </MenuItem>
        {userInDB?.labels?.map(({ name, key }) => (
          <MenuItem
            key={key}
            value={key + 1}
            sx={{
              paddingLeft: "30px",
            }}
          >
            {name}
          </MenuItem>
        ))}
        {onButtonClick && (
          <div>
            <Divider />
            <div>
              <ThemeButton
                type="icon-text"
                className="mt-1"
                onClick={onButtonClick}
              >
                <PlusIcon className="h-5 mr-3" /> Create label
              </ThemeButton>
            </div>
          </div>
        )}
      </Select>
    </FormControl>
  );
};

export default SnippetLabels;
