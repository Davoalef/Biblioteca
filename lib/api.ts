import { Post, CreatePostInput } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL no está definida en .env.local");
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function getPosts(): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000)); ///////////// delay 
  const res = await fetch(`${BASE_URL}/posts`, {
    next: { revalidate: 60 },
  });
  return handleResponse<Post[]>(res);
}

export async function getPost(id: number | string): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    next: { revalidate: 60 },
  });
  return handleResponse<Post>(res);
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return handleResponse<Post>(res);
}