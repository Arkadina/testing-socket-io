import React, { createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Message } from "../types/message";

type SocketContextType = {
  socket: Socket | null;
  onlineUsers: number | null;
  messages: Message[];
};

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: null,
  messages: [],
});

type ParamsType = {
  children: React.ReactNode;
};

export const SocketContextProvider = ({ children }: ParamsType) => {
  const [socket, setSocket] = useState<Socket>();
  const [onlineUsers, setOnlineUsers] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("totalUsers", (data) => {
      setOnlineUsers(data);
    });

    socket.on("previousMessage", (data) => {
      setMessages([...data]);
    });

    socket.on("receivedMessage", (data: Message[]) => {
      setMessages([...data]);
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
      socket.off("receivedMessage");
      socket.off("previousMessage");
      socket.off("totalUsers");
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket: socket || null, onlineUsers, messages }}
    >
      {children}
    </SocketContext.Provider>
  );
};
