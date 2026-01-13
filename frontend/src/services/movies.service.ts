import { http } from "./http";

export async function getMovie(id: string) {
  return http<Movie>(`/movies/${id}`);
}

export async function setWatchedMovie(id: string) {
  return http(`/movies/watched/${id}`, { method: "POST" });
}

export async function getWatchedMovies() {
  return http<Movie[]>(`/movies/watched/user`);
}
