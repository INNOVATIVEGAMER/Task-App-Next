import { GetProfileUser } from "@/APIFunctions/auth";
import Info from "@/components/profile/Info";
import { QUERY_KEYS } from "@/Constants/TanstackConstants";
import { useAuth } from "@/Context/Auth";
import { isAuthError } from "@/helpers/authHelpers";
import AuthenticatedPageLayout from "@/layout/AuthenticatedPageLayout";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface IProps {}

const getProfile = (authToken: string | null) => {
  if (!authToken) return null;

  return GetProfileUser({ AUTH_TOKEN: authToken });
};

const ProfilePage = ({}: IProps) => {
  const { authToken, logout } = useAuth();

  const { data, isFetching, isLoading, ...other } = useQuery({
    queryKey: [QUERY_KEYS.USER_PROFILE, authToken],
    queryFn: () => getProfile(authToken),
    onError: (error: AxiosError) => {
      const statusCode = error.response?.status;
      if (statusCode && isAuthError(statusCode)) logout();
    },
  });

  return (
    <AuthenticatedPageLayout>
      {(isFetching || isLoading) && <CircularProgress />}
      {!isFetching && !isLoading && data && (
        <>
          <Box mb={2}>
            <Typography variant="h2">Profile Page</Typography>
          </Box>
          <Info name={data.name} age={data.age} email={data.email} />
        </>
      )}
    </AuthenticatedPageLayout>
  );
};

export default ProfilePage;
