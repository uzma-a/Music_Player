import { useEffect, useState, useRef } from "react";
import "./Favourite.css";
import songs from '../../Data/songs'
import { FaHeartBroken } from "react-icons/fa";

const Favourite = () => {
  const [favorites, setFavorites] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs));
    }

    const songs = [
      {
        title: "Sunflower",
        artist: "Post Malone",
        duration: "2:38",
        thumbnail:
          "https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f",
          musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      },
      {
        title: "Shape of You",
        artist: "Ed Sheeran",
        duration: "3:53",
        thumbnail:
          "https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png",
          musicUrl: "/assets/musics/Shape of You.mp3",
      },
      {
        title: "Blinding Lights",
        artist: "The Weeknd",
        duration: "3:21",
        thumbnail:
          "/assets/cover_images/blinding-lights.jpg",
          musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      },
      {
        title: "Levitating",
        artist: "Dua Lipa",
        duration: "3:24",
        thumbnail:
          "https://images1.hungama.com/tr:n-a_11_xs/c/1/49e/2b9/59712064/59712064_800x800.jpg?version=6_15",
          musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      },
      {
        title: "Perfect",
        artist: "Ed Sheeran",
        duration: "4:23",
        thumbnail:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZq6MYzsC0NSvNOIiN6o4R7i5K7FFyXb4Qsg&s",
          musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      }
    ];

    setAllSongs(songs);
  }, []);

  const playSong = (url) => {
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play();
    }
  };

  return (
    <div className="favourite-page">
      <h2 className="fav-heading">Your Favourite Songs</h2>

      {favorites.length === 0 ? (
        <div className="empty-fav">
          <FaHeartBroken className="heart-icon" />
          <p>Listen and add your favourite songs here ❤️</p>
        </div>
      ) : (
        <div className="slide-container">
          <ul className="fav-song-list">
            {favorites.map((song, index) => (
              <li
                className="fav-song-card"
                key={index}
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
        </div>
      )}

      <h2 className="fav-heading">More Songs to Listen 🎧</h2>
      <div className="slide-container">
        <ul className="fav-song-list">
          {allSongs.map((song, index) => (
            <li
              className="fav-song-card"
              key={index}
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
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Favourite;
