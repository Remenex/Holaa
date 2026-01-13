import { http } from "./http";

export async function reactToMovie(movieId: string, type: ReactionType) {
  return await http("/reactions", {
    method: "POST",
    body: JSON.stringify({
      movieId,
      type,
    }),
  });
}

export async function removeReaction(movieId: string) {
  return await http(`/reactions/${movieId}`, {
    method: "DELETE",
  });
}

export async function getUserReactions() {
  return await http<Reaction[]>("/reactions/user");
}

export async function getUserReactionForMovie(movieId: string) {
  return await http<Reaction | null>(`/reactions/user/movie/${movieId}`);
}
