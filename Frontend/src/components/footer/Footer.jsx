import "./Footer.css";
import { FaFacebookF, FaInstagram, FaYoutube, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import footerlogo from "../imgs/footerlogo.jpg"; // replace with your actual logo path

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-left">

          <div className="footer-logo">
            <img src={footerlogo} alt="Logo" className="footer-img" />
         

          </div>
         
          <div className="contact-info">
            <p>
              <FaEnvelope className="footer-icon" /> digitalkohat@gmail.com
            </p>
            <p>
              <FaPhoneAlt className="footer-icon" /> 1800-3232-8686
            </p>
          </div>
        </div>

        {/* Middle Section */}
        <div className="footer-links">
          <div>
            <h4>Company</h4>
            <ul>
              <li>Features</li>
              <li>About Us</li>
              <li>Contact</li>

            </ul>
          </div>
          <div>
            <h4>Help</h4>
            <ul>
              <li>FAQ</li>
              <li>Help Center</li>
              <li>Support</li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <h4>Get In Touch!</h4>
          <div className="subscribe-box">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>

          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaYoutube />
            <FaFacebookF />
          </div>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <p>© 2025 Digital Smart Cities Hub (SMC-PVT LTD). All Rights Reserved.</p>

        <div className="footer-terms">

        </div>
      </div>
    </footer>
  );
};

export default Footer;