import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { bookRouter } from './routes/blog';

export const app = new Hono();

// CORS middleware
app.use('*', (c, next) => {
  c.res.headers.set('Access-Control-Allow-Origin', '*');  // Replace with specific origin in production
  c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return next();
});

// Preflight request handler (applied globally)
app.options('*', (c) => {
  c.res.headers.set('Access-Control-Allow-Origin', '*');  // Replace with specific origin in production
  c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return c.text('');  // Send an empty response
});

// Root route
app.get('/', (c) => {
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
