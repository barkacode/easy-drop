import { Product, products } from "./products";

export function getPoidsByProductName(productName: string) {
  const product: Product = products[productName];
  if (product) {
    return product.poids;
  } else {
    throw new Error("Product not found");
  }
}

export function getDescriptionByProductName(productName: string) {
  const product = products[productName];
  if (product) {
    return product.description;
  } else {
    throw new Error("Product not found");
  }
}

export function getTypeByProductName(productName: string) {
  const product = products[productName];
  if (product) {
    return product.type;
  } else {
    throw new Error("Product not found");
  }
}

export function getNameByProductName(productName: string) {
  const product = products[productName];
  if (product) {
    return product.name;
  } else {
    throw new Error("Product not found");
  }
}
