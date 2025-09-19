import React from "react";
import developerPng from "./images/developer-png.png";

const Contact = () => {
  return (
    <div className="contactUs-main-container">
      <div className="contactUs-left-para">
        <h3>Let's get in touch</h3>
        <i className="fa fa-envelope"></i>
        <a className="mail-links" href="mailto:savagegamer1289@gmail.com">
          savagegamer1289@gmail.com
        </a>

        <i className="fa fa-linkedin"></i>
        <a className="mail-links" href="https://www.linkedin.com/in/devkaushalprakash?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
          User Name: devkaushalprakash
        </a>

        <i className="fa fa-github"></i>
        <a className="mail-links" href="https://github.com/kaushal-Prakash">
          kaushal-Prakash
        </a>

        <i className="fa fa-phone"></i>
        <a className="mail-links" href="tel:+8899772696">
          +92 301 9583959
        </a>
      </div>
      <div className="contactUs-pic">
        <img src={developerPng} alt="Profile"/>
      </div>
    </div>
  );
};

export default Contact;
