"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserPosts } from "@/lib/api";
import { Post } from "@/types";
import PostCard from "@/components/PostCard";
import { useAuth } from "@/hooks/useAuth";

export default function UserPostsPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    getUserPosts()
      .then(setPosts)
      .catch(() => setError("Failed to load your posts"))
      .finally(() => setLoading(false));
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h1>My Posts</h1>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {posts.length === 0 && !loading && <div>You have no posts yet.</div>}
      {posts.map(post => (
        <PostCard key={post.id} post={post} currentUser={user} />
      ))}
    </div>
  );
} 