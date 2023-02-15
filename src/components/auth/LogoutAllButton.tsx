import { LogOutUserFromAllSessions } from "@/APIFunctions/auth";
import { useAuth } from "@/Context/Auth";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

interface Props {}

const LogoutAllButton = (props: Props) => {
  const { authToken, logout } = useAuth();

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
    <Button
      variant="contained"
      onClick={handleLogOut}
      disabled={isLoading}
      color="error"
    >
      Logout From All Session
    </Button>
  );
};

export default LogoutAllButton;
