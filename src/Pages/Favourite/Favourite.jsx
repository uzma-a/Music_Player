import React from 'react';
import { usePlayer } from '../../context/PlayerContext';
import './Favourite.css';

const Favourite = () => {
  const { likedSongs, playNewSong } = usePlayer();

  return (
    <div className="favourite-page">
      <h1>❤️ Favourite Songs</h1>
      {likedSongs.length === 0 ? (
        <p className='not-liked'>Listen and add your favourite songs here ❤️</p>
      ) : (
        <div className="song-list-grid">
          {likedSongs.map((song, index) => (
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

export default Favourite;
