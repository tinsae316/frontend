"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav style={{ display: "flex", gap: 16, padding: 16, borderBottom: "1px solid #eee", alignItems: "center" }}>
      <Link href="/">Home</Link>
      <Link href="/posts/all">All Posts</Link>
      {isAuthenticated && <Link href="/posts">My Posts</Link>}
      {isAuthenticated && <Link href="/posts/create">Create Post</Link>}
      <div style={{ flex: 1 }} />
      {!isAuthenticated && <Link href="/login">Login</Link>}
      {!isAuthenticated && <Link href="/signup">Sign Up</Link>}
      {isAuthenticated && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Profile icon placeholder, could be replaced with an actual avatar */}
          <Link href="/profile" title="Profile">
            <span style={{
              display: "inline-block",
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#ccc",
              textAlign: "center",
              lineHeight: "32px",
              fontWeight: "bold",
              color: "#333",
              fontSize: 18,
              userSelect: "none"
            }}>
              {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
            </span>
          </Link>
          <button onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</button>
        </div>
      )}
    </nav>
  );
} 