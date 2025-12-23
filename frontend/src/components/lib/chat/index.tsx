"use client";
import { Search } from "@/components/ui/search";
import { AnimatedTooltip } from "@/components/ui/tooltip";
import Image from "next/image";
import { useState } from "react";
import { CurrentlyWatching } from "../../../app/types/CurrentlyWatching";
import { Message } from "../../../app/types/Message";
import Icon from "../icon";

type Props = {
  chatUsersBase: CurrentlyWatching[];
  onClose: () => void;
};

const placeholders = [
  "Unesite poruku...",
  "Posaljite prijateljima poruku",
  "Kako vam se cini ovaj film?",
];

const messagesBase = [
  {
    id: 1,
    image: "/images/aleksa.png",
    from: "Aleksa Jovanovic",
    message: "Ovo je poruka koju sam je poslao aleksa",
  } as Message,
  {
    id: 2,
    message: "Ovo je poruka koju sam je poslao ja",
  } as Message,
  {
    id: 3,
    image: "/images/aleksa.png",
    from: "Aleksa Jovanovic",
    message: "Ovo je poruka koju sam je poslao aleksa 2",
  } as Message,
];

export default function Chat({ chatUsersBase, onClose }: Props) {
  const [chatUsers] = useState(chatUsersBase);
  const [messages] = useState(messagesBase);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full bg-dark-gray px-5 py-3 flex items-center justify-between rounded-t-[27px]">
        <div className="flex">
          <AnimatedTooltip items={chatUsers} />
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
        <div className="w-full mb-8 flex flex-col gap-4">
          {messages.map((mess) => {
            return mess.from ? (
              <div className="flex items-start justify-start" key={mess.id}>
                <Image
                  src={mess.image!}
                  width={38}
                  height={38}
                  alt={mess.from}
                />
                <div className="w-full ml-2 max-w-[170px] rounded-xl p-3 shadow-xl text-black border">
                  {mess.message}
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-end" key={mess.id}>
                <div className="w-full ml-2 max-w-[170px] rounded-xl p-3 shadow-xl text-white bg-[#c01e1e]">
                  {mess.message}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
