"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignupPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.replace("/posts");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Call backend signup endpoint
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      if (!res.ok) {
        let msg = "Signup failed";
        try {
          const data = await res.json();
          msg = data.message || msg;
        } catch {}
        throw new Error(msg);
      }
      // Log out previous session if any
      await signOut({ redirect: false });
      // Auto-login after signup
      const loginRes = await signIn("credentials", {
        redirect: false,
        email,
        password
      });
      if (loginRes?.error) setError(loginRes.error);
      else router.push("/posts");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  if (session) return null;

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
      <div style={{ display: "flex", width: 700, maxWidth: "98vw", minHeight: 420, background: "#fff", borderRadius: 20, boxShadow: "0 6px 32px 0 rgba(37,99,235,0.10)", overflow: "hidden" }}>
        {/* Left creative side */}
        <div style={{
          flex: 1.1,
          background: "linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 36,
          position: "relative"
        }}>
          <div style={{ fontSize: 60, marginBottom: 18 }}>✍️</div>
          <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: "center", letterSpacing: -1 }}>
            Join the Community!
          </div>
          <div style={{ fontSize: 17, opacity: 0.93, textAlign: "center", maxWidth: 220 }}>
            Create an account to start sharing your stories and connect with others.
          </div>
        </div>
        {/* Right form side */}
        <div style={{ flex: 1, padding: "38px 32px 32px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 18, color: "#222" }}>Signup for BlogApp</h2>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 500, color: "#374151" }}>Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                autoFocus
                style={{ width: "100%", padding: "11px 13px", borderRadius: 8, border: "1.5px solid #d1d5db", fontSize: 16, outline: "none", background: "#f8fafc", transition: "border 0.2s" }}
                onFocus={e => e.currentTarget.style.border = "1.5px solid #2563eb"}
                onBlur={e => e.currentTarget.style.border = "1.5px solid #d1d5db"}
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 500, color: "#374151" }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{ width: "100%", padding: "11px 13px", borderRadius: 8, border: "1.5px solid #d1d5db", fontSize: 16, outline: "none", background: "#f8fafc", transition: "border 0.2s" }}
                onFocus={e => e.currentTarget.style.border = "1.5px solid #2563eb"}
                onBlur={e => e.currentTarget.style.border = "1.5px solid #d1d5db"}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 500, color: "#374151" }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{ width: "100%", padding: "11px 13px", borderRadius: 8, border: "1.5px solid #d1d5db", fontSize: 16, outline: "none", background: "#f8fafc", transition: "border 0.2s" }}
                onFocus={e => e.currentTarget.style.border = "1.5px solid #2563eb"}
                onBlur={e => e.currentTarget.style.border = "1.5px solid #d1d5db"}
              />
            </div>
            {error && <div style={{ color: "#dc2626", marginBottom: 10, fontSize: 15 }}>{error}</div>}
            <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px 0", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 17, marginTop: 8, cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 2px 8px rgba(37,99,235,0.08)", letterSpacing: 0.2 }}>
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 