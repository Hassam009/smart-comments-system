import axios from 'axios';
import type { Post, PostCreate, Comment, CommentCreate } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postsService = {
  async getAll(): Promise<Post[]> {
    const response = await api.get('/posts');
    return response.data;
  },

  async getById(id: number): Promise<Post> {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  async create(data: PostCreate): Promise<Post> {
    const response = await api.post('/posts', data);
    return response.data;
  },

  async addComment(postId: number, data: CommentCreate): Promise<Comment> {
    const response = await api.post(`/posts/${postId}/comments`, data);
    return response.data;
  }
};

export const moderatorService = {
  async getFlaggedComments(): Promise<Comment[]> {
    const response = await api.get('/comments/flagged');
    return response.data;
  },

  async approveComment(id: number): Promise<void> {
    await api.put(`/comments/${id}/approve`);
  },

  async deleteComment(id: number): Promise<void> {
    await api.delete(`/comments/${id}`);
  }
};

export default api;
