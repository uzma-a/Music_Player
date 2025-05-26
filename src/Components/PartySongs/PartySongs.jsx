import React from 'react';
import '../PartySongs/PartySongs.css';
import { usePlayer } from '../../context/PlayerContext'; // ✅ use global context



const songs = [
    { title: 'Gata-Only', artist: 'ft. Cris MJ', cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/20/d6/7a/20d67a56-2e28-b6e9-f262-feedd66fe32c/0.jpg/1200x1200bb.jpg', duration: '3:42', url: '/assets/moretracksongs/Gata-Only.mp3' },
    { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', cover: 'https://pagallworld.co.in/wp-content/uploads/2023/06/Uptown-Funk.jpg', duration: '4:30', url: '/assets/moretracksongs/Uptown-Funk.mp3' },
    { title: 'Break-Up Song', artist: 'Arijit Singh', cover: 'https://images-platform.99static.com/aS9uGxxkGuDGpUbYMi6OUJqEaJM=/0x0:1000x1000/600x600/99designs-contests-attachments/123/123408/attachment_123408691', duration: '4:12', url: '/assets/moretracksongs/The Breakup Song - Ae Dil Hai Mushkil.mp3' },
    { title: 'Alibi', artist: 'Sevdaliza, Pabllo Vittar, Yseult', cover: 'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/770/1000x0/alibi-1597319331-OqucLosE14.jpg', duration: '2:41', url: '/assets/moretracksongs/Alibi - PagalWorld.mp3' },
    { title: 'Bom diggy', artist: 'Jasmin Walia and Zack Knight', cover: 'https://i1.sndcdn.com/artworks-aIjLOlxJVUgFj10f-zy0PnQ-t500x500.jpg', duration: '3:58', url: '/assets/moretracksongs/Bom Diggy Diggy - Sonu Ke Titu Ki Sweety.mp3' },
    { title: 'Let me Love you', artist: 'Justin Bieber', duration: '3:26', cover: '/assets/cover_images/let-me-love-you.jpg', url: '/assets/musics/let-me-love-you.mp3' },
    { title: 'Birthday Bash', artist: 'Yo Yo Honey Singh ', cover: 'https://i1.sndcdn.com/artworks-000107141487-qtjouf-t500x500.jpg', duration: '4:12', url: '/assets/moretracksongs/Birthday Bash - Dilliwaali Zaalim Girlfriend.mp3' },
    { title: 'Taki Taki', artist: 'DJ Snake ft. Selena Gomez, Ozuna, Cardi B', cover: 'https://i1.sndcdn.com/artworks-000418146432-qrwuit-t500x500.jpg', duration: '3:51', url: '/assets/moretracksongs/Taki-Taki-Rumba.mp3' },
    { title: 'Blinding Lights', artist: 'The Weeknd', cover: '/assets/cover_images/blinding-lights.jpg', duration: '3:21', url: 'assets/musics/blinding-lights.mp3' },
    { title: 'Kusu Kusu', artist: 'Dev Negi and Zara Khan', cover: 'https://images.indianexpress.com/2021/11/FotoJet-1-3.jpg', duration: '3:15', url: '/assets/moretracksongs/Kusu Kusu.mp3' }
  ];

const PartySongs = () => {
  const { playNewSong } = usePlayer(); // ✅ from context

  return (
    <div className="more-track-page">
      <h1>Beats That Make You Move</h1>
      <div className="song-list-grid">
        {songs.map((song, index) => (
          <div key={index} className="song-card">
            <img src={song.cover} alt={song.title} className="song-cover" />
            <div className="song-info">
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
              <div className="play-here">
                <button onClick={() => playNewSong(song)}>▶</button>
                <p className="duration">{song.duration}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartySongs;
