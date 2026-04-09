export interface SignupInput {
    name: string;
    email: string;
    password: string;
}

export interface VerifyOTPInput {
    email: string;
    otp: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data?: {
        id: number;
        name: string;
        email: string;
        createdAt: Date;
    };
}