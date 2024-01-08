import { AuthGoogle } from "@/APIFunctions/auth";
import { Google } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const Oauth = ({}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: AuthGoogle,
    onSuccess: (data) => {
      const authScreenURL = data.url;
      if (!data.url) {
        toast.error("Something went wrong!! Please try again");
        return;
      }

      window.open(authScreenURL, "_self");
    },
    onError: (error: AxiosError) => {
      toast.error(error.response?.data as string);
    },
  });

  const handleGoogleAuth = () => mutate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
      }}
    >
      <Button
        variant="outlined"
        endIcon={<Google />}
        onClick={handleGoogleAuth}
      >
        Google
      </Button>
    </Box>
  );
};

export default Oauth;
