import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
      <div className="hero-content">
        <div className="hero-card">
          <h1 className="hero-title">🎵 Welcome to Media Player</h1>
          <p className="hero-subtitle">
            Discover amazing music and podcasts in one beautiful place
          </p>

          <div className="hero-buttons">
            <Link to="/music" className="hero-button music-button">
              🎶 Browse Music
            </Link>
            <Link to="/podcasts" className="hero-button podcast-button">
              🎙️ Browse Podcasts
            </Link>
          </div>

          {/* <div className="hero-features">
            <div className="feature-item">
              <span className="feature-icon">🎧</span>
              <span>High-quality audio streaming</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📱</span>
              <span>Responsive design</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span>Secure authentication</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
