export type UserRole =
  | "alumno"
  | "jurado"
  | "asesor"
  | "coordinador"
  | "revisor"
  | "administrador";

export interface User {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  roles: UserRole[];
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  idToken: string | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  /** Indicates if Cognito requires the user to set a new password */
  isNewPasswordRequired: boolean;
}

export interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  confirmSignUp: (email: string, code: string) => Promise<void>;
  clearError: () => void;
  loginWithProvider: (provider: "Google") => void;
  /** Completes the Cognito new password challenge */
  completeNewPassword: (newPassword: string) => Promise<void>;
}
