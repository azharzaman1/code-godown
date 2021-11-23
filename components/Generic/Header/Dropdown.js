import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { sendEmailVerification, signOut } from "@firebase/auth";
import { useRouter } from "next/dist/client/router";
import { useSnackbar } from "notistack";
import { useAuthState } from "react-firebase-hooks/auth";
import { Fragment, useState } from "react";
import {
  Dashboard,
  Verified,
  Logout,
  Settings,
  PersonAdd,
} from "@mui/icons-material";
import { auth } from "../../../client/firebase";
import { splitAtIndex } from "../../../files/utils";

function Dropdown({ dropdownTrigger, avatar }) {
  const [user, loading, error] = useAuthState(auth);
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        router.push({
          pathname: "/authentication",
          query: {
            mode: "login",
          },
        });
        enqueueSnackbar(`Signout Successful`, {
          variant: "info",
        });
      })
      .catch((error) => {
        enqueueSnackbar(error, {
          variant: "error",
        });
      });
  };

  const emailVerificationHandler = () => {
    let [emailName, emailProvider] = user?.email?.split("@");

    sendEmailVerification(auth.currentUser).then(() => {
      enqueueSnackbar(
        `Email verification has been sent to ${splitAtIndex(
          emailName,
          3
        )}***@${emailProvider}`,
        {
          variant: "info",
        }
      );
    });
  };

  const dashboardRedirectHandler = () => {
    router.push({
      pathname: "/dashboard",
      query: {
        display: "snippets",
      },
    });
  };

  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            {dropdownTrigger}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.2))",
            minWidth: 250,
            mt: 1.5,
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
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>{avatar} Profile</MenuItem>
        <MenuItem onClick={dashboardRedirectHandler}>
          <ListItemIcon>
            <Dashboard fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>

        <Divider />
        {!user?.emailVerified && (
          <MenuItem onClick={emailVerificationHandler}>
            <ListItemIcon>
              <Verified fontSize="small" />
            </ListItemIcon>
            Verify email address
          </MenuItem>
        )}
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add friend
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

export default Dropdown;
