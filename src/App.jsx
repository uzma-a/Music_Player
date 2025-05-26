import { Routes, Route } from 'react-router-dom';
import Favourite from './Pages/Favourite/Favourite';
import RecentlyPlayed from './Pages/RecentlyPlayed/RecentlyPlayed';
import Footer from './Components/Footer/Footer';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
import HeroSection from './Components/HeroSection/HeroSection';
import BollywoodSongs from './Components/BollywoodSongs/BollywoodSongs';
import PartySongs from './Components/PartySongs/PartySongs';
import WeddingSongs from './Components/WeddingSongs/WeddingSongs';
import HollywoodSongs from './Components/HollywoodSongs/HollywoodSong';
import PlayBar from './Components/PlayBar/PlayBar';

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <BollywoodSongs />
                <PartySongs />
                <WeddingSongs />
                <HollywoodSongs />
              </>
            }
          />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/recently-played" element={<RecentlyPlayed />} />
        </Routes>

        {/* ✅ PlayBar is now global */}
        <PlayBar />
      </div>

      <Footer />
    </div>
  );
}

export default App;
