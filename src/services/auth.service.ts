import bcrypt from "bcryptjs";
import { prisma } from "../db/prisma";
import { sendOTPEmail } from "../utils/sendOTP";
import { SignupInput, VerifyOTPInput, AuthResponse } from "../interfaces/auth.interface";

const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const signupService = async (data: SignupInput): Promise<AuthResponse> => {
  const { name, email, password } = data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      success: false,
      message: "Invalid credentials.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      isVerified: false,
    },
  });

  await sendOTPEmail(email, otp);

  return {
    success: true,
    message: "Account created! Please check your email for your verification code.",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
  };
};

export const verifyOTPService = async (data: VerifyOTPInput): Promise<AuthResponse> => {
  const { email, otp } = data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      success: false,
      message: "Invalid credentials.",
    };
  }

  if (user.otp !== otp) {
    return {
      success: false,
      message: "Invalid OTP.",
    };
  }

  if (!user.otpExpiry || user.otpExpiry < new Date()) {
    return {
      success: false,
      message: "OTP has expired. Please sign up again.",
    };
  }

  await prisma.user.update({
    where: { email },
    data: {
      isVerified: true,
      otp: null,
      otpExpiry: null,
    },
  });

  return {
    success: true,
    message: "Email verified successfully! You can now log in.",
  };
};