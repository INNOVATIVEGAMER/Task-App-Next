import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Task App
      </Link>{" "}
      @ Nexus {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
