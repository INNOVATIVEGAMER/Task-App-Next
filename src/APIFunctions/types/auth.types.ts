export type SignUpUserTypes = {
  name: string;
  age: number;
  email: string;
  password: string;
};

export type SignInUserTypes = {
  email: string;
  password: string;
};

export type GetProfileTypes = {
  AUTH_TOKEN: string;
};
