import './style.css';
import Logo from '../../assets/images/dark-logo.svg'
import FacebookIcon from '../../assets/icons/facebook.svg'
import LinkedinIcon from '../../assets/icons/linkedin.svg'
import InstagramIcon from '../../assets/icons/instagram.svg'
import TwitterIcon from '../../assets/icons/twitter.svg'

const Footer = () => {
  return (
        <div className='footer white-bg flex row'>
            <div className="footer-right flex column gap-20">
                <img className='footer-logo' src={Logo} />
                <p className='xsm-text secodary-text'>The fastest and best subway rides experience worldwide.</p>
                <p className='xsm-text light-text'>Copy © 2024 YourWay.</p>
            </div>
            <div className="footer-left flex row gap-20">
                <img className='social-icon' src={LinkedinIcon} />
                <img className='social-icon' src={InstagramIcon} />
                <img className='social-icon' src={FacebookIcon} />
                <img className='social-icon' src={TwitterIcon} />
            </div>
        </div>
    )
}

export default Footer