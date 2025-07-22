"use client";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/lib/api";
import { Post } from "@/types";
import PostCard from "@/components/PostCard";

export default function AllPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllPosts()
      .then(setPosts)
      .catch(() => setError("Failed to load posts"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h1>All Posts</h1>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {posts.length === 0 && !loading && <div>No posts found.</div>}
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
} 