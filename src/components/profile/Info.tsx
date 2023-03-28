import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import EditInfoSection from "./EditInfoSection";
import LogoutButton from "../auth/LogoutButton";
import LogoutAllButton from "../auth/LogoutAllButton";
import KeyIcon from "@mui/icons-material/Key";

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
    <Grid container spacing={3}>
      <Grid item xs={12}>
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
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Typography color="primary" variant="h5">
              Security Features
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" gap="1rem" alignItems="center">
              <Button
                onClick={() => console.log("functionality to be added")}
                endIcon={<KeyIcon color="inherit" fontSize="small" />}
                color="secondary"
                variant="outlined"
              >
                Change Password
              </Button>
              <LogoutAllButton />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Info;
