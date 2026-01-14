"use client";
import CategoryItem from "@/components/lib/category-item";
import { getCategories } from "@/services/categories.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CategoryItems() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const handlecategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res);
      } catch (err) {
        toast.error("Greska prilikom pribavljanja kategorija");
      }
    };
    handlecategories();
  }, []);

  return (
    <div className="flex flex-wrap gap-10 justify-center p-10">
      {categories.map((category) => (
        <CategoryItem
          key={category.name}
          id={category._id}
          image={`http://localhost:8000/uploads/categories/images/${category._id}.jpg`}
          name={category.name}
        />
      ))}
    </div>
  );
}
