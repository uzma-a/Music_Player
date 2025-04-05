import { Routes, Route } from 'react-router-dom';
import MusicPlayer from './Components/MusicPlayer/MusicPlayer';
import Favourite from './Pages/Favourite/Favourite';
import RecentlyPlayed from './Pages/RecentlyPlayed/RecentlyPlayed';
import AOS from "aos";
import "aos/dist/aos.css";

function App() {

  return (
    <>
      {/* MusicPlayer stays mounted across all routes */}
      <MusicPlayer />

      <Routes>
        <Route path="/" element={<div />} /> {/* Placeholder if needed */}
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/recently-played" element={<RecentlyPlayed />} />
        {/* Add other routes as needed */}
      </Routes>
    </>
  );
}

export default App;
