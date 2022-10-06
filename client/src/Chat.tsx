import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { BsFillPlayCircleFill } from "react-icons/bs";

export const Chat: React.FC<{
  room: string;
  username: string;
  socket: Socket;
}> = ({ room, username, socket }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<
    {
      room: string;
      author: string;
      message: string;
      time: string;
    }[]
  >([]);

  const sendMessage = () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  socket.on("receive_message", (data) => {
    setMessageList([...messageList, data]);
  });

  return (
    <>
      <div className="border-2 border-gray-700">
        <div className="md:h-72 h-96 overflow-y-auto flex flex-col p-2">
          {messageList.map((messageContent, index) => {
            return (
              <div
                key={index}
                className={` w-full py-1 ${
                  username === messageContent.author
                    ? "text-right"
                    : "text-left"
                }`}
              >
                <p className="font-bold capitalize">
                  {username === messageContent.author
                    ? "You"
                    : messageContent.author}
                </p>
                <p
                  className={`${
                    username === messageContent.author
                      ? "bg-gray-700 pl-4 pr-2 text-white"
                      : "bg-slate-300 pr-4 pl-2 text-black"
                  }   inline-block py-1 rounded`}
                >
                  {messageContent.message}
                </p>
                <p className="text-light italic text-sm">
                  {messageContent.time}
                </p>
              </div>
            );
          })}
        </div>
        <div className="border-t-2 border-gray-700 flex justify-between items-center">
          <input
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            className="p-2 w-full focus:outline-none"
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button
            className="p-2 border-l-2 border-gray-700 text-gray-700 hover:text-gray-600"
            onClick={sendMessage}
          >
            <BsFillPlayCircleFill size={25} />
          </button>
        </div>
      </div>
    </>
  );
};
