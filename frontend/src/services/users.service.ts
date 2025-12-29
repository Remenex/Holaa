import { http } from "./http";

export async function getUsers() {
  return await http<User[]>("/users");
}
