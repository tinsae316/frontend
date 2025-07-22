// User type
export interface User {
  id: string;
  name: string;
  email: string;
}

// Post type
export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author?: User;
  createdAt: string;
  updatedAt?: string;
}

// Auth response type
export interface AuthResponse {
  access_token: string;
} 