import { Grid, Paper, Stack, styled, Typography } from "@mui/material";
import React from "react";

interface IProps {
  name: string;
  age: number;
  email: string;
}

const Info = ({ age, email, name }: IProps) => {
  return (
    <Paper>
      <Grid container spacing={2} alignItems="center" p="1rem">
        <Grid item xs={8}>
          <Typography>Profile -- {name}</Typography>
        </Grid>
        <Grid item xs={4}>
          Edit
        </Grid>
        <Grid item xs={10}>
          <Stack spacing={2}>
            <Typography>Email -- {email}</Typography>
            <Typography>Age -- {age}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Info;
