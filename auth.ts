import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const fs = require('fs');
                const logPath = 'debug_auth.log';
                const log = (msg: string) => fs.appendFileSync(logPath, new Date().toISOString() + ' ' + msg + '\n');

                log("Authorize called initialized");

                const email = credentials.email as string
                const password = credentials.password as string

                log(`Credentials received - Email: ${email}, Password present: ${!!password}`);

                if (!email || !password) {
                    log("Missing email or password");
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email },
                })
                log(`User found in DB: ${!!user}`);

                if (!user) {
                    log("User not found in DB");
                    return null;
                }

                const passwordsMatch = await bcrypt.compare(password, user.password)
                log(`Password match result: ${passwordsMatch}`);

                if (!passwordsMatch) {
                    log("Password mismatch");
                    return null;
                }

                log("Authentication successful, returning user");
                return user
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
})
