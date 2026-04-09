import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendOTPEmail = async ( email: string, otp: string): Promise<void> => {
    await resend.emails.send({
        from: "Tasker <onboarding@resend.dev>",
        to: email,
        subject: "Verify your Tasker account.",
        html:`
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
        <h2>Verify your email</h2>
        <p>Thanks for signing up to Tasker! Use the OTP below to verify your account.</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 24px 0;">
          ${otp}
        </div>
        <p>This code expires in <strong>10 minutes</strong>.</p>
        <p>If you didn't sign up for Tasker, ignore this email.</p>
      </div>`
    });
}