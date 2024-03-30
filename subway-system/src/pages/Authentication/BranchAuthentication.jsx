import './style.css';
import authimg from '../../assets/images/auth.jpg';
import logo from '../../assets/images/logo.svg'

const BranchAuthentication = () => {
  return (
    <div className='auth-page flex full-width full-height'>
        <div className='auth-container flex column center gap-50 half-width secondary-bg'>
            <img className='auth-logo' src={logo} />
            <button className='auth-tab lexend-text sm-text white-text secondary-bg'>Accept Invitation</button>
            <div className='flex column gap-20'>
                <input className='input lexend-text semi-rounded sm-text' type="text" placeholder='Password' />
            </div>
            <button className='submit-btn sm-text bold primary-bg white-text semi-rounded'>Sign up</button>
        </div>
        <img className='auth-img half-width' src={authimg} />
    </div>
  )
}

export default BranchAuthentication