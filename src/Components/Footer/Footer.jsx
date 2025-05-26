import React from "react";
import { FaInstagram, FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";
import '../Footer/Footer.css'

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-left">
        <h3>🎵 Musicify</h3>
        <p>&copy; 2025 Musicify. All rights reserved.</p>
      </div>

      <div className="footer-center">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact Us</a>
      </div>

      <div className="footer-right">
        <FaInstagram />
        <FaTwitter />
        <FaFacebook />
        <FaYoutube />
      </div>
    </footer>
  );
};

export default Footer;
