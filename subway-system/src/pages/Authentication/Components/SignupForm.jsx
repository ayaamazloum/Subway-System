import React from 'react'

const SignupForm = () => {
  return (
      <>
        <div className='flex column gap-20'>
            <input className='input lexend-text semi-rounded sm-text' type="text" placeholder='First Name' />
            <input className='input lexend-text semi-rounded sm-text' type="text" placeholder='Last Name' />
            <input className='input lexend-text semi-rounded sm-text' type="text" placeholder='Email' />
            <input className='input lexend-text semi-rounded sm-text' type="password" placeholder='Password' />
            <input className='input lexend-text semi-rounded sm-text' type="text" placeholder='Location' />
        </div>
        <button className='submit-btn sm-text bold primary-bg white-text semi-rounded'>Sign up</button>
    </>
  )
}

export default SignupForm