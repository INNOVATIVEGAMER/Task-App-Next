import { LogOutUserFromAllSessions } from "@/APIFunctions/auth";
import { useAuth } from "@/Context/Auth";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useMutation } from "@tanstack/react-query";
import { forwardRef, useState } from "react";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {}

const LogoutAllButton = (props: Props) => {
  const { authToken, logout } = useAuth();
  const [dialogopen, setdialogOpen] = useState<boolean>(false);

  const handleClickDialogOpen = () => {
    setdialogOpen(true);
  };

  const handleClickDialogClose = () => {
    setdialogOpen(false);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: LogOutUserFromAllSessions,
    onSuccess: () => {
      logout();
    },
  });

  const handleLogOut = () => {
    if (!authToken) return;

    mutate({ AUTH_TOKEN: authToken });
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickDialogOpen}
        disabled={isLoading}
        color="error"
      >
        Logout From All Session
      </Button>
      <Dialog
        open={dialogopen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Logout From Nexus (All Sessions)</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you really want to logout from all sessions active on different
            devices?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickDialogClose}>Disagree</Button>
          <Button onClick={handleLogOut}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LogoutAllButton;
