import CreateProductForm from "@/components/forms/createProductForm";
import AddProduct from "@/components/Product/addProduct";
import ProductCreatedList from "@/components/Product/ProductCreatedList";
import { mockProducts } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full gap-[32px]">
        <ProductCreatedList products={mockProducts} />
        <div className="w-full flex justify-end ">
          <AddProduct />
        </div>
      </main>
    </div>
  );
}
