import dotenv from "dotenv";

dotenv.config();

export const ENV = {
    DATABASE_URL: process.env.DATABASE_URL as string,
    RESEND_API_KEY: process.env.RESEND_API_KEY as string,
    PORT: process.env.PORT || 5000,
};

console.log("RESEND_API_KEY:", ENV.RESEND_API_KEY);