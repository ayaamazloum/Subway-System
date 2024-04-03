import React from 'react'

const Numbers = () => {
  return (
    <div className="numbers-section section flex row">
        <div className='number-item flex column'>
            <p className='number lg-text bold secondary-text'>50+</p>
            <p className='xsm-text light-text'>Active Stations</p>
        </div>
        <div className='number-item flex column'>
            <p className='number lg-text bold secondary-text'>150+</p>
            <p className='xsm-text light-text'>Daily Rides</p>
        </div>
        <div className='number-item flex column'>
            <p className='number lg-text bold secondary-text'>10k+</p>
            <p className='xsm-text light-text'>Satisfied Passengers</p>
        </div>
        <div className='number-item flex column'>
            <p className='number lg-text bold secondary-text'>500+</p>
            <p className='xsm-text light-text'>Experienced Staff Members</p>
        </div>
    </div>
  )
}

export default Numbers