export type ForgotPasswordProps = { token: string; password: string } | { email: string };

export interface LoginProps {
  usernameOrEmail: string;
  password: string;
}

export interface SignupProps {
  username: string;
  email: string;
  password: string;
}
