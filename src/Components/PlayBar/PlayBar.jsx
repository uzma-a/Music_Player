import React from 'react';
import { usePlayer } from '../../context/PlayerContext';
import './PlayBar.css';

const PlayBar = () => {
  const {
    currentSong: song,
    isPlaying,
    togglePlayPause,
    playPrev,
    playNext,
    currentTime,
    duration,
    likedSongs,
    toggleLike,
  } = usePlayer();

  if (!song) return null;

  const isLiked = likedSongs.some((s) => s.title === song.title);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="play-bar">
      <img src={song.cover} alt={song.title} className="play-bar-cover" />

      <div className="play-bar-info">
        <h4>{song.title}</h4>
        <p>{song.artist}</p>
        <div className="play-bar-timestamp">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      <div className="play-bar-controls">
        <button onClick={playPrev} title="Previous">⏮️</button>
        <button onClick={togglePlayPause} title="Play/Pause">
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button onClick={playNext} title="Next">⏭️</button>
        <button
          className={`like-button ${isLiked ? 'liked' : ''}`}
          onClick={() => toggleLike(song)}
          title="Like"
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
};

export default PlayBar;
