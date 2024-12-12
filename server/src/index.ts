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

// Apply CORS middleware with options
app.use(
  "*",
  cors({
    origin: "*", // Allow all origins. Replace "*" with specific origins for better security.
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowHeaders: ["Content-Type", "Authorization"], // Allowed headers
    maxAge: 600, // Preflight request cache duration in seconds
  })
);

// User routes
app.route("/api/v1/user", userRouter);

// Blog routes
app.route("/api/v1/blog", blogRouter);

app.get("/", (c) => c.text("Server is running!"));

export default app;
