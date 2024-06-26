import React from 'react'

const Message = ({name, sender, content, reply}) => {
  return (
      <div className='message-container white-bg rounded'>
          <p className={ reply ? 'primary-text' : 'light-text' }>
              {reply ? 'Reply from ' : `${name} to `}
              {sender} : <span className='secondary-text'>{content}</span>
          </p>
      </div>
  )
}

export default Message