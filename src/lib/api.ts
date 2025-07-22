import { AuthResponse, Post, User } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

function setToken(token: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('token', token);
}

function removeToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
}

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(`${API_URL}${url}`, { ...options, headers });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'API Error');
  }
  return res.json();
}

export async function signup(data: { name: string; email: string; password: string }): Promise<{ message: string; userId: string }> {
  return request('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function login(data: { email: string; password: string }): Promise<AuthResponse> {
  const res = await request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  setToken(res.access_token);
  return res;
}

export function logout() {
  removeToken();
}

export async function getUserPosts(): Promise<Post[]> {
  return request('/posts');
}

export async function getAllPosts(): Promise<Post[]> {
  return request('/posts/all');
}

export async function getPostById(id: string): Promise<Post> {
  return request(`/posts/${id}`);
}

export async function createPost(data: { title: string; content: string }): Promise<Post> {
  return request('/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updatePost(id: string, data: { title: string; content: string }): Promise<Post> {
  return request(`/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deletePost(id: string): Promise<{ message: string }> {
  return request(`/posts/${id}`, {
    method: 'DELETE',
  });
}

export async function getMe(): Promise<User> {
  return request('/auth/me');
} 