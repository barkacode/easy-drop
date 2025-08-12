import { FormBundle } from "@/lib/types/bundle";
import { FormProduct } from "@/lib/types/product";

export const mockProducts: FormProduct[] = [
  {
    type: "tshirt_adjusted",
    title: "T-SHIRT « DMVP »",
    description: `T-shirt col rond manches courtes. Coupe : Ajusté
    Modèle mixte
    Matière : 100% coton
    Grammage : 180g
    Print : face et dos
    - *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*`,
    ean: "1234567890123",
    picture: "/products/tshirt.png",
    weight: 250,
    quantity: 10,
    price: 29.99,
  },
  {
    type: "vinyl",
    title: "Album Collector Vinyle",
    description: "Vinyle édition limitée, 180g.",
    ean: "9876543210987",
    picture: "/products/vinyle.png",
    weight: 430,
    quantity: 5,
    price: 49.99,
  },
  {
    type: "hoodie_middle",
    title: "Hoodie « DMVP »",
    description: `Hoodie col rond manches longues. Coupe : Oversize
        Modèle mixte
        Matière : 80% coton, 20% polyester
        Grammage : 350g
        Print : face et dos
        - *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*`,
    ean: "1122334455667",
    picture: "/products/tshirt.png",
    weight: 600,
    quantity: 8,
    price: 59.99,
  },
];

export const mockBundles: FormBundle[] = [
  {
    title: "Bundle DMVP T-Shirt + Vinyle",
    description: "Pack exclusif avec un T-shirt et un vinyle collector.",
    products: ["T-SHIRT « DMVP »", "Album Collector Vinyle"],
    price: 69.99,
  },
  {
    title: "Bundle Hoodie + T-Shirt",
    description: "Pack avec un hoodie et un T-shirt DMVP.",
    products: ["Hoodie « DMVP »", "T-SHIRT « DMVP »"],
    price: 89.99,
  },
];
