import { verify } from "hono/jwt";

export default async function authMiddleware(c: any, next: () => void) {
  // Extract the authorization token from the header
  const token = c.req.header("authorization") || "";

  // If no token, return unauthorized
  if (!token) {
    c.status(401);
    return c.json({
      message: "Authorization token missing",
    });
  }

  // Ensure the token starts with "Bearer " and remove the prefix
  if (!token.startsWith("Bearer ")) {
    c.status(400);
    return c.json({
      message: "Authorization token must be prefixed with 'Bearer '",
    });
  }

  const actualToken = token.replace("Bearer ", "");

  try {
    // Verify the token
    const user = await verify(actualToken, c.env.JWT_SECRET);

    if (user) {
      // Set userId from the decoded JWT token to the request context
      c.set("userId", user.id);
      await next();
    }

  }
}
