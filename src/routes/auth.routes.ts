import { Router } from "express";
import { signup, verifyOTP, login } from "../controllers/auth.controller";
import { validateSignup, validateVerifyOTP, validateLogin } from "../middleware/auth.validate";

const router = Router();

router.post("/signup", validateSignup, signup);
router.post("/verify-otp", validateVerifyOTP, verifyOTP);
router.post("/login", validateLogin, login);

export default router;