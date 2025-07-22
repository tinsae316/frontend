"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleBrowsePosts = () => {
    if (isAuthenticated) {
      router.push("/posts/all");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <main style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
      <h1 style={{ fontSize: 44, fontWeight: 700, marginTop: 48, marginBottom: 12, textAlign: "center" }}>
        Welcome to BlogApp
      </h1>
      <p style={{ fontSize: 22, color: "#475569", marginBottom: 36, textAlign: "center", maxWidth: 600 }}>
        Share your thoughts, discover amazing content, and connect with writers from around the world.
      </p>
      <div style={{ display: "flex", gap: 20, marginBottom: 56 }}>
        <button
          onClick={handleBrowsePosts}
          style={{ padding: "14px 36px", fontSize: 18, borderRadius: 8, background: "#2563eb", color: "#fff", border: "none", fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
        >
          Browse All Posts
        </button>
        <Link href={isAuthenticated ? "/posts/create" : "/auth/login"}>
          <button style={{ padding: "14px 36px", fontSize: 18, borderRadius: 8, background: "#fff", color: "#2563eb", border: "2px solid #2563eb", fontWeight: 500, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            Start Writing
          </button>
        </Link>
      </div>
      <div style={{ display: "flex", gap: 64, justifyContent: "center", marginTop: 32, marginBottom: 32, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 260 }}>
          <div style={{ background: "#e0edff", borderRadius: "50%", width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 32 }}>✏️</span>
          </div>
          <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>Write & Share</div>
          <div style={{ color: "#475569", fontSize: 16, textAlign: "center" }}>
            Create and publish your stories<br />with our easy-to-use editor.
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 260 }}>
          <div style={{ background: "#d1fae5", borderRadius: "50%", width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 32 }}>👥</span>
          </div>
          <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>Connect</div>
          <div style={{ color: "#475569", fontSize: 16, textAlign: "center" }}>
            Discover content from talented<br />writers in our community.
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 260 }}>
          <div style={{ background: "#f3e8ff", borderRadius: "50%", width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 32 }}>⚡</span>
          </div>
          <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>Grow</div>
          <div style={{ color: "#475569", fontSize: 16, textAlign: "center" }}>
            Build your audience and improve<br />your writing skills.
          </div>
        </div>
      </div>
    </main>
  );
}
