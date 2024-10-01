import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { CreatePostType, UpdatePostType } from "@100xdevs/medium-common"; // Assuming this is your deployed zod validation

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate());

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

// Middleware to check for JWT authorization
blogRouter.use(async (c, next) => {
    const jwt = c.req.header('Authorization');
    console.log('Authorization Header:', jwt);

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
        console.error('JWT verification failed:', error);
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
});

// POST request to create a new post
blogRouter.post('/', async (c) => {
    const userId = c.get('userId');
    const body = await c.req.json();

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
        console.error('Error creating post:', error);
        return c.status(500).json({ error: "Failed to create post" });
    }
});

// PUT request to update an existing post
blogRouter.put('/', async (c) => {
    const userId = c.get('userId');
    const body = await c.req.json();

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
        console.error('Error updating post:', error);
        return c.status(500).json({ error: "Failed to update post" });
    }
});

// GET request to retrieve a post by ID
blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');

    try {
        const post = await prisma.post.findUnique({
            where: { id },
        });
        if (!post) {
            return c.status(404).json({ error: "Post not found" });
        }
        return c.json(post);
    } catch (error) {
        console.error('Error retrieving post:', error);
        return c.status(500).json({ error: "Failed to retrieve post" });
    }
});

// GET request to retrieve all posts
blogRouter.get('/bulk', async (c) => {
    try {
        const posts = await prisma.post.findMany({});
        return c.json(posts);
    } catch (error) {
        console.error('Error retrieving posts:', error);
        return c.status(500).json({ error: "Failed to retrieve posts" });
    }
});
