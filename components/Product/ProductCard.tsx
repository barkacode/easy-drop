import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FormProduct } from "@/types/formProduct";
import Image from "next/image";

export default function ProductCard({ product }: { product: FormProduct }) {
  return (
    <Card className="w-full h-full flex flex-col rounded-2xl shadow-md overflow-hidden">
      <div className="relative w-full h-48 bg-neutral-100">
        <img
          src={product.picture}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <CardContent>
        <CardTitle className="text-sm font-semibold ">
          {product.title}
        </CardTitle>
        
      </CardContent>

      
    </Card>
  );
}
