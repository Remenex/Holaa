import { http } from "./http";

export async function getMovie(id: string) {
  return http<Movie>(`/movies/${id}`);
}

export async function getCategories() {
  return http<Category[]>("/categories");
}
