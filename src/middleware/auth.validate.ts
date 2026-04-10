import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const verifyOTPSchema = z.object({
  email: z.string().email("Invalid email address."),
  otp: z.string().length(6, "OTP must be 6 digits."),
});

export const validateSignup = (req: Request, res: Response, next: NextFunction): void => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      success: false,
      message: result.error.issues[0].message,
    });
    return;
  }

  next();
};

export const validateVerifyOTP = (req: Request, res: Response, next: NextFunction): void => {
  const result = verifyOTPSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      success: false,
      message: result.error.issues[0].message,
    });
    return;
  }

  next();
};