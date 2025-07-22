"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getPostById, updatePost, deletePost } from "@/lib/api";
import { Post } from "@/types";
import { useAuth } from "@/hooks/useAuth";

export default function SinglePostPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const postId = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    getPostById(postId)
      .then(p => {
        setPost(p);
        setTitle(p.title);
        setContent(p.content);
      })
      .catch(() => setError("Post not found or access denied"))
      .finally(() => setLoading(false));
  }, [isAuthenticated, authLoading, postId, router]);

  const isOwner = user && post && post.authorId === user.id;

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    setTitle(post?.title || "");
    setContent(post?.content || "");
  };
  const handleSave = async () => {
    setActionLoading(true);
    try {
      const updated = await updatePost(postId, { title, content });
      setPost(updated);
      setEditMode(false);
    } catch (err: any) {
      setError(err.message || "Failed to update post");
    } finally {
      setActionLoading(false);
    }
  };
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setActionLoading(true);
    try {
      await deletePost(postId);
      router.push("/posts");
    } catch (err: any) {
      setError(err.message || "Failed to delete post");
    } finally {
      setActionLoading(false);
    }
  };

  if (authLoading || loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!post) return null;

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h1>Post Details</h1>
      {editMode ? (
        <>
          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{ width: "100%", marginBottom: 12 }}
              autoFocus
            />
          </div>
          <div>
            <label>Content</label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              style={{ width: "100%", minHeight: 100, marginBottom: 12 }}
            />
          </div>
          <button onClick={handleSave} disabled={actionLoading} style={{ marginRight: 8 }}>
            {actionLoading ? "Saving..." : "Save"}
          </button>
          <button onClick={handleCancel} disabled={actionLoading}>Cancel</button>
        </>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div style={{ fontSize: 14, color: '#666' }}>
            By {post.author?.name || post.author?.email || 'Unknown'}
          </div>
          {isOwner && (
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete} style={{ color: 'red' }} disabled={actionLoading}>
                {actionLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
} 