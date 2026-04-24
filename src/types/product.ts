export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  notes: string[];
  image: string;
  category: "For Him" | "For Her" | "Unisex" | "Signature" | "Limited Edition" | "Pure Oils";
}

export interface CartItem extends Product {
  quantity: number;
}
