import { http } from "./http";

export async function getCategories() {
  return http<Category[]>("/categories");
}

export async function getCategoriesWithLimit(limit: number) {
  return http<Category[]>(`/categories?limit=${limit}`);
}
