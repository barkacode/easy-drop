import { FormProduct } from "@/types/formProduct";
import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export default function ProductCreatedList({
  products,
}: {
  products: FormProduct[];
}) {
  return (
    <div className="flex flex-col gap-1 ">
      <h2 className="text-lg font-semibold ">Mes fiches produits</h2>
      <div className="flex items-center justify-center w-full">
        <Carousel className="flex flex-col w-5/6 ">
          <CarouselContent>
            {products.map((product, index) => (
              <CarouselItem key={index} className="basis-1/2  md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
      </div>
    </div>
  );
}
