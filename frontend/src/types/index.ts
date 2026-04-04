/**
 * TypeScript interfaces matching our Backend (FastAPI) schemas.
 * Using types ensures we don't make mistakes when accessing properties.
 */

export interface Comment {
  id: number;
  text: string;
  author: string;
  post_id: number;
  created_at: string;
  flagged: boolean;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  created_at: string;
  comments: Comment[];
}

export interface PostCreate {
  title: string;
  body: string;
}

export interface CommentCreate {
  text: string;
  author: string;
}
