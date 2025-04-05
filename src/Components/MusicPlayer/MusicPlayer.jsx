// Import required hooks and libraries
import { useState, useRef, useEffect } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaStepBackward,
  FaStepForward,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import songs from "../../Data/songs"; // Your music data
import "./MusicPlayer.css";
import AOS from "aos";
import "aos/dist/aos.css";

// MusicPlayer Component
const MusicPlayer = () => {
  // State variables
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Index of current song
  const [isPlaying, setIsPlaying] = useState(false); // Play/pause status
  const [wasPlayingBeforeHidden, setWasPlayingBeforeHidden] = useState(false); // Keep track if song was playing before route change
  const [currentTime, setCurrentTime] = useState(0); // Current time of the song
  const [duration, setDuration] = useState(0); // Total duration of song
  const [searchTerm, setSearchTerm] = useState(""); // Search filter
  const [favorites, setFavorites] = useState(() => {
    const storedFavs = localStorage.getItem("favorites");
    return storedFavs ? JSON.parse(storedFavs) : [];
  }); // Favorite songs from localStorage
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle
  const [showMenu, setShowMenu] = useState(false); // Options menu toggle
  const [isMuted, setIsMuted] = useState(false); // Mute toggle

  const audioRef = useRef(null); // Ref to audio element
  const currentSong = songs[currentSongIndex]; // Currently selected song

  const navigate = useNavigate();
  const location = useLocation();

  // Only show player UI on homepage
  const showUIOnlyOn = ["/", "/favourite", "/recently-played"];
  const showUI = showUIOnlyOn.includes(location.pathname);

  // Hide full layout for these routes
  const hiddenRoutes = ["/favourite", "/recently-played"];
  const isHidden = hiddenRoutes.includes(location.pathname);

  // Change background based on play/pause state
  useEffect(() => {
    document.body.style.background = isPlaying
      ? "linear-gradient(110deg, #031120, #0c0c0c, black)"
      : "linear-gradient(110deg, #110101, #160101, #110101)";
  }, [isPlaying]);

  // Pause playback on routes where UI should not show
  useEffect(() => {
    if (!audioRef.current) return;

    if (!showUI) {
      if (isPlaying) {
        audioRef.current.pause();
        setWasPlayingBeforeHidden(true);
        setIsPlaying(false);
      }
    } else {
      if (wasPlayingBeforeHidden) {
        audioRef.current.play();
        setIsPlaying(true);
        setWasPlayingBeforeHidden(false);
      }
    }
  }, [location.pathname]);

  // Track song progress and duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setCurrentTime(audio.currentTime || 0);
    const updateDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [currentSongIndex]);

  // Auto play new song when index changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.load();
    setCurrentTime(0);
    if (isPlaying && showUI) {
      audio.play();
    }
  }, [currentSongIndex]);

  // Add current song to recently played list
  useEffect(() => {
    if (currentSong) {
      addToRecentlyPlayed(currentSong);
    }
  }, [currentSongIndex]);

  // Go to previous song
  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
  };

  // Go to next song
  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev === songs.length - 1 ? 0 : prev + 1));
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Seek through song
  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  // Filter songs using search term
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add or remove song from favorites
  const toggleFavorite = (song) => {
    const isAlreadyFav = favorites.some((fav) => fav.title === song.title);
    const updatedFavs = isAlreadyFav
      ? favorites.filter((fav) => fav.title !== song.title)
      : [...favorites, song];

    setFavorites(updatedFavs);
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
  };

  // Store recently played songs in localStorage
  const addToRecentlyPlayed = (song) => {
    let recent = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
    recent = recent.filter((s) => s.title !== song.title);
    recent.unshift(song);
    recent = recent.slice(0, 10);
    localStorage.setItem("recentlyPlayed", JSON.stringify(recent));
  };

  // Sidebar toggle handler
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Toggle mute
  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef.current) {
      audioRef.current.muted = newMuted;
    }
  };

  // Init AOS animation library
  useEffect(() => {
    AOS.init({
      once: true, // Animate only once
    });
  }, []);

  return (
    <>
      {/* Audio player element */}
      <audio ref={audioRef} src={currentSong.musicUrl} muted={isMuted}></audio>

      {showUI && (
        <div className={`music-player ${isHidden ? "hidden" : ""}`}>
          {/* Sidebar (Spotify-like) */}
          <div data-aos="fade-up" data-aos-duration="1200" className="spotify-wrapper">
            <div className="menu-icon">
              {sidebarOpen ? <X onClick={toggleSidebar} /> : <Menu onClick={toggleSidebar} />}
            </div>

            <aside className={`spotify-player ${sidebarOpen ? "open" : ""}`}>
              <div className="spotify-sec">
                <img
                  className="spotify-icon"
                  src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png"
                  alt="Spotify"
                />
                <h2 onClick={() => navigate("/")} className="spotify">Spotify</h2>
              </div>
              <ul className="tracks">
                <li className="for-you">For You</li>
                <li>Top Tracks</li>
                <li onClick={() => navigate("/favourite")}>Favourite</li>
                <li onClick={() => navigate("/recently-played")}>Recently Played</li>
              </ul>
            </aside>
          </div>

          {/* Song list and search */}
          <aside className="sidebar">
            <h2>For You</h2>
            <input
              type="text"
              placeholder="Search Song, Artist"
              className="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="song-list">
              {filteredSongs.map((song) => {
                const actualIndex = songs.findIndex((s) => s.title === song.title);
                return (
                  <li
                    key={actualIndex}
                    className={currentSongIndex === actualIndex ? "active" : ""}
                    onClick={() => {
                      setCurrentSongIndex(actualIndex);
                      setIsPlaying(true);
                    }}
                  >
                    <img src={song.thumbnail} alt={song.title} />
                    <div>
                      <p>{song.title}</p>
                      <span>{song.artist}</span>
                    </div>
                    <span>{song.duration}</span>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Main Player Controls Section */}
          <main className="player">
            <h3 data-aos="slide-up" data-aos-duration="1200">{currentSong.title}</h3>
            <p data-aos="slide-up" data-aos-duration="1200">{currentSong.artist}</p>
            <img src={currentSong.thumbnail} alt={currentSong.title} className="cover-image" />

            <div className="player-controls-wrapper">
              {/* Progress Bar */}
              <div className="progress-container">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={duration ? (currentTime / duration) * 100 : 0}
                  onChange={handleSeek}
                  className="progress-bar"
                  style={{
                    "--progress": `${(currentTime / duration) * 100}%`,
                  }}
                />
              </div>

              {/* Play / Pause / Volume / Favorite Controls */}
              <div className="controls">
                {/* Favorite dropdown */}
                <div className="controls-left">
                  <div className="menu-wrapper" style={{ position: "relative" }}>
                    <div className="menu-toggle" onClick={() => setShowMenu(!showMenu)}>
                      &#8942;
                    </div>
                    {showMenu && (
                      <div className="dropdown-menu">
                        <div className="fav-heart-icon" onClick={() => toggleFavorite(currentSong)}>
                          {favorites.some((song) => song.title === currentSong.title) ? (
                            <FaHeart color="red" />
                          ) : (
                            <FaRegHeart color="white" />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Core control buttons */}
                <div className="controls-btn">
                  <FaStepBackward onClick={handlePrev} />
                  {isPlaying ? (
                    <FaPause onClick={togglePlay} />
                  ) : (
                    <FaPlay onClick={togglePlay} />
                  )}
                  <FaStepForward onClick={handleNext} />
                </div>

                {/* Volume control */}
                <div className="controls-right" onClick={toggleMute}>
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
