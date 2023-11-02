import { Product } from "./product";

export interface Order {
  id: number;
  orderNumber: string;
  items: OrderItem[];
  orderDate: Date;
  status: OrderStatus;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
}

interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
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
