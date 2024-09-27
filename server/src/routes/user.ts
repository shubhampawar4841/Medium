import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

// Signup Route
userRouter.post('/signup', async (c) => {
  console.log("Signup route hit");

  // Log request body for debugging
  try {
    const body = await c.req.json();
    console.log("Request body:", body);

    // Check if email and password are present
    if (!body.email || !body.password) {
      console.log("Email or password missing in request body");
      return c.json({ error: "Email and password are required" }, 400);
    }

    // Initialize Prisma Client with the database URL
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    console.log("User created:", user);

    // Generate a JWT token
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    
    // Return the token in the response
    return c.json({
      message: "User created successfully",
      jwt: token,
    });

  } catch (error) {
    console.error("Error during signup:", error);

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return c.json({ error: "Invalid JSON input" }, 400);
    }

    // Handle database connection or creation errors
    return c.json({ error: "Failed to create user" }, 500);
    // Add logs to track variables


  }
});

  
// Signin Route
userRouter.post('/signin', async (c) => {
    console.log("Signin route hit");
    
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
          password: body.password,
        },
      });

      if (!user) {
        console.log("User not found");
        c.status(403);
        return c.json({ error: "User not found" });
      }

      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      
      console.log("User signed in:", user);
      
      return c.json({
        message: "Signin successful",
        jwt,
      });
    } catch (error) {
      console.error("Error during signin:", error);
      return c.json({ error: "Signin failed" }, 500);
    }
});

export default userRouter;
