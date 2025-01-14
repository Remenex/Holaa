import CategoryItem from "@/components/lib/category-item";

interface Category {
  image: string;
  name: string;
}

const categories: Category[] = [
  { image: "/images/category1.png", name: "TRILERI" },
  { image: "/images/category1.png", name: "HORORI" },
  { image: "/images/category1.png", name: "KOMEDIJE" },
  { image: "/images/category1.png", name: "AKCIONI" },
  { image: "/images/category1.png", name: "MISTERIJE" },
  { image: "/images/category1.png", name: "DRAME" },
  { image: "/images/category1.png", name: "NAUCNI" },
  { image: "/images/category1.png", name: "ISTORIJSKI" },
];

export default function CategoryItems() {
  return (
    <div className="flex flex-wrap gap-10 justify-center p-10">
      {categories.map((category) => (
        <CategoryItem
          key={category.name}
          image={category.image}
          name={category.name}
        />
      ))}
    </div>
  );
}
