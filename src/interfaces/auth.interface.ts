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

export interface SignupInput {
    name: string;
    email: string;
    password: string;
}

export interface VerifyOTPInput {
    email: string;
    otp: string;
}

