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

export type AuthorizationTypes = {
  AUTH_TOKEN: string;
};

export type UpdateUserTypes = {
  name: string;
  age: number;
  email: string;
} & AuthorizationTypes;
