import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatUserCard from './ChatUserCard';

const ChatUserSearch = function ({
  setPopUp, allchats, blockedchats, pendingchats, thisUser, addChatRequest, socket, onlineUsers,
}) {
  const [userSearch, setUserSearch] = useState('');
  const [userResults, setUserResults] = useState([]);
  const [tempUserResults, setTempUserResults] = useState({});

  useEffect(() => {
    const searchUsers = async () => {
      if (userSearch == '') {
        setUserResults([]);
      } else {
        try {
          const token = window.localStorage.getItem('jwtToken');
          // const res = await axios.get("http://localhost:5000/api/v1/user/search/" + userSearch, {
          //   headers: {
          //     'Authorization': `Bearer ${token}`
          //   }
          // });
          const res = await axios.get(`${process.env.BASE_URI}/user/search/${userSearch}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTempUserResults({ query: userSearch, results: res.data.data });
        } catch (err) {
          console.log(err);
        }
      }
    };
    searchUsers();
  }, [userSearch]);

  // To ensure most recent results are show
  useEffect(() => {
    if (tempUserResults.query == userSearch) {
      setUserResults(tempUserResults.results);
    }
  }, [tempUserResults]);

  const createChat = async (user, message) => {
    try {
      const token = window.localStorage.getItem('jwtToken');
      const body = { receiverId: user._id };
      // const res = await axios.post("http://localhost:5000/api/v1/chat/", body, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      const res = await axios.post(`${process.env.BASE_URI}/chat/`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // update the pending chats with the result
      const createdchat = res.data.data;
      addChatRequest(res.data.data, user);
      if (message !== '') {
        const messageContent = {
          user: user._id,
          message,
          chatId: res.data.data._id,
        };
        const newMessage = await axios.post('http://localhost:5000/api/v1/chat_message/', messageContent, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // If the user is online, tell socket
        if (onlineUsers.find((u) => u.userId == user._id)) {
          socket.emit('createChat', ({ receiverId: user._id, chat: createdchat }));
        }
      } else {
      // If the user is online, tell socket
        if (onlineUsers.find((u) => u.userId == user._id)) {
          socket.emit('createChat', ({ receiverId: user._id, chat: createdchat }));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setUpUserResults = () => {
    const allusers = [];
    allchats.map((c) => allusers.push(c.users.find((m) => m._id !== thisUser._id)));
    pendingchats.map((c) => allusers.push(c.users.find((m) => m._id !== thisUser._id)));
    blockedchats.map((c) => allusers.push(c.users.find((m) => m._id !== thisUser._id)));

    const cards = () => {
      const cardsarr = [];
      if (userResults.length == 0) {
        return <span>Looks like there are no users that match the search criteria!</span>;
      }
      userResults.map((u) => {
        if (!allusers.find((m) => m._id == u._id) && thisUser._id != u._id) {
          cardsarr.push(
            <ChatUserCard u={u} createChat={createChat} key={u._id} setPopUp={setPopUp} />,
          );
        }
      });
      if (cardsarr.length == 0) {
        return <span>Looks like there are no users that match the search criteria!</span>;
      }

      return cardsarr;
    };

    if (userSearch == '') { return <span style={{ textAlign: 'center' }}>Search a user to start a chat!</span>; }

    const result = (
      <>
        {cards()}
      </>
    );
    if (result == <></>) {
      return <span>Looks like there are no users that match the search criteria!</span>;
    }

    return result;
  };

  return (
    <div
      className="chat-popup-container"
      style={{
        height: '70vh', width: '20%', padding: '10px', top: '60%',
      }}
    >
      <div className="user-search-container">
        <input placeholder="Search Users" className="chat-menu-input" value={userSearch} onChange={(e) => setUserSearch(e.target.value)} />
        <div
          style={{
            color: 'red', fontSize: '25px', marginTop: '-5px', cursor: 'pointer', justifySelf: 'center',
          }}
          onClick={() => setPopUp(false)}
        >
          x
        </div>
      </div>
      <div className="conversation-container" style={{ height: 'calc(100% - 60px)' }}>
        {setUpUserResults()}
      </div>
    </div>
  );
};

export default ChatUserSearch;
