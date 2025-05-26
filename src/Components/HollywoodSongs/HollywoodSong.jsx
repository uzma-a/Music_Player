import React from 'react';
import '../HollywoodSongs/HollywoodSong.css';
import { usePlayer } from '../../context/PlayerContext'; // ✅ use global context

const songs = [

  {
    title: "Shape Of You",
    artist: "Ed Sheeran",
    duration: "4:23",
    cover: "/assets/cover_images/shape-of-you.jpg",
    url: "/assets/musics/Shape of You.mp3",
  },
  {
    title: "Calm Down",
    artist: "Rema, Selena Gomez",
    duration: "3:59",
    cover: "/assets/cover_images/calm-down.jpg",
    url: "/assets/musics/calm-down.mp3",
  },
 
  {
    title: "Faded",
    artist: "Alen Walker",
    duration: "3:38",
    cover: "/assets/cover_images/faded.jpg",
    url: "/assets/musics/Faded.mp3",
  },
  {
    title: "Harley In Hawaii",
    artist: "Katy Perry",
    duration: "3:14",
    cover: "/assets/cover_images/harley-in-hawaii.jpg",
    url: "/assets/musics/HarleyInHawaii.mp3",
  },
  {
    title: "Let Me Down Slowly",
    artist: "Alec Benjamin",
    duration: "2:57",
    cover: "/assets/cover_images/let-me-down-slowly.jpg",
    url: "/assets/musics/let-me-down-slowly.mp3",
  },
  {
    title: "Love Nwantiti",
    artist: "CKay",
    duration: "2:19",
    cover: "/assets/cover_images/love-nwantiti.jpg",
    url: "/assets/musics/love-nwantiti.mp3",
  },
  {
    title: "On My Way",
    artist: "Alan Walker",
    duration: "2:13",
    cover: "/assets/cover_images/on-my-way.jpg",
    url: "/assets/musics/On My Way.mp3",
  },
  {
    title: "Unstoppable",
    artist: "Sia",
    duration: "3:37",
    cover: "/assets/cover_images/unstoppable.webp",
    url: "/assets/musics/Unstoppable.mp3",
  },
  {
    title: "Let Me Love You",
    artist: "Justin Bieber",
    duration: "3:26",
    cover: "/assets/cover_images/let-me-love-you.jpg",
    url: "/assets/musics/let-me-love-you.mp3",
  },
  
];


const HollywoodSongs = () => {
  const { playNewSong } = usePlayer(); // ✅ from context

  return (
    <div className="more-track-page">
      <h1>🎬 Hollywood Hits: The Best of the Silver Screen</h1>
      <div className="song-list-grid">
        {songs.map((song, index) => (
          <div key={index} className="song-card">
            <img src={song.cover} alt={song.title} className="song-cover" />
            <div className="song-info">
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
              <div className="play-here">
                <button onClick={() => playNewSong(song, songs)}>▶</button>


                <p className="duration">{song.duration}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HollywoodSongs;
