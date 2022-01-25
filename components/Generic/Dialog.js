import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/slices/appSlice";
import ThemeButton from "./Button";
import { Divider } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MuiDialog({
  open = true,
  setOpen,
  title,
  dialogContent,
  dialogActions,
}) {
  const themePreference = useSelector(selectTheme);
  const dark = themePreference === "dark";
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <Divider />
        {dialogActions && (
          <DialogActions>
            {dialogActions.map(({ label, action }) => (
              <ThemeButton
                key={label.trim()}
                type="text"
                size="small"
                onClick={action}
              >
                {label}
              </ThemeButton>
            ))}
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}

export default MuiDialog;
