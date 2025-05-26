import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Initialize likedSongs from localStorage or empty array
  const [likedSongs, setLikedSongs] = useState(() => {
    const saved = localStorage.getItem('likedSongs');
    return saved ? JSON.parse(saved) : [];
  });

  // Save likedSongs to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
  }, [likedSongs]);

  const toggleLike = (song) => {
    setLikedSongs((prev) => {
      const isLiked = prev.some((s) => s.title === song.title);
      if (isLiked) {
        return prev.filter((s) => s.title !== song.title); // remove from liked
      } else {
        return [...prev, song]; // add to liked
      }
    });
  };

  // Load recentlyPlayed from localStorage on init
  const [recentlyPlayed, setRecentlyPlayed] = useState(() => {
    const saved = localStorage.getItem('recentlyPlayed');
    return saved ? JSON.parse(saved) : [];
  });

  // Save recentlyPlayed to localStorage on changes
  useEffect(() => {
    localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);

  // Call this function whenever a song is played
  const addRecentlyPlayed = (song) => {
    setRecentlyPlayed(prev => {
      // Remove the song if already in list
      const filtered = prev.filter(s => s.title !== song.title);
      // Add the song to the front
      const updated = [song, ...filtered];
      // Limit to max 10 songs
      if (updated.length > 10) updated.pop();
      return updated;
    });
  };


  // Play a new song, with optional new playlist and index
  const playNewSong = (song, songsList = playlist) => {
    const index = songsList.findIndex(s => s.title === song.title);
    if (index === -1) {
      setPlaylist([song]);
      setCurrentIndex(0);
    } else {
      setPlaylist(songsList);
      setCurrentIndex(index);
    }
    setIsPlaying(true);
    addRecentlyPlayed(song);  // Add this line
  };


  const playPrev = () => {
    if (playlist.length === 0) return;
    setCurrentIndex((prev) => {
      const newIndex = prev > 0 ? prev - 1 : playlist.length - 1;
      return newIndex;
    });
    setIsPlaying(true);
  };

  const playNext = () => {
    if (playlist.length === 0) return;
    setCurrentIndex((prev) => {
      const newIndex = prev < playlist.length - 1 ? prev + 1 : 0;
      return newIndex;
    });
    setIsPlaying(true);
  };

  // Defensive: currentSong always from currentIndex (avoid out-of-range)
  const currentSong = (currentIndex >= 0 && currentIndex < playlist.length)
    ? playlist[currentIndex]
    : null;

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  // Update currentTime and duration from audio element events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const timeUpdateHandler = () => setCurrentTime(audio.currentTime);
    const durationChangeHandler = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', timeUpdateHandler);
    audio.addEventListener('durationchange', durationChangeHandler);

    return () => {
      audio.removeEventListener('timeupdate', timeUpdateHandler);
      audio.removeEventListener('durationchange', durationChangeHandler);
    };
  }, []);

  // When currentSong changes, load new audio source and start playing if isPlaying
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentSong) {
      audio.src = currentSong.url;
      audio.load();
      if (isPlaying) {
        audio.play().catch(e => console.log('Play prevented:', e));
      }
    }
  }, [currentSong]);

  // Play or pause audio element when isPlaying changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(e => console.log('Play prevented:', e));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        togglePlayPause,
        playNewSong,
        playPrev,
        playNext,
        currentTime,
        duration,
        audioRef,
        playlist,
        currentIndex,
        setPlaylist,
        likedSongs,
        toggleLike,
        recentlyPlayed,
        addRecentlyPlayed,
      }}
    >
      {children}
      <audio ref={audioRef} style={{ display: 'none' }} />
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
