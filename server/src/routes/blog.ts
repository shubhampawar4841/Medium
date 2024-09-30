import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { CreatePostType, UpdatePostType } from "@100xdevs/medium-common"; // Assuming this is your deployed zod validation

export const bookRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

// Middleware to check for JWT authorization
bookRouter.use(async (c, next) => {
    const jwt = c.req.header('Authorization');
    console.log('Authorization Header:', jwt); // Debugging line

    if (!jwt) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }

    const token = jwt.split(' ')[1];

    try {
        const payload = await verify(token, c.env.JWT_SECRET);
        if (!payload) {
            c.status(401);
            return c.json({ error: "unauthorized" });
        }
        c.set('userId', payload.id);
        await next();
    } catch (error) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
});

// POST request to create a new post
bookRouter.post('/', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    // Validate the input using CreatePostType from the common folder
    const { success, error } = CreatePostType.safeParse(body);
    if (!success) {
        return c.status(400).json({ error: error?.message || "Invalid input" });
    }

    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId,
            },
        });
        return c.json({ id: post.id });
    } catch (error) {
        return c.status(500).json({ error: "Failed to create post" });
    }
});

// PUT request to update an existing post
bookRouter.put('/', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    // Validate the input using UpdatePostType from the common folder
    const { success, error } = UpdatePostType.safeParse(body);
    if (!success) {
        return c.status(400).json({ error: error?.message || "Invalid input" });
    }

    try {
        await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId,
            },
            data: {
                title: body.title,
                content: body.content,
            },
        });
        return c.text('updated post');
    } catch (error) {
        return c.status(500).json({ error: "Failed to update post" });
    }
});

// GET request to retrieve a post by ID
bookRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.findUnique({
            where: {
                id,
            },
        });
        if (!post) {
            return c.status(404).json({ error: "Post not found" });
        }
        return c.json(post);
    } catch (error) {
        return c.status(500).json({ error: "Failed to retrieve post" });
    }
});

// GET request to retrieve all posts
bookRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.post.findMany({});
        return c.json(posts);
    } catch (error) {
        return c.status(500).json({ error: "Failed to retrieve posts" });
    }
});
