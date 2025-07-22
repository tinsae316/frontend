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
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 4px 18px 0 rgba(37,99,235,0.07)',
      padding: 24,
      marginBottom: 24,
      border: '1.5px solid #f1f5f9',
      transition: 'box-shadow 0.18s',
      position: 'relative',
      minWidth: 0
    }}>
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, lineHeight: 1.2 }}>
        <Link href={`/posts/${post.id}`} style={{ color: '#222', textDecoration: 'none', transition: 'color 0.15s' }}>
          {post.title}
        </Link>
      </h2>
      <div style={{ margin: '14px 0 0 0', color: '#475569', fontSize: 16, minHeight: 32 }}>
        {post.content}
      </div>
      <div style={{ height: 1, background: '#f1f5f9', margin: '18px 0 12px 0' }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: '#e0edff',
            color: '#2563eb',
            fontWeight: 700,
            fontSize: 18,
            userSelect: 'none',
            letterSpacing: 0.5
          }}>{avatarLetter}</span>
          <span style={{ fontSize: 15, color: '#64748b' }}>By {authorName}</span>
        </div>
        {isOwner && (
          <div style={{ display: 'flex', gap: 8 }}>
            {onEdit && <button onClick={onEdit} style={{
              border: '1.5px solid #2563eb',
              background: '#fff',
              color: '#2563eb',
              borderRadius: 7,
              padding: '6px 16px',
              fontWeight: 500,
              cursor: 'pointer',
              fontSize: 15,
              transition: 'background 0.15s, color 0.15s, border 0.15s'
            }}>Edit</button>}
            {onDelete && <button onClick={onDelete} style={{
              border: '1.5px solid #dc2626',
              background: '#fff',
              color: '#dc2626',
              borderRadius: 7,
              padding: '6px 16px',
              fontWeight: 500,
              cursor: 'pointer',
              fontSize: 15,
              transition: 'background 0.15s, color 0.15s, border 0.15s'
            }}>Delete</button>}
          </div>
        )}
      </div>
    </div>
  );
} 