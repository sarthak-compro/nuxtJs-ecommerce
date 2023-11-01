export interface Order {
  id: number;
  userId: number;
  totalPrice: number;
  status: string;
  // Add more properties as needed
  user: UserDetails;
  deliveryAddress: Address;
  paymentMode: string;
}

interface UserDetails {
  name: string;
  email: string;
  // Add more user-related properties
}

interface Address {
  street: string;
  city: string;
  // Add more address-related properties
}
