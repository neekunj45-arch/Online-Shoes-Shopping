import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <div>
      <div className="footer" id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
            <h2>Resources</h2>
                <ul>
                    <li>Find A Store</li>
                    <li>Become A Member</li>
                    <li>Send Us Feedback</li>
                </ul>
            </div>
            <div className="footer-content-center">
            <h2>Help</h2>
                <ul>
                    <li>Get Help</li>
                    <li>Order Status</li>
                    <li>Delivery</li>
                    <li>Returns</li>
                    <li>Contact Us On All Other Inquiries</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Company</h2>
                <ul>
                    <li>About us</li>
                    <li>News</li>
                    <li>Careers</li>
                    <li>Investors</li>
                    <li>Sustainability</li>
                </ul>
            </div>
            
        </div>
        <hr />
      <p className="footer-copyright">
        copyright 2026 © osscollection.com - All Right Reserved
      </p>
      </div>
     
    </div>
  )
}

export default Footer
