import { Router } from "express";
import { validateSignup, validateVerifyOTP } from "../middleware/validate";
import { signup, verifyOTP } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", validateSignup, signup);
router.post("/verify-otp", validateVerifyOTP, verifyOTP);

export default router; 