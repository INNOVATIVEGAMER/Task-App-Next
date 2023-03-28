import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import EditInfoSection from "./EditInfoSection";
import LogoutButton from "../auth/LogoutButton";

interface IProps {
  name: string;
  age: number;
  email: string;
}

const Info = ({ age, email, name }: IProps) => {
  const [editMode, seteditMode] = useState<boolean>(false);

  const closeEditMode = () => {
    seteditMode(false);
  };

  return (
    <Paper>
      <Grid container spacing={2} alignItems="center" p="1rem">
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
    </Paper>
  );
};

export default Info;
