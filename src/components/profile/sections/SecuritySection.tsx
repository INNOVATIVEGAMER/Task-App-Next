import { Box, Button, Grid, Typography } from "@mui/material";
import LogoutAllButton from "../../auth/LogoutAllButton";
import KeyIcon from "@mui/icons-material/Key";
import DeleteButton from "../../auth/DeleteButton";

interface IProps {}

const SecuritySection = ({}: IProps) => {
  return (
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
          <DeleteButton />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SecuritySection;
