import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';

// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// Enable CORS for all routes
app.use('/*', cors());

// Register routes
app.route('api/v1/user', userRouter);
app.route('api/v1/blog', blogRouter);

// Middleware example
app.use('/message/*', async (c, next) => {
  await next();
});

// Root route
app.get('/', (c) => {
  return c.text('Server is running');
});

export default app;
