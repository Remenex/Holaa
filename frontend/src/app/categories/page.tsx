import CategoryItems from "@/components/li/category-items";
import Footer from "@/components/li/footer";
import Header from "@/components/li/header";
import BgImageOverlay from "@/components/lib/bg-image";

export default function CategoriesPage() {
  return (
    <div className="w-full">
      <Header />
      <BgImageOverlay
        bigTitle="KATEGORIJE"
        linkTitle="PRETRAZUJ PO KATEGORIJAMA"
      />
      <div>
        <div className="flex justify-center items-center py-[100px]">
          <h1 className="text-5xl">PRETRAZUJ PO KATEGORIJAMA</h1>
        </div>
        <section className="categories">
          <CategoryItems />
        </section>
      </div>
      <Footer/>
    </div>
  );
}
