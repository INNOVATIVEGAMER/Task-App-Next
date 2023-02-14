import { BE_ENDPOINT } from "./../../clientAPIs";
import {
  GetProfileTypes,
  SignInUserTypes,
  SignUpUserTypes,
} from "./types/auth.types";

export const SignInUser = ({ email, password }: SignInUserTypes) =>
  BE_ENDPOINT.post("/users/login", { email: email, password: password }).then(
    (res) => res.data
  );

export const SignUpUser = ({ email, password, name, age }: SignUpUserTypes) =>
  BE_ENDPOINT.post("/users", { email, password, name, age }).then(
    (res) => res.data
  );

export const GetProfile = ({ AUTH_TOKEN }: GetProfileTypes) => {
  BE_ENDPOINT.get("/users/me", {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  }).then((res) => res.data);
};
