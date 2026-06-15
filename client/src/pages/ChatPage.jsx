import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../redux/slices/allUserSlice";
import { fetchMessages, sendMessage } from "../redux/slices/messageSlice";
import socket from "../socket";

const ChatPage = () => {
  const dispatch = useDispatch();

  const [selectedUser, setSelectedUser] = useState(null);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
const [typingUser, setTypingUser] = useState(null);

  const { users, isLoading } = useSelector((state) => state.allUsers);
  const { user } = useSelector((state) => state.auth);
  const { messages, isLoading: msgLoading } = useSelector(
    (state) => state.messages
  );

  // load users
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // socket register
  useEffect(() => {
    if (user?._id) {
      socket.emit("addUser", user._id);
    }
  }, [user]);

  // listen messages
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      dispatch(sendMessage.fulfilled(data));
    });

    return () => socket.off("receiveMessage");
  }, [dispatch]);

  // fetch messages (THUNK USE)
  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(fetchMessages(selectedUser._id));
    }
  }, [selectedUser, dispatch]);

  // send message (THUNK USE)
  const handleSend = () => {
    if (!text.trim() || !selectedUser) return;

    dispatch(
      sendMessage({
        receiverId: selectedUser._id,
        message: text,
      })
    ).then((res) => {
      socket.emit("sendMessage", {
        ...res.payload,
        receiverId: selectedUser._id,
      });
    });

    setText("");
  };



  useEffect(() => {
  socket.on("typing", (data) => {
    setIsTyping(true);
    setTypingUser(data.senderId);
  });

  socket.on("stopTyping", () => {
    setIsTyping(false);
    setTypingUser(null);
  });

  return () => {
    socket.off("typing");
    socket.off("stopTyping");
  };
}, []);

const handleTyping = (e) => {
  setText(e.target.value);

  socket.emit("typing", {
    senderId: user._id,
    receiverId: selectedUser._id,
  });

  clearTimeout(window.typingTimer);

  window.typingTimer = setTimeout(() => {
    socket.emit("stopTyping", {
      senderId: user._id,
      receiverId: selectedUser._id,
    });
  }, 1000);
};

  return (
    <div className="h-screen flex">

      {/* SIDEBAR */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Users</h2>

        {isLoading && <p>Loading...</p>}

        {users?.map((u) => (
          <div
            key={u._id}
            onClick={() => setSelectedUser(u)}
            className={`p-2 mb-2 cursor-pointer ${
              selectedUser?._id === u._id ? "bg-gray-600" : "bg-gray-700"
            }`}
          >
            {u.name}
          </div>
        ))}
      </div>

      {/* CHAT */}
      <div className="flex-1 flex flex-col bg-gray-100">

        <div className="p-3 bg-white border-b">
          {selectedUser ? selectedUser.name : "Select user"}
        </div>

        {/* messages */}
        <div className="flex-1 p-3 overflow-y-auto">
          {msgLoading ? (
            <p>Loading...</p>
          ) : messages.length === 0 ? (
            <p>No messages</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`p-2 w-fit mb-2 ${
                  msg.senderId === user?._id
                    ? "bg-blue-600 text-white ml-auto"
                    : "bg-gray-300"
                }`}
              >
                {msg.message}
              </div>
            ))
          )}
        </div>
{isTyping && (
  <p className="text-sm text-gray-500 italic p-2">
    typing...
  </p>
)}
        {/* input */}
        <div className="p-3 flex gap-2">
          <input
            value={text}
            onChange={handleTyping}
            className="border flex-1 p-2"
            placeholder="message..."
          />

          <button onClick={handleSend} className="bg-blue-600 px-4 text-white">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;