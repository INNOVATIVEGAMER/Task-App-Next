import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Copyright from "@/components/auth/Copyright";
import AuthPageLayout from "@/layout/AuthPageLayout";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { SignUpUser } from "@/APIFunctions/auth";
import { queryClient } from "./_app";
import { useAuth } from "@/Context/Auth";
import { QUERY_KEYS } from "@/Constants/TanstackConstants";

export default function SignUp() {
  const { login } = useAuth();
  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: SignUpUser,
    onSuccess: (data) => {
      // Invalidate and refetch
      login(data.token, false);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
      router.push("/dashboard");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const age = data.get("age");
    const name = data.get("name");

    if (email && password && name && age)
      mutate({
        name: name.toString(),
        age: Number(age.toString()),
        email: email.toString(),
        password: password.toString(),
      });
  };

  return (
    <AuthPageLayout>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoComplete="given-name"
                name="age"
                required
                fullWidth
                id="age"
                label="Age"
                autoFocus
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </AuthPageLayout>
  );
}
