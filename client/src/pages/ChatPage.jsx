import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../redux/slices/allUserSlice";

const ChatPage = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);

  const { users, isLoading } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="h-screen flex">

      {/* LEFT SIDEBAR */}
      <div className="w-1/4 bg-gray-800 text-white p-4">

        <h2 className="text-lg font-bold mb-4">Users</h2>

        {isLoading && <p>Loading...</p>}

        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className="p-2 mb-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
          >
            {user.name}
          </div>
        ))}

      </div>

      {/* RIGHT CHAT AREA */}
     <div className="flex-1 bg-gray-100 flex items-center justify-center">
  {selectedUser ? (
    <h1>{selectedUser.name}</h1>
  ) : (
    <h1>Select a user to start chat</h1>
  )}
</div>

    </div>
  );
};

export default ChatPage;