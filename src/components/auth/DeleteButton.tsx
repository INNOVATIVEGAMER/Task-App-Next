import { DeleteUser } from "@/APIFunctions/auth";
import { useAuth } from "@/Context/Auth";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { SlideUpTransition } from "../common/Transitions";

interface Props {}

const DeleteButton = (props: Props) => {
  const { authToken, logout } = useAuth();
  const [dialogopen, setdialogOpen] = useState<boolean>(false);

  const handleClickDialogOpen = () => {
    setdialogOpen(true);
  };

  const handleClickDialogClose = () => {
    setdialogOpen(false);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: DeleteUser,
    onSuccess: () => {
      logout();
    },
  });

  const handleDelete = () => {
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
        Delete Account
      </Button>
      <Dialog
        open={dialogopen}
        TransitionComponent={SlideUpTransition}
        keepMounted
        onClose={handleClickDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Leaving Nexus</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you really want to delete your account ? This will result in all
            the data related to your account completely wiped out and non
            recoverable
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickDialogClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete Anyway
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteButton;
