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

export async function getMovies() {
  return http<Movie[]>("/movies");
}

export async function getCategories() {
  return http<Category[]>("/categories");
}

export async function getMoviesByCategory(id: string) {
  return http<Movie[]>(`/movies/by-category/${id}`);
}

export async function getLatestMovies() {
  return http<Movie[]>("/movies/latest/10");
}

export async function getTopRatedMovies() {
  return http<Movie[]>(`/movies/top-rated?limit=10`);
}
