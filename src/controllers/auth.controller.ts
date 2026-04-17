import { Request, Response } from "express";
import { signupService, verifyOTPService, loginService } from "../services/auth.service";
import { SignupInput, VerifyOTPInput, LoginInput } from "../interfaces/auth.interface";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const input: SignupInput = req.body;
    const result = await signupService(input);
    const status = result.success ? 201 : 400;
    res.status(status).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const input: VerifyOTPInput = req.body;
    const result = await verifyOTPService(input);
    const status = result.success ? 200 : 400;
    res.status(status).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const input: LoginInput = req.body;
    const result = await loginService(input);
    const status = result.success ? 200 : 400;

    if (result.success && result.token) {
      res.cookie("token", result.token, {
        httpOnly: true,   // ← readable by Next.js middleware
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: false,
        sameSite: "lax",
        path: "/",
      });
    }

    res.status(status).json(result); // token is already in result, frontend reads it here
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,   // ← must match exactly what was set
    sameSite: "lax",
    secure: false,
    path: "/",
  });
  return res.status(200).json({ message: "Logged out successfully" });
    res.status(status).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};