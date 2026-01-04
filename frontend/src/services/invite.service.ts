import { http } from "./http";

export async function getUserInvites(id: string) {
  return await http<Invite[]>(`/invites/${id}`);
}

export async function createInvite(inviteData: CreateInvite) {
  return await http<User>("/invites", {
    method: "POST",
    body: JSON.stringify(inviteData),
  });
}

export async function respondInvite(inviteId: string, status: string) {
  return await http<Invite>(`/invites/${inviteId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
