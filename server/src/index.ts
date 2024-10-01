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
app.use("/*", cors());

// Set up a basic GET route for the root path
app.get("/", (c) => {
  return c.text("Welcome to the API!"); // or any other message
});

// Define routes for user and blog APIs
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
