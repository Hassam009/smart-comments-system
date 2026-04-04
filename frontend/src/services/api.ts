import axios from 'axios';
import type { Post, PostCreate, Comment, CommentCreate } from '../types';

/**
 * Configure Axios to point to our FastAPI local server (port 8000).
 */
const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postsService = {
  /**
   * Retrieves all blog posts from the backend.
   */
  async getAll(): Promise<Post[]> {
    const response = await api.get('/posts');
    return response.data;
  },

  /**
   * Retrieves a single post by ID along with its comments.
   */
  async getById(id: number): Promise<Post> {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  /**
   * (Bonus) Creates a new blog post.
   */
  async create(data: PostCreate): Promise<Post> {
    const response = await api.post('/posts', data);
    return response.data;
  },

  /**
   * Adds a new comment to a specific post.
   * Note: The backend will automatically classify this comment.
   */
  async addComment(postId: number, data: CommentCreate): Promise<Comment> {
    const response = await api.post(`/posts/${postId}/comments`, data);
    return response.data;
  }
};

export const moderatorService = {
  /**
   * Retrieves all comments that have been flagged as "needs_review".
   */
  async getFlaggedComments(): Promise<Comment[]> {
    const response = await api.get('/comments/flagged');
    return response.data;
  },

  /**
   * Approves a comment by removing its flagged status.
   */
  async approveComment(id: number): Promise<void> {
    await api.put(`/comments/${id}/approve`);
  },

  /**
   * Permanently removes a comment from the database.
   */
  async deleteComment(id: number): Promise<void> {
    await api.delete(`/comments/${id}`);
  }
};

export default api;
