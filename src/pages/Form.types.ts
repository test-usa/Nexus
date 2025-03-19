export interface ISignUp {
  userName: string;
  email: string;
  password: string;
  message?: string
}

export interface ISingIn {
  email: string;
  password: string;
}

export interface IForgetPass {
  newPass: string;
  currentPass: string;
}
