"use client";

export default function Spinner() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "200px",
      width: "100%",
    }}>
      <div style={circleWrapperStyle}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{
            ...dotStyle,
            transform: `rotate(${i * 45}deg) translate(20px)`,
            animationDelay: `${i * 0.1}s`,
          }} />
        ))}
      </div>

      <style>{`
        @keyframes fade {
          0%, 39%, 100% {
            opacity: 0.3;
          }
          40% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

const circleWrapperStyle: React.CSSProperties = {
  position: "relative",
  width: 64,
  height: 64,
};

const dotStyle: React.CSSProperties = {
  position: "absolute",
  top: "28px",
  left: "28px",
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: "#2563eb",
  animation: "fade 1.2s infinite ease-in-out",
};
