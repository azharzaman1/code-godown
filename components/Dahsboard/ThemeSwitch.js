import { useDispatch, useSelector } from "react-redux";
import {
  selectSyntaxTheme,
  SET_SYNTAX_THEME,
} from "../../redux/slices/appSlice";
import { Dropdown } from "primereact/dropdown";

const ThemeSwitch = ({ themes }) => {
  const dispatch = useDispatch();
  const syntaxTheme = useSelector(selectSyntaxTheme);

  const onThemeChange = (e) => {
    dispatch(SET_SYNTAX_THEME(e.value));
  };

  return (
    <Dropdown
      value={syntaxTheme}
      options={themes}
      onChange={onThemeChange}
      placeholder="Theme"
      className="w-56"
    />
  );
};

// <FormControl sx={{ minWidth: 180 }}>
//   <Select
//     id="theme-select"
//     value={syntaxTheme}
//     onChange={onSelectChange}
//     size="small"
//   >
//     {themes?.map(({ name, key }) => (
//       <MenuItem
//         key={key}
//         value={key}
//         sx={{
//           paddingLeft: "30px",
//         }}
//       >
//         {name}
//       </MenuItem>
//     ))}
//   </Select>
// </FormControl>

export default ThemeSwitch;
