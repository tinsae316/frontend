import axios from 'axios';
import { AuthResponse, Post, User } from '@/types';
import { getSession } from 'next-auth/react';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
});

api.interceptors.request.use(
  async (config) => {
    if (typeof window === 'undefined') return config;
    // Get the NextAuth accessToken from the session
    const session = await getSession();
    const token = (session as any)?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'API Error';
    return Promise.reject(new Error(message));
  },
);

export async function signup(
  data: { name: string; email: string; password: string },
): Promise<{ message: string; userId: string }> {
  return api.post('/auth/signup', data);
}

export async function login(data: { email: string; password: string }): Promise<AuthResponse> {
  // No longer needed, handled by NextAuth
  throw new Error('Use NextAuth signIn instead');
}

export function logout() {
  // No longer needed, handled by NextAuth
}

export async function getUserPosts(): Promise<Post[]> {
  return api.get('/posts');
}

export async function getAllPosts(): Promise<Post[]> {
  return api.get('/posts/all');
}

export async function getPostById(id: string): Promise<Post> {
  return api.get(`/posts/${id}`);
}

export async function createPost(data: { title: string; content: string }): Promise<Post> {
  return api.post('/posts', data);
}

export async function updatePost(id: string, data: { title: string; content: string }): Promise<Post> {
  return api.patch(`/posts/${id}`, data);
}

export async function deletePost(id: string): Promise<{ message: string }> {
  return api.delete(`/posts/${id}`);
}

export async function getMe(): Promise<User> {
  return api.get('/auth/me');
} 