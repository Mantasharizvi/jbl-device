import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" data-testid="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">JBL</div>
          <p>The Call Center Is Open On Weekdays From 9:00 To 20:00 And On Weekends From 9:00 To 18:00</p>
          <div className="contact"><i className="fa-solid fa-phone"></i> +91 6602173389</div>
          <div className="contact"><i className="fa-solid fa-envelope"></i> abc12@gmail.com</div>
          <div className="footer-socials">
            <h4>FOLLOW US</h4>
            <div className="icons">
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-linkedin-in"></i>
              <i className="fa-brands fa-youtube"></i>
            </div>
          </div>
        </div>

        <div className="footer-col">
          <h4>SHOP</h4>
          <ul>
            <li>Featured</li><li>Headphone</li><li>Earring</li>
            <li>Speaker</li><li>Soundbars</li><li>Professional</li><li>Offer Zone</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>SUPPORT</h4>
          <ul>
            <li>Order Status</li><li>BoTs Purchase Program</li><li>Early Authorize</li>
            <li>Product Support</li><li>Shipping & Delivery</li><li>Service Center</li><li>Brand Story</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>ABOUT US</h4>
          <ul>
            <li>Harman Corporate</li><li>Privacy Policy</li><li>Cookie Policy</li>
            <li>Cookie Setting</li><li>Warranty Policy</li><li>Terms Of Use</li><li>Why Buy Direct</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>PRODUCT SUPPORT</h4>
          <ul>
            <li><b>Manufactured By:</b></li>
            <li>Harman International<br/>Industries, Inc.</li>
            <li>8500 Balboa Blvd,<br/>Northridge, CA 91329 USA</li>
            <li><b>Imported By:</b></li>
            <li>Harman International<br/>Pvt Ltd, Bangalore, India</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2024 JBL by Harman. All Rights Reserved</span>
        <span className="jbl-big">JBL</span>
      </div>
    </footer>
  );
};

export default Footer;
