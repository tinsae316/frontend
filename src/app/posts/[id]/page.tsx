"use client";
import ProtectedWrapper from "@/components/shared/ProtectedWrapper";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getPostById, updatePost, deletePost } from "@/services/api";
import { Post } from "@/types";
import { useSession } from "next-auth/react";

export default function SinglePostPage() {
  const { data: session } = useSession();
  const user = session?.user;
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
    getPostById(postId)
      .then((p: Post) => {
        setPost(p);
        setTitle(p.title);
        setContent(p.content);
      })
      .catch(() => setError("Post not found or access denied"))
      .finally(() => setLoading(false));
  }, [postId]);

  const isOwner = user && post && post.authorId === (user as any).id;

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    setTitle(post?.title || "");
    setContent(post?.content || "");
  };
  const handleSave = async () => {
    setActionLoading(true);
    try {
      await updatePost(postId, { title, content });
      // Fetch the post again to get author info
      const updated = await getPostById(postId);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!post) return null;

  // Avatar logic for author
  const authorName = post.author?.name || post.author?.email || 'Unknown';
  const avatarLetter = (post.author?.name?.charAt(0) || post.author?.email?.charAt(0) || 'U').toUpperCase();

  return (
    <ProtectedWrapper>
      <div style={{
        maxWidth: 650,
        margin: '2.5rem auto',
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 6px 32px 0 rgba(37,99,235,0.10)',
        padding: 36,
        position: 'relative',
        animation: 'fadeIn 0.7s',
        minHeight: 320
      }}>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: none; }
          }
        `}</style>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18 }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#e0edff',
            color: '#2563eb',
            fontWeight: 700,
            fontSize: 26,
            userSelect: 'none',
            letterSpacing: 0.5
          }}>{avatarLetter}</span>
          <div>
            <div style={{ fontSize: 17, color: '#2563eb', fontWeight: 600 }}>By {authorName}</div>
            {/* Optionally add date here if available: <div style={{ fontSize: 13, color: '#94a3b8' }}>{post.createdAt}</div> */}
          </div>
        </div>
        {editMode ? (
          <>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{
                width: '100%',
                fontSize: 28,
                fontWeight: 700,
                marginBottom: 18,
                padding: '10px 12px',
                borderRadius: 8,
                border: '1.5px solid #e0e7ef',
                outline: 'none',
                background: '#f8fafc',
                color: '#222'
              }}
              autoFocus
            />
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              style={{
                width: '100%',
                minHeight: 120,
                fontSize: 18,
                lineHeight: 1.6,
                padding: '16px 14px',
                borderRadius: 8,
                border: '1.5px solid #e0e7ef',
                background: '#f8fafc',
                color: '#334155',
                marginBottom: 24,
                resize: 'vertical'
              }}
            />
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 10 }}>
              <button onClick={handleSave} disabled={actionLoading} style={{
                border: '1.5px solid #2563eb',
                background: '#2563eb',
                color: '#fff',
                borderRadius: 8,
                padding: '8px 22px',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s, border 0.15s',
                opacity: actionLoading ? 0.7 : 1
              }}>{actionLoading ? 'Saving...' : 'Save'}</button>
              <button onClick={handleCancel} disabled={actionLoading} style={{
                border: '1.5px solid #64748b',
                background: '#fff',
                color: '#64748b',
                borderRadius: 8,
                padding: '8px 22px',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s, border 0.15s',
                opacity: actionLoading ? 0.7 : 1
              }}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 18px 0', color: '#222', lineHeight: 1.15 }}>{post.title}</h1>
            <div style={{ height: 2, background: '#f1f5f9', margin: '18px 0 24px 0', borderRadius: 2 }} />
            <div style={{
              fontSize: 20,
              color: '#334155',
              lineHeight: 1.7,
              background: '#f8fafc',
              borderRadius: 10,
              padding: '22px 20px',
              marginBottom: 24,
              wordBreak: 'break-word',
              boxShadow: '0 1px 4px 0 rgba(37,99,235,0.04)'
            }}>{post.content}</div>
            {isOwner && (
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 10 }}>
                <button onClick={handleEdit} style={{
                  border: '1.5px solid #2563eb',
                  background: '#2563eb',
                  color: '#fff',
                  borderRadius: 8,
                  padding: '8px 22px',
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: 'pointer',
                  transition: 'background 0.15s, color 0.15s, border 0.15s'
                }}>Edit</button>
                <button onClick={handleDelete} style={{
                  border: '1.5px solid #dc2626',
                  background: '#fff',
                  color: '#dc2626',
                  borderRadius: 8,
                  padding: '8px 22px',
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: 'pointer',
                  transition: 'background 0.15s, color 0.15s, border 0.15s'
                }} disabled={actionLoading}>
                  {actionLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </ProtectedWrapper>
  );
} 