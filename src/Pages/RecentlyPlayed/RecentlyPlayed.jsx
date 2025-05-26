import React from 'react';
import { usePlayer } from '../../context/PlayerContext';
import './RecentlyPlayed.css';

const RecentlyPlayed = () => {
  const { recentlyPlayed, playNewSong } = usePlayer();

  return (
    <div className="recent-page">
      <h1>🕑 Recently Played Songs</h1>
      {recentlyPlayed.length === 0 ? (
        <p className='.no-recent'>No recently played songs yet.</p>
      ) : (
        <div className="song-list-grid">
          {recentlyPlayed.map((song, index) => (
            <div key={index} className="song-card">
              <img src={song.cover} alt={song.title} className="song-cover" />
              <div className="song-info">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
                <button onClick={() => playNewSong(song)}>▶</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyPlayed;
