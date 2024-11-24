import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";

// Create the main Hono app
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

// Apply CORS middleware to all routes
app.use("*", cors({ 
  origin: "*", // Allow all origins; modify as per your security requirements
  allowMethods: ["GET", "POST", "PUT", "DELETE"], // Restrict allowed methods
  allowHeaders: ["Authorization", "Content-Type"], // Allow custom headers
}));


app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
