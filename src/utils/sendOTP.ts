import nodemailer from "nodemailer";
import { ENV } from "../config/env";

const transporter = nodemailer.createTransport({
  host: ENV.SMTP_HOST,
  port: ENV.SMTP_PORT,
  secure: false,
  auth: {
    user: ENV.SMTP_USER,
    pass: ENV.SMTP_PASS,
  },
});

export const sendOTPEmail = async (email: string, otp: string): Promise<void> => {
  await transporter.sendMail({
    from: `"Tasker" <${ENV.SMTP_USER}>`,
    to: email,
    subject: "Verify your Tasker account",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
        <h2>Verify your email</h2>
        <p>Thanks for signing up to Tasker! Use the OTP below to verify your account.</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 24px 0;">
          ${otp}
        </div>
        <p>This code expires in <strong>10 minutes</strong>.</p>
        <p>If you didn't sign up for Tasker, ignore this email.</p>
      </div>
    `,
  });
};