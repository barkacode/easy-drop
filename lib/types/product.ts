// Types de base pour les produits
export type Category = "on-demand" | "fabrication-ferme" | "phonographie";

export type ProductType = 
  // On-demand products
  | "tshirt_oversize" 
  | "tshirt_loose" 
  | "tshirt_adjusted"
  | "hat" 
  | "hoodie" 
  | "crewneck" 
  | "balaclava"
  | "mug" 
  | "tote"
  // Phonographie products
  | "cd" 
  | "vinyl" 
  | "cassette" 
  | "usb"
  // Fabrication-ferme (custom string)
  | string;

export type Color = "black" | "gray" | "white";

export type Size = "Taille unique" | "XS" | "S" | "M" | "L" | "XL" | "2XL" | "3XL";

export type PrintType = "dtf" | "serigraphie" | "broderie";

// Interface de base pour un produit
export interface BaseProduct {
  type: ProductType;
  title: string;
  description: string;
  weight: number;
  price: number;
  isIndividual: boolean;
  inPack: boolean;
  ean?: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

// Produit On-Demand
export interface OnDemandProduct extends BaseProduct {
  category: "on-demand";
  color: Color;
}

// Produit Fabrication Ferme
export interface FabricationFermeProduct extends BaseProduct {
  category: "fabrication-ferme";
  sizes?: Size[];
  sizeQuantities?: Record<Size, number>;
  print?: PrintType;
}

// Produit Phonographie
export interface PhonographieProduct extends BaseProduct {
  category: "phonographie";
  quantity?: number;
}

// Union type pour tous les produits
export type Product = OnDemandProduct | FabricationFermeProduct | PhonographieProduct;