"use client";

export default function Footer() {
  return (
    <footer style={{ textAlign: "center", padding: 16, borderTop: "1px solid #eee", marginTop: 32 }}>
      &copy; {new Date().getFullYear()} My Blog App
    </footer>
  );
} 