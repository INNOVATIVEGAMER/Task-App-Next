import { LogOutUser } from "@/APIFunctions/auth";
import { useAuth } from "@/Context/Auth";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

interface Props {}

const LogoutButton = (props: Props) => {
  const { authToken, logout } = useAuth();

  const { mutate, isLoading } = useMutation({
    mutationFn: LogOutUser,
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
      variant="outlined"
      onClick={handleLogOut}
      disabled={isLoading}
      color="error"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
