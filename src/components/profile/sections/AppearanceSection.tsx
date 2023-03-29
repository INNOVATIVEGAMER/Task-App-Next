import ThemeToggleButton from "@/components/appearance/ThemeToggleButton";
import { Box, Button, Grid, Typography } from "@mui/material";

interface IProps {}

const AppearanceSection = ({}: IProps) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <Typography color="primary" variant="h5">
          Appearance
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" gap="1rem" alignItems="center">
          <ThemeToggleButton />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AppearanceSection;
