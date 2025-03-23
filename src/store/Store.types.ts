// ---------- USER STORE TYPES ------------//
export interface IUserStore {
  photo: string | null;
  token: string | null;
  user: string | object | null;
  loading: boolean;
  signup_user: (signupdata: ISginUpTypes, navigate: (path: string) => void) => Promise<void>;
  signIn_user: (signdata: ISignInTypes) => Promise<void>;
  auth: (data: IAuth) => Promise<void>;
  logout_user: () => void;
}

// ---------- SIGNUP STROE TYPES -----------//
export interface ISginUpTypes {
  name: string;
  photo?: string;
  number?: number;
  email: string;
  password?: string;
  
}

// ---------- SIGNIN STORE TYPES -----------//

export interface ISignInTypes {
  name?: string;
  email: string;
  password: string;
}

// ---------- AUTH STORE TYPES ------------//

export interface IAuth extends ISginUpTypes {
  token: string;
  photo: string; // cause is signin ,signup both control
}
