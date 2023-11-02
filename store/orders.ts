import { defineStore } from 'pinia';
import { Order } from '~/interfaces/order';

interface OrdersStoreState {
  orders: Order[];
}

const { customFetch } = customHttp();
const access_token = JSON.parse(localStorage.getItem('access_token') || '{}');

export const useOrdersStore = defineStore('ordersStore', {
  state: (): OrdersStoreState => ({
    orders: [],
  }),
  actions: {
    async createOrder(order: Order): Promise<void> {
      try {
        // Make an API request to create an order
        const response = await customFetch('orders', 'POST', { body: order }, access_token);

        // Add the created order to the state
        this.orders.push(response.value as Order);
      } catch (error) {
        this.handleError(error, 'Failed to create an order');
      }
    },

    async getOrder(orderId: number) {
      try {
        // const response = await customFetch(`/orders/user/${userId}`);
        // const userOrders = response.value;

        // Update the store with the retrieved user-specific orders.
        // this.allOrders = userOrders;/
      } catch (error) {
        console.error('Error fetching user orders:', error);
      }
    },

    async getAllOrders(): Promise<void> {
      try {
        // Make an API request to fetch all orders
        const response = await customFetch('orders', 'GET', {}, access_token);

        // Update the orders state with the fetched orders
        this.orders = response.value as Order[];
      } catch (error) {
        this.handleError(error, 'Failed to fetch orders');
      }
    },

    async getAllUsersOrders(): Promise<void> {
      try {
        // Make an API request to fetch all orders
        const response = await customFetch('orders', 'GET', {});

        // Update the orders state with the fetched orders
        this.orders = response.value as Order[];
      } catch (error) {
        this.handleError(error, 'Failed to fetch orders');
      }
    },

    handleError(error: any, message: string) {
      console.error(message, error.message);
    },
  },
  getters: {
    allOrders: (state: OrdersStoreState) => state.orders, // Getter to get all orders
    orderCount: (state: OrdersStoreState) => state.orders.length, // Getter for the total number of orders
  },
});
