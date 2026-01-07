import { http } from "./http";

export async function getAuthUser() {
  return await http<User>("/auth/me");
}

export async function getUsers() {
  return await http<User[]>("/users");
}
