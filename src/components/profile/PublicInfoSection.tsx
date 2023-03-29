import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import LogoutButton from "../auth/LogoutButton";
import EditInfoSection from "./EditInfoSection";
import EditIcon from "@mui/icons-material/Edit";

interface IProps {
  name: string;
  age: number;
  email: string;
}

const PublicInfoSection = ({ age, email, name }: IProps) => {
  const [editMode, seteditMode] = useState<boolean>(false);

  const closeEditMode = () => {
    seteditMode(false);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8}>
        <Typography color="primary" variant="h5">
          Public Info
        </Typography>
      </Grid>
      {!editMode && (
        <Grid item xs={4}>
          <Box display="flex" gap="1rem" alignItems="center">
            <Button
              onClick={() => seteditMode(true)}
              endIcon={<EditIcon color="info" fontSize="small" />}
              color="info"
              variant="outlined"
            >
              Edit
            </Button>
            <LogoutButton />
          </Box>
        </Grid>
      )}
      <Grid item xs={10}>
        {!editMode && (
          <Stack spacing={2}>
            <Typography>Name -- {name}</Typography>
            <Typography>Email -- {email}</Typography>
            <Typography>Age -- {age}</Typography>
          </Stack>
        )}
        {editMode && (
          <EditInfoSection
            age={age}
            email={email}
            name={name}
            closeEditMode={closeEditMode}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default PublicInfoSection;
