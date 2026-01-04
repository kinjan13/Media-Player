export default function Loading({ message = "Loading...", size = "medium" }) {
  const sizeStyles = {
    small: { width: "20px", height: "20px" },
    medium: { width: "40px", height: "40px" },
    large: { width: "60px", height: "60px" }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      gap: "15px"
    }}>
      <div style={{
        ...sizeStyles[size],
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #6b46c1",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }}></div>
      <p style={{
        margin: 0,
        color: "#666",
        fontSize: "16px",
        fontWeight: "500"
      }}>
        {message}
      </p>
    </div>
  );
}