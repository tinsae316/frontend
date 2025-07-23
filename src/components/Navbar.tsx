"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  const isAuthenticated = !!session;
  const user = session?.user;

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      padding: "0 32px",
      height: "64px",
      borderBottom: "1px solid #f1f5f9",
      background: "#fff",
      boxShadow: "0 2px 6px 0 rgba(0,0,0,0.04)",
      position: "sticky",
      top: "0px",
      zIndex: 10
    }}>
      {/* Logo */}
      <div style={{ fontWeight: 700, fontSize: "24px", marginRight: "36px", letterSpacing: -1, cursor: "pointer" }} onClick={() => router.push("/")}> 
        BlogApp
      </div>
      {/* Centered nav links */}
      <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
        {isAuthenticated && <Link href="/posts/all">All Posts</Link>}
        {isAuthenticated && <Link href="/posts">My Posts</Link>}
        {isAuthenticated && <Link href="/posts/create">Create Post</Link>}
      </div>
      <div style={{ flex: 1 }} />
      {/* Auth buttons */}
      {!isAuthenticated && (
        <>
          <Link href="/auth/login" style={{ color: "#222", fontSize: "16px", marginRight: "8px" }}>Login</Link>
          <Link href="/auth/signup">
            <button style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px", fontWeight: 500, fontSize: 16, cursor: "pointer" }}>
              Signup
            </button>
          </Link>
        </>
      )}
      {isAuthenticated && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button onClick={handleLogout} style={{ cursor: "pointer", background: "none", border: "none", color: "#222", fontSize: "16px" }}>Logout</button>
        </div>
      )}
    </nav>
  );
} 