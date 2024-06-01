import { Send } from "lucide-react";
import { useContext, useState } from "react";

import { SocketContext } from "./contexts/SocketContext";

import { Message } from "./types/message";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const { onlineUsers, socket, messages } = useContext(SocketContext);

  function handleOnClick() {
    if (!inputValue) return;

    if (socket)
      socket.emit("sendMessage", {
        message: inputValue,
        user: "Amora",
        time: new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        id: Math.round(Math.random() * 10000000 + 1),
      });
  }

  return (
    <div className="flex items-center justify-center bg-[#F9FAFC] h-[100vh] w-full p-20">
      <div className="w-[800px] mx-auto h-full">
        <div className="mb-4">
          <p className="text-2xl font-medium">Design chat</p>
          <span className="text-gray font-light text-base">
            {onlineUsers} users connected
          </span>
        </div>
        <div className="w-full h-[600px] max-[900px]:h-[400px] overflow-y-auto mb-2">
          {messages.length !== 0 &&
            messages.map((message: Message) => (
              <div key={message.id} className="flex w-full">
                <div className="flex justify-start items-start py-2 px-4 flex-col bg-[#EEEEF8] rounded-md max-w-[450px] mt-2">
                  <span className="text-base font-medium text-[#7678ED]">
                    {message.user}
                  </span>
                  <span className="">{message.message}</span>
                  <span className="text-[10px] self-end">{message.time}</span>
                </div>
              </div>
            ))}
        </div>
        <div className="flex items-center justify-between  h-[60px] bg-[#EEEEF8] rounded-sm px-5">
          <input
            className="outline-none max-w-[500px] h-full p-4 bg-transparent text-[#7678ED]"
            placeholder="Your message"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Send
            color="#7678ED"
            className="cursor-pointer"
            onClick={() => handleOnClick()}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
