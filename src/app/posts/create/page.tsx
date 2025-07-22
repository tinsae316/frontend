"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

export default function CreatePostPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (authLoading) return <div>Loading...</div>;
  if (!isAuthenticated) {
    router.replace("/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createPost({ title, content });
      router.push("/posts");
    } catch (err: any) {
      setError(err.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto" }}>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 12 }}
            autoFocus
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            style={{ width: "100%", minHeight: 100, marginBottom: 12 }}
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
} 