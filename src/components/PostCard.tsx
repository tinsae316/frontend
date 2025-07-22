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
  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, marginBottom: 16 }}>
      <h2 style={{ margin: 0 }}>
        <Link href={`/posts/${post.id}`}>{post.title}</Link>
      </h2>
      <p style={{ margin: '8px 0' }}>{post.content}</p>
      <div style={{ fontSize: 14, color: '#666' }}>
        By {post.author?.name || post.author?.email || 'Unknown'}
      </div>
      {isOwner && (
        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          {onEdit && <button onClick={onEdit}>Edit</button>}
          {onDelete && <button onClick={onDelete} style={{ color: 'red' }}>Delete</button>}
        </div>
      )}
    </div>
  );
} 