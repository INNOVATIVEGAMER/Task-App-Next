import { Divider, Grid, Typography } from "@mui/material";
import AppearanceSection from "./sections/AppearanceSection";
import PublicInfoSection from "./sections/PublicInfoSection";
import SecuritySection from "./sections/SecuritySection";

interface IProps {
  name: string;
  age: number;
  email: string;
}

const Info = ({ age, email, name }: IProps) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PublicInfoSection age={age} name={name} email={email} />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <SecuritySection />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <AppearanceSection />
      </Grid>
    </Grid>
  );
};

export default Info;
