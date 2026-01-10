"use client";
import { Search } from "@/components/ui/search";
import { AnimatedTooltip } from "@/components/ui/tooltip";
import { createMessage, getRoomMessages } from "@/services/messages.service";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import Icon from "../icon";
import UserAvatar from "../user-avatar";

type Props = {
  chatUsersBase: User[];
  room: Room;
  user: User;
  roomSocket: Socket;
  onClose: () => void;
};

const placeholders = [
  "Unesite poruku...",
  "Posaljite prijateljima poruku",
  "Kako vam se cini ovaj film?",
];

export default function Chat({
  chatUsersBase,
  room,
  user,
  roomSocket,
  onClose,
}: Props) {
  const [chatUsers] = useState(chatUsersBase);
  const [messages, setMessages] = useState<Message[]>([]);
  const [msgText, setMsgText] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!room) return;
    getRoomMessages(room._id).then((res) => {
      setMessages(res);
    });
  }, [room]);

  useEffect(() => {
    const handler = (message: Message) => handleNewMessage(message);
    roomSocket.on("room:new-message", handler);
    return () => {
      roomSocket.off("room:new-message", handler);
    };
  }, [roomSocket]);

  const handleNewMessage = (message: Message) => {
    setMessages((prev) => {
      if (prev.find((m) => m._id === message._id)) return prev;
      return [...prev, message];
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsgText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: CreateMessage = {
      fromUserId: "",
      roomId: room._id,
      text: msgText,
    };

    createMessage(data).then((m) => handleNewMessage(m));
  };

  useEffect(() => {
    messagesEndRef.current?.scrollTo({
      top: messagesEndRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full bg-dark-gray px-5 py-3 flex items-center justify-between rounded-t-[27px]">
        <div className="flex">
          <AnimatedTooltip users={chatUsers} />
        </div>
        <Icon
          icon="remove"
          iconSize={40}
          variation="cursor-pointer"
          onClick={onClose}
        />
      </div>
      <div className="h-full w-full rounded-b-[30px] flex flex-col-reverse px-5 py-8">
        <Search
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
          light={true}
        />
        <div
          ref={messagesEndRef}
          className="w-full max-h-[340px] mb-8 flex flex-col gap-4 overflow-y-auto"
        >
          {messages && messages.length > 0 ? (
            messages.map((m) => {
              return m.fromUserId._id !== user._id ? (
                <div className="flex items-start justify-start" key={m._id}>
                  <UserAvatar
                    firstname={m.fromUserId.firstName}
                    lastname={m.fromUserId.lastName}
                    sizeRem={2.375}
                  />
                  <div className="w-full ml-2 max-w-[170px] rounded-xl p-3 shadow-xl text-black border">
                    {m.text}
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-end" key={m._id}>
                  <div className="w-full ml-2 max-w-[170px] rounded-xl p-3 shadow-xl text-white bg-[#c01e1e]">
                    {m.text}
                  </div>
                </div>
              );
            })
          ) : (
            <p>Trenutno nema poruka</p>
          )}
        </div>
      </div>
    </div>
  );
}
