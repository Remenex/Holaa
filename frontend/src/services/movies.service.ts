import { http } from "./http";

export async function getMovie(id: string) {
  return http<Movie>(`/movies/${id}`);
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
