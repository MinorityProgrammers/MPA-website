import React, { useState } from 'react';

const ChatUserCard = function ({ u, createChat, setPopUp }) {
  const [addUserClicked, setAddUserClicked] = useState(false);
  const [createChatMessage, setCreateChatMessage] = useState('');
  return (
    <>
      <div
        className="conversation"
        style={{ padding: '15px 15px' }}
        key={u._id}
        onClick={() => {
          setAddUserClicked(!addUserClicked);
        }}
      >
        <img
          src={u.profilePicture || '../../assets/images/profile.png'}
          className="conversation-img"
        />
        <span className="conversation-brief">
          {u?.firstName}
          {' '}
          {u?.lastName}
        </span>
      </div>
      {addUserClicked && (
        <div
          className="chat-popup-container"
          style={{
            padding: '15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: 'solid 1px #151371',
          }}
        >
          <span style={{ color: 'black' }}>
            Creating a chat with
            {' '}
            {u?.firstName}
            {' '}
            {u?.lastName}
            :
          </span>
          <textarea
            className="chat-input"
            style={{ margin: '10px', height: '15vh', width: '30vw' }}
            placeholder="Write a message"
            onChange={(e) => setCreateChatMessage(e.target.value)}
            value={createChatMessage}
          />
          <div className="create-chat-btn-box">
            <div
              className="chat-popup-confirm-btn"
              style={{ padding: '7px 12px', fontSize: '16px' }}
              onClick={() => {
                setAddUserClicked(false);
              }}
            >
              Cancel
            </div>
            <div
              className="chat-popup-cancel-btn"
              style={{ padding: '7px 12px', fontSize: '16px' }}
              onClick={() => {
                createChat(u, createChatMessage);
                setPopUp(false);
              }}
            >
              Create
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ChatUserCard;
