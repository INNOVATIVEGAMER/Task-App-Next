import { GetProfileUser } from "@/APIFunctions/auth";
import Info from "@/components/profile/Info";
import { QUERY_KEYS } from "@/Constants/TanstackConstants";
import { useAuth } from "@/Context/Auth";
import ProfilePageLayout from "@/layout/ProfilePageLayout";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface IProps {}

const ProfilePage = ({}: IProps) => {
  const { authToken } = useAuth();
  const getProfile = () => {
    if (!authToken) return null;

    return GetProfileUser({ AUTH_TOKEN: authToken });
  };
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.USER_PROFILE],
    queryFn: () => getProfile(),
  });

  return (
    <ProfilePageLayout>
      <Box my="2rem">
        <Typography variant="h2">Profile Page</Typography>
      </Box>
      <Info name={data.name} age={data.age} email={data.email} />
    </ProfilePageLayout>
  );
};

export default ProfilePage;
