import React from 'react';
import timeago from '../helpers/timeago';

const ChatMessage = ({ user, message, own }) => (own ? (
  <div className="own-message">
    <div className="message-top">
      <p>{message.message}</p>
    </div>
    <div className="message-bottom">{timeago(message.createdAt)}</div>
  </div>
) : (
  <div className="message">
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <img
        className="message-icon"
        alt="profile_picture"
        src={user.profilePicture || '../../assets/images/profile.png'}
      />
      <div className="message-top">
        {/* Image from sender?? */}
        {/* <p className='message-content'>{message.message}</p> */}
        {/* For now */}
        <p>{message.message}</p>
      </div>
    </div>

    <div className="message-bottom">{timeago(message.createdAt)}</div>
  </div>
));

export default ChatMessage;
