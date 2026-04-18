export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CreatePostInput {
  title: string;
  body: string;
  userId: number;
}

export type SortField = "id" | "title";
export type SortOrder = "asc" | "desc";
export type PageSize = 10 | 20 | 50;