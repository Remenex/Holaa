import { CreateRoom, Room } from "@/app/types/room.type";
import { http } from "./http";

export async function getCreatorRoom() {
  return await http<Room>("/rooms/creator");
}

export async function getRoomMemebers(id: string) {
  return await http<User[]>(`/rooms/members/${id}`);
}

export async function createRoom(roomData: CreateRoom) {
  return await http<Room>("/rooms", {
    method: "POST",
    body: JSON.stringify(roomData),
  });
}
