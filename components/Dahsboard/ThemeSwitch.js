import { FormControl, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSyntaxTheme,
  SET_SYNTAX_THEME,
} from "../../redux/slices/appSlice";

const ThemeSwitch = ({ themes = [] }) => {
  const dispatch = useDispatch();
  const syntaxTheme = useSelector(selectSyntaxTheme);
  const onSelectChange = (e) => {
    dispatch(SET_SYNTAX_THEME(e.target.value));
  };
  return (
    <FormControl sx={{ minWidth: 180 }}>
      <Select
        id="theme-select"
        value={syntaxTheme}
        onChange={onSelectChange}
        size="small"
      >
        {themes?.map(({ name, key }) => (
          <MenuItem
            key={key}
            value={key}
            sx={{
              paddingLeft: "30px",
            }}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ThemeSwitch;
