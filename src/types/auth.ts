export type TSignUpInput = {
  name: string;
  email: string;
  password: string;
};

export type TSignInInput = {
  name: string;
  password: string;
};

export type TSignInOutput = {
  token: string;
};

export type TSignUpOutput = {
  token: string;
};
