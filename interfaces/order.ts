import { Item } from "./item";
import { OrderStatus } from "~/enums/status";
import { PaymentMethod } from "~/enums/paymentMethod";

export interface Order {
  id: number;
  orderNumber: string;
  items: Item[];
  orderDate: string;
  status: OrderStatus;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
}

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}
