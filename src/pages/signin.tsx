import { ChangeEvent, useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Copyright from "@/components/auth/Copyright";
import AuthPageLayout from "@/layout/AuthPageLayout";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "./_app";
import { SignInUser } from "@/APIFunctions/auth";
import { useRouter } from "next/router";
import { useAuth } from "@/Context/Auth";
import { QUERY_KEYS } from "@/Constants/TanstackConstants";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Divider } from "@mui/material";
import Oauth from "@/components/auth/Oauth";

export default function SignIn() {
  const { login } = useAuth();
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [tokenProcessing, setTokenProcessing] = useState<boolean>(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: SignInUser,
    onSuccess: (data) => {
      // Invalidate and refetch
      login(data.token, rememberMe);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
      router.push("/dashboard");
      toast.success("Welcome");
    },
    onError: (error: AxiosError) => {
      toast.error(error.response?.data as string, {
        style: { width: "500px" },
        autoClose: 5000,
      });
    },
  });

  useEffect(() => {
    const oauthToken = router.query.token as string;
    if (!oauthToken || tokenProcessing) return;

    setTokenProcessing(true);
    login(oauthToken, true);
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
    router.push("/dashboard");
    toast.success("Welcome");
  }, [login, router, tokenProcessing]);

  const handleRememberMe = (
    e: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (checked) setRememberMe(true);
    else setRememberMe(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (email && password)
      mutate({
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
          gap: "16px",
        }}
      >
        <Oauth />
        <Divider style={{ width: "100%" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  color="primary"
                  onChange={handleRememberMe}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
      </Box>
    </AuthPageLayout>
  );
}
