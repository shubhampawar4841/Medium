import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { bookRouter } from './routes/blog';


export const app = new Hono<{
  Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
  }
}>();

// Root route
app.get('/', (c) => {
  // Add logs to track variables
  console.log("Ready to handle request");
  console.log("DATABASE_URL:", c.env.DATABASE_URL);
  console.log("JWT_SECRET:", c.env.JWT_SECRET);

  // Return response after logging
  return c.text('Welcome to the API');
}); 

// User routes
app.route('/api/v1/user', userRouter);

// Book routes
app.route('/api/v1/book', bookRouter);

export default app;
