import { Request, Response, NextFunction } from "express";

export const validateSignup = ( req: Request, res: Response, next: NextFunction): void => {
    const { name, email, password } = req.body;

    if ( !name || !email || !password) {
        res.status(400).json({
            success: false,
            message: "All fields are required."
        });
        return;
    }

    if ( password.length < 8 ) {
        res.status(400).json({
            success: false,
            message: "Password must be atleast 8 characters."
        });
        return;
    }

    next();
};


export const validateVerifyOTP = (req: Request, res: Response, next: NextFunction): void => {
    const { email, otp } = req.body;

    if ( !email || !otp ) {
        res.status(400).json({
            success: false,
            message: "Email and OTP are required."
        });
        return;
    }
    
    next();
};