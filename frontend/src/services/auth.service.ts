import { http } from "./http";

export async function login(loginUser: LoginUser) {
  return await http<User>("/auth/login", {
    method: "POST",
    body: JSON.stringify(loginUser),
  });
}

export async function register(registerUser: CreateUser) {
  return await http<User>("/auth/register", {
    method: "POST",
    body: JSON.stringify(registerUser),
  });
}
