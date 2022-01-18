import React, { useState } from 'react';

const Conversation = ({
  conversation,
  currentUser,
  type,
  c,
  unblockfunc,
  acceptfunc,
  rejectfunc,
}) => {
  const user = conversation.users.find((m) => m._id !== currentUser._id);
  let popupfunc;
  let popupmsg;
  let popupconfirm;
  if (type === 'blocked') {
    popupfunc = unblockfunc;
    popupmsg = `Are you sure you want to unblock ${user.firstName} ${user.lastName}?`;
    popupconfirm = 'Unblock';
  }
  if (type === 'pending') {
    popupfunc = acceptfunc;
    popupmsg = `Do you want to chat with ${user.firstName} ${user.lastName}?`;
    popupconfirm = 'Accept';
  }
  const [popup, setPopup] = useState(false);
  const [rejectPopup, setRejectPopup] = useState(false);
  return (
    <div
      className="conversation"
      style={c == conversation ? { backgroundColor: '#ececec' } : {}}
    >
      <img
        src={user.profilePicture || '../../assets/images/profile.png'}
        className="conversation-img"
      />
      {conversation.newMessage ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="conversation-brief">
            {user?.firstName}
            {' '}
            {user?.lastName}
          </span>
          <span style={{ fontSize: '14px' }}>New Message</span>
        </div>
      ) : (
        <>
          <span className="conversation-brief">
            {user?.firstName}
            {' '}
            {user?.lastName}
          </span>
          {type === 'blocked' && conversation.blocking_user == currentUser._id && (
            <div
              className="conversation-blocked-btn"
              onClick={() => setPopup(true)}
            >
              Unblock
            </div>
          )}
          {type === 'blocked'
            && conversation.blocking_user != currentUser._id && (
              <span style={{ marginLeft: '4px' }}>
                This chat has been blocked
              </span>
          )}
          {type === 'pending' && conversation.users[0]._id != currentUser._id && (
            <>
              <div
                className="conversation-accept-btn"
                onClick={() => setPopup(true)}
              >
                Accept
              </div>
              <div
                className="conversation-blocked-btn"
                onClick={() => setRejectPopup(true)}
              >
                Reject
              </div>
            </>
          )}
        </>
      )}

      {type === 'pending' && conversation.users[0]._id == currentUser._id && (
        <span style={{ marginLeft: '4px' }}>Waiting on response</span>
      )}
      {rejectPopup && (
        <div className="chat-popup-container">
          <span>
            Are you sure you want to reject this chat? (It will be deleted)
          </span>
          <div className="chat-popup-btn-container">
            <div
              className="chat-popup-confirm-btn"
              onClick={() => rejectfunc(conversation, setPopup)}
            >
              Reject
            </div>
            <div
              className="chat-popup-cancel-btn"
              onClick={() => setRejectPopup(false)}
            >
              Cancel
            </div>
          </div>
        </div>
      )}
      {popup && (
        <div className="chat-popup-container">
          <span>{popupmsg}</span>
          <div className="chat-popup-btn-container">
            <div
              className="chat-popup-confirm-btn"
              onClick={() => popupfunc(conversation, setPopup)}
            >
              {popupconfirm}
            </div>
            <div
              className="chat-popup-cancel-btn"
              onClick={() => setPopup(false)}
            >
              Cancel
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversation;
