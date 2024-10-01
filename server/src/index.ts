import { Hono } from "hono";
import { blogRouter } from "./routes/blog";
import { userRouter } from "./routes/user";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

// Use CORS middleware with options
app.use("/*", cors(corsOptions));

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
