import { Request, Response } from "express";
import { signupService, verifyOTPService } from "../services/auth.service";
import { SignupInput, VerifyOTPInput } from "../interfaces/auth.interface";

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