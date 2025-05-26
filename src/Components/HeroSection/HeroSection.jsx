import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import '../HeroSection/HeroSection.css';

const HeroSection = () => {

    const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="hero-modern">
      
      <div className="content-wrap">
        <h1 className="app-title"> Musicify</h1>
       
      </div>
      <div className="options">
        <li onClick={() => navigate("/favourite")}>Favourite</li>
        <li onClick={() => navigate("/recently-played")}>Recently Played</li>
        
      </div>

      {/* Optional animated blobs */}
      <div className="blobs">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
      </div>
    </div>
  );
};

export default HeroSection;
