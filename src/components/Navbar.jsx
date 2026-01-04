import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div style={styles.nav}>
      <h2 style={{ margin: 0 }}>🎵 Media Player</h2>

      <div style={styles.links}>
        {user ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/music">Music</Link>
            <Link to="/podcasts">Podcasts</Link>
            <Link to="/playlists">Playlists</Link>
            <Link to="/liked">❤️ Liked</Link>
            {/* <Link to="/recent">🕘 Recent</Link> */}
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  nav: {
    background: "#6b46c1",
    color: "white",
    padding: "14px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  links: {
    display: "flex",
    gap: "18px",
    fontWeight: 600,
    alignItems: "center",
  },
  logoutButton: {
    background: "transparent",
    border: "1px solid white",
    color: "white",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};