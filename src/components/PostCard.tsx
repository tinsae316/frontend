import { Post, User } from '@/types';
import Link from 'next/link';

interface PostCardProps {
  post: Post;
  currentUser?: User | null;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PostCard({ post, currentUser, onEdit, onDelete }: PostCardProps) {
  const isOwner = currentUser && post.authorId === currentUser.id;
  const authorName = post.author?.name || post.author?.email || 'Unknown';
  const avatarLetter = (post.author?.name?.charAt(0) || post.author?.email?.charAt(0) || 'U').toUpperCase();
  return (
    <div style={{
      background: 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)',
      borderRadius: 22,
      boxShadow: '0 8px 32px 0 rgba(37,99,235,0.13)',
      padding: 0,
      marginBottom: 32,
      border: 'none',
      transition: 'box-shadow 0.18s, transform 0.18s',
      position: 'relative',
      minWidth: 0,
      overflow: 'hidden',
      outline: '2.5px solid #e0e7ff',
      outlineOffset: '-2.5px',
      cursor: 'pointer',
      filter: 'drop-shadow(0 2px 8px rgba(37,99,235,0.07))',
    }}
    onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-2px) scale(1.012)')}
    onMouseOut={e => (e.currentTarget.style.transform = 'none')}
    >
      {/* Decorative top bar */}
      <div style={{
        height: 7,
        width: '100%',
        background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
      }} />
      <div style={{ padding: '28px 28px 18px 28px' }}>
        <h2 style={{ margin: 0, fontSize: 25, fontWeight: 800, lineHeight: 1.18, letterSpacing: -0.5, color: '#1e293b', textShadow: '0 2px 8px #e0e7ff' }}>
          <Link href={`/posts/${post.id}`} style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.15s' }}>
            {post.title}
          </Link>
        </h2>
        <div style={{ margin: '18px 0 0 0', color: '#334155', fontSize: 17, minHeight: 36, fontWeight: 500, letterSpacing: 0.1, lineHeight: 1.5 }}>
          {post.content.length > 200
            ? <>
                {post.content.slice(0, 200)}<span style={{ color: '#2563eb', fontWeight: 700 }}>...</span>
              </>
            : post.content}
        </div>
        <div style={{ height: 1.5, background: 'linear-gradient(90deg, #e0e7ff 0%, #2563eb 100%)', margin: '22px 0 14px 0', borderRadius: 2 }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)',
              color: '#fff',
              fontWeight: 800,
              fontSize: 22,
              userSelect: 'none',
              letterSpacing: 1.5,
              boxShadow: '0 2px 8px 0 rgba(37,99,235,0.10)'
            }}>{avatarLetter}</span>
            <span style={{ fontSize: 16, color: '#64748b', fontWeight: 600, letterSpacing: 0.2 }}>By {authorName}</span>
          </div>
          {isOwner && (
            <div style={{ display: 'flex', gap: 10 }}>
              {onEdit && <button onClick={onEdit} style={{
                border: 'none',
                background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
                color: '#fff',
                borderRadius: 8,
                padding: '7px 20px',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: 16,
                boxShadow: '0 2px 8px 0 rgba(37,99,235,0.10)',
                transition: 'background 0.15s, color 0.15s, border 0.15s, box-shadow 0.15s',
                outline: 'none',
              }}>Edit</button>}
              {onDelete && <button onClick={onDelete} style={{
                border: 'none',
                background: 'linear-gradient(90deg, #dc2626 0%, #f87171 100%)',
                color: '#fff',
                borderRadius: 8,
                padding: '7px 20px',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: 16,
                boxShadow: '0 2px 8px 0 rgba(220,38,38,0.10)',
                transition: 'background 0.15s, color 0.15s, border 0.15s, box-shadow 0.15s',
                outline: 'none',
              }}>Delete</button>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 