import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";

const Footer = (props) => {
  return (
    <footer className="footer">
      <div>
        <Link className="logo-container" to="/">
          <img className="navbar-logo" src={logo} alt="PawFinds Logo" />
          <p>{props.title}</p>
        </Link>
      </div>
      
      <div className="team-section">
        <h3>Our Team</h3>
        <div className="team-members">
          <p>Kaushal Prakash</p>
          <p>Jayantilal</p>
          <p>Ibaad</p>
          <p>Manik Salaria</p>
        </div>
      </div>
      
      <div className="below-footer">
        <p>
          You can reach us at{" "}
          <a className="mail-links" href="mailto:savagegamer1289@gmail.com">
            savagegamer1289@gmail.com
          </a>
        </p>
        <p>
          <a
            className="contact-links"
            href="https://www.linkedin.com/in/manik-salaria-095501280/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-linkedin-square"></i> Linkedin
          </a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a
            className="contact-links"
            href="https://github.com/kaushal-Prakash/pawfinds"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-github"></i> GitHub
          </a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a
            className="contact-links"
            href="https://www.instagram.com/manik_276/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-instagram"></i> Instagram
          </a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a
            className="contact-links"
            href="https://api.whatsapp.com/qr/GXRHM7PEPNOKA1?autoload=1&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-whatsapp"></i> WhatsApp
          </a>
        </p>
        <p>&copy; 2025 PawFinds Team - Kaushal Prakash, Jayantilal, Ibaad, Manik Salaria</p>
      </div>
    </footer>
  );
};

export default Footer;
