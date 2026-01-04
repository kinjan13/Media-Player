import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import AudioPlayer from "./components/Player/AudioPlayer";
import QueuePanel from "./components/QueuePanel";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Music = lazy(() => import("./pages/Music"));
const Podcasts = lazy(() => import("./pages/Podcasts"));
const Playlists = lazy(() => import("./pages/Playlists"));
const PlaylistSongs = lazy(() => import("./pages/PlaylistSongs"));
const LikedSongs = lazy(() => import("./pages/LikedSongs"));
const RecentlyPlayed = lazy(() => import("./pages/RecentlyPlayed"));

export default function App() {
  return (
    <>
      <Navbar />

      <Suspense fallback={<Loading message="Loading page..." />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/music"
            element={
              <ProtectedRoute>
                <Music />
              </ProtectedRoute>
            }
          />
          <Route
            path="/podcasts"
            element={
              <ProtectedRoute>
                <Podcasts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/playlists"
            element={
              <ProtectedRoute>
                <Playlists />
              </ProtectedRoute>
            }
          />
          <Route path="/playlists/:playlistId" element={<PlaylistSongs />} />
          <Route
            path="/liked"
            element={
              <ProtectedRoute>
                <LikedSongs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recent"
            element={
              <ProtectedRoute>
                <RecentlyPlayed />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>

      <AudioPlayer />
      <QueuePanel />
    </>
  );
}
