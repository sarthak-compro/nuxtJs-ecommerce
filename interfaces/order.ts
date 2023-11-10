import { Item } from "./item";

export interface Order {
  id: number;
  orderNumber: string;
  items: Item[];
  orderDate: Date;
  status: OrderStatus;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
}

enum OrderStatus {
  Pending = 'pending',
  Shipped = 'shipped',
  Delivered = 'delivered',
  Canceled = 'canceled',
}

enum PaymentMethod {
  CreditCard = 'credit_card',
  CashOnDelivery = 'cash_on_delivery',
  PayPal = 'paypal',
}

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}
