import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
export const userRouter = new Hono();
// Signup Route
userRouter.post('/signup', async (c) => {
    console.log("Signup route hit");
    try {
        const body = await c.req.json(); // Use SignupType for the body
        console.log("Request body:", body);
        // Validate request body
        if (!body.email || !body.password) {
            console.log("Email or password missing in request body");
            return c.json({ error: "Email and password are required" }, 400);
        }
        // Initialize Prisma Client with the database URL
        const databaseUrl = c.env.DATABASE_URL;
        console.log("Database URL:", databaseUrl); // For debugging purposes
        if (!databaseUrl) {
            console.error("DATABASE_URL is undefined");
            return c.json({ error: "Database connection error" }, 500);
        }
        const prisma = new PrismaClient({
            datasourceUrl: databaseUrl,
        }).$extends(withAccelerate());
        // Check if a user with the email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: body.email },
        });
        if (existingUser) {
            console.log("User with this email already exists");
            return c.json({ error: "Email already in use" }, 409); // Conflict
        }
        // Create the new user
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password, // Note: Consider hashing the password before storing it
            },
        });
        console.log("User created:", user);
        // Generate JWT token
        const jwtSecret = c.env.JWT_SECRET;
        console.log("JWT Secret:", jwtSecret); // For debugging purposes
        if (!jwtSecret) {
            console.error("JWT_SECRET is undefined");
            return c.json({ error: "JWT secret is not configured" }, 500);
        }
        const token = await sign({ id: user.id }, jwtSecret);
        return c.json({
            message: "User created successfully",
            jwt: token,
        });
    }
    catch (error) {
        console.error("Error during signup:", error);
        // Handle specific error codes
        if (error.code === 'P2002') {
            return c.json({ error: "Unique constraint failed: Email" }, 409);
        }
        // Generic error handling
        return c.json({ error: "An error occurred during signup" }, 500);
    }
});
// Signin Route
userRouter.post('/signin', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
        const body = await c.req.json(); // Use SigninType for the body
        // Find user by email and password
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password,
            },
        });
        if (!user) {
            c.status(403);
            return c.json({ error: "User not found" });
        }
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt });
    }
    catch (e) {
        console.log(e);
        return c.json({ error: "Signin failed" }, 500);
    }
});