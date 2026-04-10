import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma";
import { ENV } from "../config/env";


const pool = new Pool ({
    connectionString: ENV.DATABASE_URL,
});

const adapter = new PrismaPg( pool);
export const prisma = new PrismaClient({ adapter });