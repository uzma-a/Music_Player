import { useEffect, useState, useRef } from "react";
import "./RecentlyPlayed.css";

const RecentlyPlayed = () => {
  const [recentSongs, setRecentSongs] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("recentlyPlayed");
    if (stored) {
      setRecentSongs(JSON.parse(stored));
    }
  }, []);

  const playSong = (url) => {
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play();
    }
  };

  return (
    <div className="recent-page">
      <h2 className="recent-heading">Recently Played Songs</h2>

      {recentSongs.length === 0 ? (
        <p>No songs played recently.</p>
      ) : (
        <ul className="recent-song-list">
          {recentSongs.map((song, index) => (
            <li
              key={index}
              className="recent-song-card"
              onClick={() => playSong(song.musicUrl)}
            >
              <img src={song.thumbnail} alt={song.title} />
              <div className="song-info">
                <p>{song.title}</p>
                <span>{song.artist}</span>
              </div>
              <span className="duration">{song.duration}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Hidden audio element */}
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default RecentlyPlayed;
