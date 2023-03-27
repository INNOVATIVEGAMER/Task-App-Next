import { GetProfileUser } from "@/APIFunctions/auth";
import Info from "@/components/profile/Info";
import { QUERY_KEYS } from "@/Constants/TanstackConstants";
import { useAuth } from "@/Context/Auth";
import ProfilePageLayout from "@/layout/ProfilePageLayout";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";

interface IProps {}

const getProfile = (authToken: string | null) => {
  if (!authToken) return null;

  return GetProfileUser({ AUTH_TOKEN: authToken });
};

const ProfilePage = ({}: IProps) => {
  const { authToken } = useAuth();

  const { data, isFetching, isLoading, ...other } = useQuery({
    queryKey: [QUERY_KEYS.USER_PROFILE, authToken],
    queryFn: () => getProfile(authToken),
  });

  return (
    <ProfilePageLayout>
      <Box my="2rem">
        <Typography variant="h2">Profile Page</Typography>
      </Box>
      {(isFetching || isLoading) && <CircularProgress />}
      {!isFetching && !isLoading && data && (
        <Info name={data.name} age={data.age} email={data.email} />
      )}
    </ProfilePageLayout>
  );
};

export default ProfilePage;
