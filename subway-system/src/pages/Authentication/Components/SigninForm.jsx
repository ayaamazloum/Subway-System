const SigninForm = () => {
  return (
      <>
        <div className='flex column gap-20'>
            <input className='input lexend-text semi-rounded sm-text' type="text" placeholder='Email' />
            <input className='input lexend-text semi-rounded sm-text' type="text" placeholder='Password' />
        </div>
        <button className='submit-btn sm-text bold primary-bg white-text semi-rounded'>Sign in</button>
    </>
  )
}

export default SigninForm