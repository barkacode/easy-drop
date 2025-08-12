export interface FormProduct {
  type: string;
  title: string;
  description: string;
  ean: string;
  picture: string;
  weight: number;
  quantity?: number;
  price: number;
}
