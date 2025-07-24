"use client";
import ProtectedWrapper from "@/components/shared/ProtectedWrapper";
import { useEffect, useState } from "react";
import { getUserPosts } from "@/services/api";
import { Post } from "@/types";
import PostCard from "@/components/PostCard";
import { useSession } from "next-auth/react";
import { User } from "@/types";
import Spinner from "@/components/shared/Spinner";


export default function UserPostsPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getUserPosts()
      .then(setPosts)
      .catch(() => setError("Failed to load your posts"))
      .finally(() => setLoading(false));
  }, [session]);
  // Removed duplicate useSession hook to fix redeclaration error
  console.log(session?.accessToken); // This is your backend access token   
  return (
    <ProtectedWrapper>
      <div style={{ maxWidth: 600, margin: "2rem auto" }}>
        <h1>My Posts</h1>
        {loading && <Spinner />}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {posts.length === 0 && !loading && <div>You have no posts yet.</div>}
        {posts.map(post => (
          <PostCard key={post.id} post={post} currentUser={user as User | null} />
        ))}
      </div>
    </ProtectedWrapper>
  );
} 