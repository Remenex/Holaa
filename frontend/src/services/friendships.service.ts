import { http } from "./http";

export async function getUserFriends() {
  return await http<User[]>(`/friendships/user`);
}

export async function deleteFriendship(friendId: string) {
  return await http<Response>(`/friendships/${friendId}`, { method: "DELETE" });
}
