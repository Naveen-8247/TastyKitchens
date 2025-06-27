import {FaPinterest, FaInstagram, FaTwitter, FaFacebook} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer" data-testid="footer">
    <div className="footer-logo">
      <img
        src="//res.cloudinary.com/dcy78sibl/image/upload/v1750014966/Frame_274_mve4xt.png"
        alt="website-footer-logo"
        className="footer-img"
      />
      <h1 className="footer-title">Tasty Kitchens</h1>
    </div>
    <p className="footer-desc">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="footer-icons">
      <FaPinterest data-testid="pintrest-social-icon" />
      <FaInstagram data-testid="instagram-social-icon" />
      <FaTwitter data-testid="twitter-social-icon" />
      <FaFacebook data-testid="facebook-social-icon" />
    </div>
  </div>
)

export default Footer
