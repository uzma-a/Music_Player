import React from 'react';
import '../BollywoodSongs/BollywoodSongs.css';
import { usePlayer } from '../../context/PlayerContext'; // ✅ use global context

const songs = [
  {
    title: 'Kesariya',
    artist: 'Arijit Singh',
    cover: 'https://c.saavncdn.com/493/Kesariya-Audio-Teaser-From-Brahmastra--Hindi-2022-20220414173718-500x500.jpg',
    duration: '4:28',
    url: '/assets/moretracksongs/Kesariya.mp3',
  },
  {
    title: 'Apna Bana Le',
    artist: 'Arijit Singh',
    cover: 'https://c.saavncdn.com/815/Bhediya-Hindi-2023-20230927155213-500x500.jpg',
    duration: '4:21',
    url: '/assets/moretracksongs/Apna Bana Le.mp3'
  },
  {
    title: 'Tere Pyaar Mein',
    artist: 'Arijit Singh, Nikhita Gandhi',
    cover: 'https://img.mensxp.com/media/content/2023/Feb/Image-1_Luv-Films_63dcadaf39c51.jpeg?w=780&h=439&cc=1',
    duration: '4:25',
    url: '/assets/moretracksongs/Tere Pyaar Mein.mp3'
  },
  {
    title: 'Jhoome Jo Pathaan',
    artist: 'Arijit Singh, Sukriti Kakar',
    cover: 'https://upload.wikimedia.org/wikipedia/en/8/8b/Jhoome_Jo_Pathaan_song_cover.jpg',
    duration: '3:28',
    url: '/assets/moretracksongs/Jhoome Jo Pathaan - Pathaan.mp3'
  },
  {
    title: 'Heeriye',
    artist: 'Arijit Singh, Jasleen Royal',
    cover: 'https://i1.sndcdn.com/artworks-ah8iiDM4bJtqexxA-1v5pbQ-t500x500.jpg',
    duration: '3:14',
    url: '/assets/moretracksongs/Heeriye (feat. Arijit Singh).mp3'
  },
  {
    title: 'Rasiya Reprise',
    artist: 'Shreya Ghoshal',
    cover: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202209/rasiya.jpg?VersionId=T7D5.8Zuk5DF24vUrigEDba9oExsuqu7&size=690:388',
    duration: '4:45',
    url: '/assets/moretracksongs/Rasiya Reprise - Brahmastra.mp3'
  },
  {
    title: 'Tum Kya Mile',
    artist: 'Arijit Singh, Shreya Ghoshal',
    cover: 'https://s.saregama.tech/image/c/fw_485/3/db/3a/tum-kya-mile-jonita-gandhi-version_1440_1694771112.jpg',
    duration: '4:37',
    url: '/assets/moretracksongs/Tum Kya Mile.mp3'
  },
  {
    title: 'Naina Da Kya Kasoor',
    artist: 'Amit Trivedi',
    cover: 'https://c.saavncdn.com/161/Naina-Da-Kya-Kasoor-Remix-Hindi-2019-20190627171929-500x500.jpg',
    duration: '3:30',
    url: '/assets/moretracksongs/Naina Da Kya Kasoor.mp3'
  },
  {
    title: 'Ve Kamleya',
    artist: 'Arijit Singh, Shreya Ghoshal',
    cover: 'https://m.media-amazon.com/images/I/51lKASAMB7L._UXNaN_FMjpg_QL85_.jpg',
    duration: '4:07',
    url: '/assets/moretracksongs/Ve Kamleya.mp3'
  },
  {
    title: 'Chaleya',
    artist: 'Arijit Singh, Shilpa Rao',
    cover: 'https://c.saavncdn.com/016/Challeya-Hindi-2022-20221129142939-500x500.jpg',
    duration: '3:20',
    url: '/assets/moretracksongs/Chaleya.mp3'
  }
];

const BollywoodSongs = () => {
  const { playNewSong } = usePlayer(); // ✅ from context

  return (
    <div className="more-track-page">
      <h1>Latest Bollywood Songs</h1>
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

export default BollywoodSongs;
