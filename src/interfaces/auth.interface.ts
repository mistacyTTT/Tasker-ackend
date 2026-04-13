export interface BaseResponse {
  success: boolean;
  message: string;
}

export interface AuthResponse extends BaseResponse {
  data?: {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
  };
}

export interface LoginResponse extends BaseResponse {
  token?: string;
}

export interface SignupInput {
  name: string;
  email: string;
  password: string;
}

export interface VerifyOTPInput {
  email: string;
  otp: string;
}

export interface LoginInput {
  email: string;
  password: string;
}