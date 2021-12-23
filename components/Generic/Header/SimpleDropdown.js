import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { selectTheme } from "../../../redux/slices/appSlice";
import { useSelector } from "react-redux";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { Code } from "@mui/icons-material";
import { ListItemIcon } from "@mui/material";
import ThemeText from "../Text";

export default function SimpleDropdown({ label, dropdownData, dark }) {
  const themePreference = useSelector(selectTheme);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="flex items-center space-x-2">
        <span
          className={`link ${dark && "dark"}`}
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {label}
        </span>
        <ChevronDownIcon className="h-3.5 text-gray-500" />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            color: "primary.contrastText",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.2))",
            minWidth: 250,
            mt: 1.5,
            bgcolor: "primary",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        {dropdownData.map(({ name, description, imgSrc, href }) => (
          <MenuItem
            key={description.trim()}
            href={href}
            target="_blank"
            divider
          >
            <div className="flex">
              <ListItemIcon sx={{ color: "primary.contrastText" }}>
                <Code />
              </ListItemIcon>
              <div className="flex flex-col">
                <ThemeText>{name}</ThemeText>
                <span className={`mt-2 text-gray-400 text-sm`}>
                  {description}
                </span>
              </div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
