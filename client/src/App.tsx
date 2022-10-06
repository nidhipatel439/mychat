import React, { useState } from "react";
import { BsXCircle } from "react-icons/bs";
import { io } from "socket.io-client";
import { Chat } from "./Chat";

const socket = io(window.location.origin);

export const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <>
      <div className="flex flex-col md:h-screen justify-start mt-16 md:mt-0 md:justify-center w-full max-w-lg mx-auto px-4 md:px-0">
        {!showChat ? (
          <>
            <div className="bg-gray-700 text-white text-center p-2">
              <p className="text-2xl">MyChat</p>
            </div>
            <div>
              <div className="border-2 border-gray-700 border-t-0 text-center p-4">
                <input
                  type="text"
                  name="name"
                  className="w-full block my-2 border border-gray-700 p-2 rounded"
                  placeholder="John..."
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
                <input
                  type="text"
                  name="roomid"
                  className="w-full block my-2 border border-gray-700 p-2 rounded"
                  placeholder="Room ID..."
                  onChange={(event) => {
                    setRoom(event.target.value);
                  }}
                />
                <button
                  className="bg-gray-700 text-white py-2 px-6 my-2 hover:bg-gray-600"
                  onClick={joinRoom}
                >
                  Join A Room
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gray-700 text-white text-center p-2 flex justify-between items-center">
              <p className="text-2xl">Live chat</p>
              <button onClick={() => setShowChat(false)}>
                <BsXCircle />
              </button>
            </div>
            <Chat socket={socket} username={username} room={room} />
          </>
        )}
      </div>
      <div className="absolute bottom-0 right-0 left-0 border-t-2 border-gray-700 text-center p-1">
        <p>&copy; Nidhi Patel 2022</p>
      </div>
    </>
  );
};
