import React from 'react';
import '../PartySongs/PartySongs.css';
import { usePlayer } from '../../context/PlayerContext'; // ✅ use global context



const songs = [
    {
      title: 'Galla Goodiyan',
      artist: 'Yashita Yashpal Sharma, Javed Akhtar, Farhan Akhtar, Sukhwinder Singh',
      cover: 'https://images.indianexpress.com/2015/05/gallan-goodiyaan-480.jpg',
      duration: '4:56',
      url: '/assets/moretracksongs/128-Gallan Goodiyaan.mp3'
    },
    {
      title: 'Kudmayi',
      artist: 'Amitabh Bhattacharya, Sachet Tandon, Pritam Chakraborty',
      cover: 'https://akm-img-a-in.tosshub.com/indiatoday/images/media_bank/202308/alia-bhat-in-kudmayi-034100-16x9.jpg?VersionId=hIukcGR52pPbQQTXoBTRb.hxLrv56q23',
      duration: '4:25',
      url: '/assets/moretracksongs/Kudmayi (Film Version).mp3'
    },
    {
      title: 'Jogi Maahi',
      artist: 'Himani Kapoor, Shekhar Ravjiani, Sukhwinder Singh',
      cover: 'https://c.saavncdn.com/059/Jogi-Mahi-Hits-By-Sukhwinder-Singh-2013-500x500.jpg',
      duration: '4:55',
      url: '/assets/moretracksongs/Jogi Mahi.mp3'
    },
    {
      title: 'The Ghagra Song',
      artist: 'Vishal Dadlani, Rekha Bhardwaj',
      cover: 'https://i.pinimg.com/736x/67/45/49/674549a743daa782d90052f843630b5f.jpg',
      duration: '5:04',
      url: '/assets/moretracksongs/Ghagra.mp3'
    },
    {
      title: 'DilliWali Girlfriend',
      artist: 'Arijit Singh, Sunidhi Chauhan',
      cover: 'https://cdn.augrav.com/online/jewels/2016/07/Dilliwali-Girlfriend.jpg',
      duration: '4:20',
      url: '/assets/moretracksongs/Dilliwaali Girlfriend.mp3'
    },
    
  ];

const PartySongs = () => {
  const { playNewSong } = usePlayer(); // ✅ from context

  return (
    <div className="more-track-page">
      <h1>Love, Lights & Wedding Beats</h1>
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
