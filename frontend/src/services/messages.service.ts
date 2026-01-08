import { http } from "./http";

export async function getRoomMessages(roomId: string) {
  return await http<Message[]>(`/messages/room/${roomId}`);
}

export async function getMessage(messageId: string) {
  return await http<Message>(`/messages/${messageId}`);
}

export async function createMessage(messageData: CreateMessage) {
  return await http<Message>("/messages", {
    method: "POST",
    body: JSON.stringify(messageData),
  });
}

export async function updateMessage(messageId: string, text: string) {
  return await http<Message>(`/messages/${messageId}`, {
    method: "PATCH",
    body: JSON.stringify({ text }),
  });
}

export async function deleteMessage(messageId: string) {
  return await http<Message>(`/messages/${messageId}`, {
    method: "DELETE",
  });
}
