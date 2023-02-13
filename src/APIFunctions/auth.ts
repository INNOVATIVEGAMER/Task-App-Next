import { BE_ENDPOINT } from "./../../clientAPIs";

type SignInUserTypes = {
  email: string;
  password: string;
};

export const SignInUser = ({ email, password }: SignInUserTypes) =>
  BE_ENDPOINT.post("/users/login", { email: email, password: password }).then(
    (res) => res.data
  );

export const GetProfile = ({ AUTH_TOKEN }: { AUTH_TOKEN: string }) => {
  BE_ENDPOINT.get("/users/me", {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  }).then((res) => res.data);
};
