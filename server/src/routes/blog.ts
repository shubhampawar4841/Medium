import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from "@syedahmedullahjaser/zod-inference-medium-blog";

const prisma = new PrismaClient().$extends(withAccelerate());

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Middleware for authentication
blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    //@ts-ignore
    c.set("userId", user.id);
    await next();
  } catch {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }
});

blogRouter.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const { success, error } = createBlogInput.safeParse(body);

    if (!success) {
      c.status(400);
      return c.json({ error: error?.issues || "Invalid input" });
    }

    const blog = await prisma.post.create({
      data: {
        ...body,
        authorId: c.get("userId"),
      },
    });

    return c.json({ id: blog.id });
  } catch (error) {
    c.status(500);
    return c.json({ error: "Server error while creating blog" });
  }
});

blogRouter.put('/', async (c) => {
  try {
    const body = await c.req.json();
    const { success, error } = updateBlogInput.safeParse(body);

    if (!success) {
      c.status(400);
      return c.json({ error: error?.issues || "Invalid input" });
    }

    const blog = await prisma.post.update({
      where: { id: body.id },
      data: { title: body.title, content: body.content },
    });

    return c.json({ id: blog.id });
  } catch (error) {
    c.status(500);
    return c.json({ error: "Server error while updating blog" });
  }
});

blogRouter.get('/bulk', async (c) => {
  try {
    const blogs = await prisma.post.findMany({
      where: { authorId: c.get("userId") },
    });
    return c.json(blogs);
  } catch (error) {
    c.status(500);
    return c.json({ error: "Server error while fetching blogs" });
  }
});
