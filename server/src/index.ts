import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { bookRouter } from './routes/blog';

export const app = new Hono();

// CORS middleware
app.use('*', (c, next) => {
  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return next();
});

// Handle CORS preflight
app.options('*', (c) => {
  return c.json(null, 204);
});

// Root route
app.get('/', (c) => {
  console.log("Ready to handle request");
  console.log("DATABASE_URL:", c.env.DATABASE_URL);
  console.log("JWT_SECRET:", c.env.JWT_SECRET);
  return c.text('Welcome to the API');
});

// User routes
app.route('/api/v1/user', userRouter);

// Book routes (consider renaming if it's for posts)
app.route('/api/v1/book', bookRouter);

// Global error handler
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: 'An unexpected error occurred' }, 500);
});

export default app;
