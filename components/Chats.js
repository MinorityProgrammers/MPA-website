import React, { useState, useEffect, useRef } from "react";
import Conversation from "./Conversation";
import Message from "./ChatMessage";
import ChatUserSearch from "./ChatUserSearch";
import axios from "axios";
import { io } from "socket.io-client";
import Highlighter from "react-highlight-words";

const Chats = ({ data }) => {
  const [allchats, setAllchats] = useState([]);
  const [pendingchats, setPendingchats] = useState([]);
  const [blockedchats, setBlockedchats] = useState([]);
  const [chatlist, setChatlist] = useState("all");
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState({});
  const [blockPopUp, setBlockPopUp] = useState(false);
  const [expandInfo, setExpandInfo] = useState(false);
  const [chatSearch, setChatSearch] = useState("");
  const [searchPopUp, setSearchPopUp] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [tempResults, setTempResults] = useState({});
  const [socketContent, setSocketContent] = useState({});
  const [otherUsers, setOtherUsers] = useState([]);

  const user = data; // user id
  const messageRef = useRef(null);
  const messageReferences = {};

  const socket = useRef();

  const redirect = () => {
    window.location.href = "/auth";
  };

  useEffect(() => {
    // Redirect to login if bad token/user info
    const token = localStorage.getItem("jwtToken");
    const userInfo = localStorage.getItem("userInfo");
    if (token === null || userInfo === {}) {
      redirect();
    }

    socket.current = io("ws://localhost:8900");
    socket.current.on("connection", (msg) => {
      console.log(msg);
    });

    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });

    socket.current.on("getMessage", ({ chatId, text }) => {
      setSocketContent({
        type: "gotMessage",
        chatId: chatId,
        text: text,
      });
    });

    socket.current.on("blockedChat", ({ chat }) => {
      setSocketContent({
        type: "blockedChat",
        chat: chat,
      });
    });

    socket.current.on("unblockedChat", ({ chat }) => {
      setSocketContent({
        type: "unblockedChat",
        chat: chat,
      });
    });

    socket.current.on("addedToChat", ({ chat }) => {
      setSocketContent({
        type: "addedToChat",
        chat: chat,
      });
    });

    socket.current.on("rejectedChat", ({ chat }) => {
      setSocketContent({
        type: "rejectedChat",
        chat: chat,
      });
    });

    socket.current.on("acceptedChat", ({ chat }) => {
      setSocketContent({
        type: "acceptedChat",
        chat: chat,
      });
    });
  }, []);

  useEffect(() => {
    if (socketContent.type === "blockedChat") {
      let chat = socketContent.chat;
      chat.blocked = true;
      let newall = allchats.filter((c) => c._id != chat._id);
      setAllchats(newall);
      setBlockedchats([...blockedchats, chat]);
      if (currentChat._id == chat._id) {
        setCurrentChat(allchats[0]);
      }
      console.log("Chat been blocked");
    }

    if (socketContent.type === "unblockedChat") {
      let chat = socketContent.chat;
      chat.blocked = false;
      let newblocked = blockedchats.filter((c) => c._id != chat._id);
      setBlockedchats(newblocked);
      setAllchats([chat, ...allchats]);
      console.log("Chat been unblocked");
    }

    if (socketContent.type === "addedToChat") {
      let chat = socketContent.chat;
      setPendingchats([chat, ...pendingchats]);
      console.log("added to a chat");
    }

    if (socketContent.type === "rejectedChat") {
      let chat = socketContent.chat;
      let newpending = pendingchats.filter((c) => c._id != chat._id);
      setPendingchats(newpending);
      console.log("chat been rejected");
    }

    if (socketContent.type === "acceptedChat") {
      let chat = socketContent.chat;
      let newpending = pendingchats.filter((c) => c._id != chat._id);
      setPendingchats(newpending);
      let tempallchats = allchats;
      setAllchats([chat, ...tempallchats]);
      console.log("chat been accepted");
    }

    if (socketContent.type === "gotMessage") {
      let chatId = socketContent.chatId;
      let text = socketContent.text;
      if (currentChat?._id == chatId) {
        setMessages([...messages, text]);
      } else {
        let chatty = allchats.find((c) => c._id == chatId);
        let newAllchats = allchats.filter((c) => c._id != chatId);
        chatty = { ...chatty, newMessage: true };
        setAllchats([chatty, ...newAllchats]);
      }
      console.log("got a message");
    }
  }, [socketContent]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const token = window.localStorage.getItem("jwtToken");
        // let res = await axios.get("http://localhost:5000/api/v1/chat/", {
        const res = await axios.get(
          "http://koinstreet-learn-api.herokuapp.com/api/v1/chat/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllchats(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getPendingChats = async () => {
      try {
        const token = window.localStorage.getItem("jwtToken");
        // let res = await axios.get("http://localhost:5000/api/v1/chat/pending", {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        const res = await axios.get(
          "http://koinstreet-learn-api.herokuapp.com/api/v1/chat/pending",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPendingchats(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getBlockedChats = async () => {
      try {
        const token = window.localStorage.getItem("jwtToken");
        // const res = await axios.get("http://localhost:5000/api/v1/chat/block", {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        const res = await axios.get(
          "http://koinstreet-learn-api.herokuapp.com/api/v1/chat/block",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBlockedchats(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getChats();
    getPendingChats();
    getBlockedChats();

    if (user._id) {
      socket.current.emit("addUser", user._id);
    }
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {
        try {
          const token = window.localStorage.getItem("jwtToken");
          const res = await axios.get(
            "http://koinstreet-learn-api.herokuapp.com/api/v1/chat_message/" +
              currentChat._id,
            {
              // const res = await axios.get("http://localhost:5000/api/v1/chat_message/" + currentChat._id, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setMessages(res.data.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getMessages();
    if (currentChat)
      setRecipient(currentChat.users.find((m) => m._id !== user._id));
  }, [currentChat]);

  useEffect(() => {
    const searchChat = async () => {
      if (chatSearch == "") {
        setSearchResults(null);
        return;
      } else {
        try {
          const token = window.localStorage.getItem("jwtToken");
          // const res = await axios.get("http://localhost:5000/api/v1/chat/search/" + chatSearch, {
          //   headers: {
          //     'Authorization': `Bearer ${token}`
          //   }
          // });
          const res = await axios.get(
            "http://koinstreet-learn-api.herokuapp.com/api/v1/chat/search/" +
              chatSearch,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTempResults({ query: chatSearch, results: res.data.data });
        } catch (err) {
          console.log(err);
        }
      }
    };
    searchChat();
  }, [chatSearch]);

  // To ensure correct results are shown
  useEffect(() => {
    if (tempResults.query == chatSearch) {
      setSearchResults(tempResults.results);
    }
  }, [tempResults]);

  useEffect(() => {
    messageRef.current?.scrollIntoView({
      behavior: "auto",
      block: "end",
      inline: "nearest",
    });
  }, [messages]);

  const deleteMessage = () => {
    console.log("deleteclicked");
  };

  const blockUser = async () => {
    try {
      let chatid = currentChat._id;
      let body = { chatid: chatid };
      const token = window.localStorage.getItem("jwtToken");
      // await axios.put("http://localhost:5000/api/v1/chat/block", body, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // })
      await axios
        .put(
          "http://koinstreet-learn-api.herokuapp.com/api/v1/chat/block",
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // If the user is online, tell socket
          if (onlineUsers.find((u) => u.userId == recipient._id)) {
            socket.current.emit("blockUser", {
              receiverId: recipient._id,
              chat: currentChat,
            });
          }

          // update all chats and blocked chats
          let newBlocked = allchats.find((c) => c._id == chatid);
          let newAllchats = allchats.filter((c) => c._id != chatid);
          setAllchats(newAllchats);
          newBlocked.blocked = true;
          newBlocked.blocking_user = user._id;
          setBlockedchats([newBlocked, ...blockedchats]);
          setBlockPopUp(false);
          setCurrentChat(null);
          if (expandInfo) {
            setExpandInfo(false);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const addChatRequest = (chat, user2) => {
    let temp = [user, user2];
    chat.users = temp;
    setPendingchats([chat, ...pendingchats]);
  };
  const acceptChat = async (chat, setpopUp) => {
    try {
      let body = { chatid: chat._id };
      const token = window.localStorage.getItem("jwtToken");
      await axios
        .put("http://koinstreet-learn-api.herokuapp.com/api/v1/chat/", body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // If the user is online, tell socket
          let receiver = chat.users.find((m) => m._id !== user._id);
          if (onlineUsers.find((u) => u.userId == receiver._id)) {
            socket.current.emit("acceptChat", {
              receiverId: receiver._id,
              chat: chat,
            });
          }

          // update all chats and pending chats
          let newPendingchats = pendingchats.filter((c) => c._id != chat._id);
          setPendingchats(newPendingchats);
          chat.accepted = true;
          setAllchats([chat, ...allchats]);
          setpopUp(false);
          setCurrentChat(null);
        });
      if (expandInfo) {
        setExpandInfo(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const rejectChat = async (chat, setpopUp) => {
    try {
      const token = window.localStorage.getItem("jwtToken");
      // await axios.delete("http://localhost:5000/api/v1/chat/" + chat._id, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // })
      await axios
        .delete(
          "http://koinstreet-learn-api.herokuapp.com/api/v1/chat/" + chat._id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // If the user is online, tell socket
          let receiver = chat.users.find((m) => m._id !== user._id);
          if (onlineUsers.find((u) => u.userId == receiver._id)) {
            socket.current.emit("rejectChat", {
              receiverId: receiver._id,
              chat: chat,
            });
          }

          // update pending chats
          let newPendingchats = pendingchats.filter((c) => c._id != chat._id);
          setPendingchats(newPendingchats);
          setpopUp(false);
          setCurrentChat(null);
        });
      if (expandInfo) {
        setExpandInfo(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const unblockChat = async (chat, setpopup) => {
    try {
      let body = { chatid: chat._id };
      const token = window.localStorage.getItem("jwtToken");
      // await axios.put("http://localhost:5000/api/v1/chat/block", body, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // })
      await axios
        .put(
          "http://koinstreet-learn-api.herokuapp.com/api/v1/chat/block",
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // If the user is online, tell socket
          let receiver = chat.users.find((m) => m._id !== user._id);
          if (onlineUsers.find((u) => u.userId == receiver._id)) {
            socket.current.emit("unblockUser", {
              receiverId: receiver._id,
              chat: chat,
            });
          }

          // update all chats and blocked chats
          let newBlockedchats = blockedchats.filter((c) => c._id != chat._id);
          setBlockedchats(newBlockedchats);
          chat.blocked = false;
          chat.blocking_user = null;
          setAllchats([chat, ...allchats]);
          setpopup(false);
          setCurrentChat(null);
        });
      if (expandInfo) {
        setExpandInfo(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      user: user._id,
      message: newMessage,
      chatId: currentChat._id,
    };

    const receiverId = currentChat.users.find(
      (member) => member._id !== user._id
    );

    try {
      const token = window.localStorage.getItem("jwtToken");
      // const res = await axios.post("http://localhost:5000/api/v1/chat_message/", message, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      const res = await axios.post(
        "http://koinstreet-learn-api.herokuapp.com/api/v1/chat_message/",
        message,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // send the new message to the socket
      socket.current.emit("sendMessage", {
        chatId: currentChat._id,
        receiverId: receiverId._id,
        text: res.data.data,
      });

      setMessages([...messages, res.data.data]);
      setNewMessage("");
      messageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const setUpChats = () => {
    if (chatlist === "all") {
      if (allchats === []) {
        return (
          <span style={{ textAlign: "center" }}>
            You don't have any chats, click the create chat button to start one!
          </span>
        );
      } else {
        return (
          <>
            {allchats?.map((c) => {
              return (
                <div
                  key={c._id}
                  onClick={() => {
                    setExpandInfo(false);
                    if (c.newMessage) {
                      c.newMessage = false;
                    }
                    setCurrentChat(c);
                  }}
                >
                  <Conversation
                    conversation={c}
                    currentUser={data}
                    type={"all"}
                    c={currentChat}
                  />
                </div>
              );
            })}
          </>
        );
      }
    }
    if (chatlist === "blocked") {
      if (blockedchats?.length === 0) {
        return (
          <span style={{ textAlign: "center" }}>
            You don't have any blocked chats!
          </span>
        );
      } else {
        return (
          <>
            {blockedchats?.map((c) => {
              return (
                <div
                  key={c._id}
                  onClick={() => {
                    setExpandInfo(false);
                    setCurrentChat(c);
                  }}
                >
                  <Conversation
                    conversation={c}
                    currentUser={data}
                    type={"blocked"}
                    c={currentChat}
                    unblockfunc={unblockChat}
                  />
                </div>
              );
            })}
          </>
        );
      }
    }
    if (chatlist === "pending") {
      if (pendingchats?.length === 0) {
        return (
          <span style={{ textAlign: "center" }}>
            You don't have any pending chats!
          </span>
        );
      } else {
        return (
          <>
            {pendingchats?.map((c) => {
              return (
                <div
                  key={c._id}
                  onClick={() => {
                    setExpandInfo(false);
                    setCurrentChat(c);
                  }}
                >
                  <Conversation
                    conversation={c}
                    currentUser={data}
                    type={"pending"}
                    c={currentChat}
                    acceptfunc={acceptChat}
                    rejectfunc={rejectChat}
                  />
                </div>
              );
            })}
          </>
        );
      }
    }
  };

  const setUpResults = () => {
    let chatRes;
    let messageRes;
    // console.log("search query in results formatting: "+chatSearch)
    // console.log(searchResults)
    if (searchResults && searchResults.chats.length > 0) {
      chatRes = (
        <>
          <span style={{ alignSelf: "center" }}>Chats</span>
          {searchResults.chats.map((c) => {
            return (
              <div
                key={c._id}
                onClick={() => {
                  setExpandInfo(false);
                  setCurrentChat(c);
                }}
              >
                <Conversation
                  conversation={c}
                  currentUser={data}
                  type={"all"}
                  c={currentChat}
                />
              </div>
            );
          })}
        </>
      );
    }
    if (searchResults && searchResults.messages.length > 0) {
      messageRes = (
        <>
          <span style={{ alignSelf: "center" }}>Messages</span>
          {searchResults.messages.map((m) => {
            let muser = m.chat.users.find((m) => m._id !== user._id);
            return (
              <div
                key={m._id}
                onClick={() => {
                  setExpandInfo(false);
                  setCurrentChat(m.chat);
                  messageReferences[m._id]?.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "nearest",
                  });
                }}
              >
                <div className="conversation">
                  <img
                    src={
                      muser.profilePicture || `../../assets/images/profile.png`
                    }
                    className="conversation-img"
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span className="conversation-brief">
                      {muser?.firstName} {muser?.lastName}
                    </span>
                    <Highlighter
                      textToHighlight={m.message}
                      searchWords={[chatSearch]}
                      highlightStyle={{
                        backgroundColor: "#ffc10588",
                        padding: "0",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </>
      );
    }
    if (
      searchResults &&
      searchResults.messages.length == 0 &&
      searchResults.chats.length == 0
    ) {
      chatRes = (
        <span style={{ alignSelf: "center" }}>
          There are no chats or messages that match the search
        </span>
      );
    }
    return (
      <>
        {chatRes}
        {messageRes}
      </>
    );
  };

  return (
    <div id="chat">
      <div className="chat-menu">
        <div className="chat-menu-btn-container">
          <button
            className="chat-menu-btn"
            onClick={() => setChatlist("all")}
            style={
              chatlist === "all"
                ? {
                    backgroundColor: "#C4C4C4",
                    color: "#000000",
                    border: "1px solid #000000",
                  }
                : {}
            }
          >
            All
          </button>
          <button
            className="chat-menu-btn"
            onClick={() => setChatlist("pending")}
            style={
              chatlist === "pending"
                ? {
                    backgroundColor: "#C4C4C4",
                    color: "#000000",
                    border: "1px solid #000000",
                  }
                : {}
            }
          >
            Pending
          </button>
          <button
            className="chat-menu-btn"
            onClick={() => setChatlist("blocked")}
            style={
              chatlist === "blocked"
                ? {
                    backgroundColor: "#C4C4C4",
                    color: "#000000",
                    border: "1px solid #000000",
                  }
                : {}
            }
          >
            Blocked
          </button>
          <div
            className="chat-menu-newchat-btn"
            onClick={() => {
              setSearchPopUp(!searchPopUp);
            }}
            style={searchPopUp ? { backgroundColor: "#151371" } : {}}
          >
            <i className="fas fa-pen newchat-pen"></i>
          </div>
        </div>
        <input
          placeholder="Search Chats"
          className="chat-menu-input"
          value={chatSearch}
          onChange={(e) => setChatSearch(e.target.value)}
        />
        <div className="conversation-container">
          {chatSearch == "" ? setUpChats() : setUpResults()}
        </div>
      </div>
      {/* pop up for searching users */}
      {searchPopUp && (
        <ChatUserSearch
          setPopUp={setSearchPopUp}
          allchats={allchats}
          blockedchats={blockedchats}
          pendingchats={pendingchats}
          thisUser={user}
          addChatRequest={addChatRequest}
          socket={socket.current}
          onlineUsers={onlineUsers}
        />
      )}
      <div
        className="chat-box"
        style={expandInfo ? { flex: "5.5" } : { flex: "8.5" }}
      >
        {currentChat ? (
          <>
            <div className="chat-header">
              <img
                src={
                  recipient.profilePicture || `../../assets/images/profile.png`
                }
                className="chat-header-img"
              />
              <span className="chat-header-name">
                {recipient.firstName} {recipient.lastName}
              </span>
              {!expandInfo && (
                <div
                  className="chat-expand-box"
                  onClick={() => setExpandInfo(true)}
                >
                  <span className="chat-expand-info">Expand my info</span>
                  <i className="kipso-icon-right-arrow chat-expand-arrow"></i>
                </div>
              )}
            </div>
            <div className="chat-box-top">
              {messages.map((m) => {
                const own = m.user === user._id || m.user._id === user._id;
                return (
                  <div
                    key={m._id}
                    ref={(el) => (messageReferences[m._id] = el)}
                  >
                    <Message
                      user={m.user}
                      message={m}
                      own={own}
                      deleteMessage={deleteMessage}
                    />
                  </div>
                );
              })}
              <div ref={messageRef} />
            </div>
            {/* Don't show the text box if the chat is blocked or not accepted */}
            {!currentChat?.blocked && currentChat?.accepted && (
              <div className="chat-box-bottom">
                <textarea
                  className="chat-input"
                  placeholder="Aa"
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chat-submit-button" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            )}
          </>
        ) : (
          <span>Open a chat to send a message, or create a new chat!</span>
        )}
      </div>
      <div
        className="chat-info"
        style={expandInfo ? { display: "flex" } : { display: "none" }}
      >
        <div
          className="chat-info-hide-box"
          onClick={() => setExpandInfo(false)}
        >
          <i
            className="kipso-icon-left-arrow chat-expand-arrow"
            style={{ fontSize: "18px" }}
          ></i>
          <div className="chat-info-hide">Hide info</div>
        </div>
        <img
          src={recipient.profilePicture || `../../assets/images/profile.png`}
          className="chat-info-img"
        />
        <span className="chat-info-name">
          {recipient.firstName} {recipient.lastName}
        </span>
        {blockPopUp && (
          <div className="chat-popup-container">
            <span>
              Are you sure you want to block {recipient.firstName}{" "}
              {recipient.lastName}?
            </span>
            <div className="chat-popup-btn-container">
              <div
                className="chat-popup-confirm-btn"
                onClick={() => {
                  blockUser();
                }}
              >
                Block
              </div>
              <div
                className="chat-popup-cancel-btn"
                onClick={() => setBlockPopUp(false)}
              >
                Cancel
              </div>
            </div>
          </div>
        )}
        <div className="chat-info-btn-container">
          <div style={{ display: "flex", flexDirection: "row" }}>
            {user.GithubLink && (
              <a href={user.GithubLink} target="_blank">
                <i className="fab fa-github chat-info-icons"></i>
              </a>
            )}
            {user.LinkedinLink && (
              <a href={user.LinkedinLink} target="_blank">
                <i
                  className="fab fa-linkedin chat-info-icons"
                  style={{ marginLeft: "25px" }}
                ></i>
              </a>
            )}
            {user.FacebookLink && (
              <a href={user.FacebookLink} target="_blank">
                <i
                  className="fab fa-facebook chat-info-icons"
                  style={{ marginLeft: "25px" }}
                ></i>
              </a>
            )}
            {/* Don't show block button if the chat is already blocked or if it isnt accepted */}
            {!currentChat?.blocked && currentChat?.accepted && (
              <div
                className="chat-info-blocked-btn"
                onClick={() =>
                  blockPopUp ? setBlockPopUp(false) : setBlockPopUp(true)
                }
              >
                Block
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            color: "black",
            margin: "10px",
          }}
        >
          <div style={{ flex: "1", fontWeight: "600" }}>
            {recipient.userName && (
              <>
                Username <br />
              </>
            )}
            {/* Add privacy check for emails */}
            Email
            <br />
          </div>
          <div style={{ flex: "1" }}>
            {recipient.userName && (
              <>
                {" "}
                {recipient.userName} <br />
              </>
            )}
            {recipient.email}
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
