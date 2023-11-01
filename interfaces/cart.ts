import { Item } from "./item";

export class Cart {
  cartId!: number;
  userId!: number;
  items!: Item[];
  totalPrice!: number;
}
