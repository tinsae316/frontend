"use client";
import ProtectedWrapper from "@/components/shared/ProtectedWrapper";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/api";

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    <ProtectedWrapper>
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
        <div style={{ background: "#fff", padding: 38, borderRadius: 18, boxShadow: "0 6px 32px 0 rgba(37,99,235,0.10)", width: 440, maxWidth: "96vw", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Create a New Post</h1>
          <div style={{ color: "#64748b", fontSize: 16, marginBottom: 22, textAlign: "center" }}>
            Share your thoughts with the community!
          </div>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", marginBottom: 7, fontWeight: 500, color: "#374151" }}>Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                style={{ width: "100%", padding: "11px 13px", borderRadius: 8, border: "1.5px solid #d1d5db", fontSize: 16, outline: "none", background: "#f8fafc", transition: "border 0.2s" }}
                onFocus={e => e.currentTarget.style.border = "1.5px solid #2563eb"}
                onBlur={e => e.currentTarget.style.border = "1.5px solid #d1d5db"}
                autoFocus
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={{ display: "block", marginBottom: 7, fontWeight: 500, color: "#374151" }}>Content</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                required
                style={{ width: "100%", minHeight: 110, padding: "11px 13px", borderRadius: 8, border: "1.5px solid #d1d5db", fontSize: 16, outline: "none", background: "#f8fafc", transition: "border 0.2s", resize: "vertical" }}
                onFocus={e => e.currentTarget.style.border = "1.5px solid #2563eb"}
                onBlur={e => e.currentTarget.style.border = "1.5px solid #d1d5db"}
              />
            </div>
            {error && <div style={{ color: "#dc2626", marginBottom: 10, fontSize: 15 }}>{error}</div>}
            <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px 0", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 17, marginTop: 8, cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 2px 8px rgba(37,99,235,0.08)", letterSpacing: 0.2 }}>
              {loading ? "Creating..." : "Create Post"}
            </button>
          </form>
        </div>
      </div>
    </ProtectedWrapper>
  );
} 