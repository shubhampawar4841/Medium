import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signinInput, signupInput } from "@syedahmedullahjaser/zod-inference-medium-blog";

const prisma = new PrismaClient().$extends(withAccelerate());

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post('/signup', async (c) => {
  try {
    const body = await c.req.json();
    const { success, error } = signupInput.safeParse(body);

    if (!success) {
      c.status(400);
      return c.json({ error: error?.issues || "Invalid input" });
    }

    const user = await prisma.user.create({
      data: { ...body },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token: jwt });
  } catch (error) {
    c.status(500);
    return c.json({ error: "Server error while signing up" });
  }
});

userRouter.post('/signin', async (c) => {
  try {
    const body = await c.req.json();
    const { success, error } = signinInput.safeParse(body);

    if (!success) {
      c.status(400);
      return c.json({ error: error?.issues || "Invalid input" });
    }

    const user = await prisma.user.findFirst({
      where: { email: body.email, password: body.password },
    });

    if (!user) {
      c.status(401);
      return c.json({ error: "Invalid credentials" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token: jwt });
  } catch (error) {
    c.status(500);
    return c.json({ error: "Server error while signing in" });
  }
});
