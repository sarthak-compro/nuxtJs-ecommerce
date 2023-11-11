import { defineStore } from 'pinia';
import { Order } from '~/interfaces/order';

interface OrdersStoreState {
  orders: Order[];
  userOrders: Order[];
}

const { customFetch } = customHttp();
const access_token = JSON.parse(localStorage.getItem('access_token') || '{}');

export const useOrdersStore = defineStore('ordersStore', {
  state: (): OrdersStoreState => ({
    orders: [],
    userOrders: []
  }),
  actions: {
    async createOrder(createdOrder: Order): Promise<void> {
      try {
        // Make an API request to create an order
        const response = await customFetch('orders', 'POST', { body: createdOrder }, access_token);

        // Add the created order to the state
        this.orders.push(response.value as Order);
      } catch (error) {
        this.handleError(error, 'Failed to create an order');
      }
    },

    async getOrder(orderNumber: string): Promise<void> {
      try {
        // Make an API request to get a specific order
        const response = await customFetch(`orders/order-by-number/${orderNumber}`, 'GET', {}, access_token);

        // Update the store with the retrieved order.
        this.orders = [response.value as Order];
      } catch (error) {
        this.handleError(error, 'Failed to fetch the order');
      }
    },

    async getUserOrders(): Promise<void> {
      try {
        // Make an API request to get a specific order
        const response = await customFetch(`orders/user-orders`, 'GET', {}, access_token);

        // Update the store with the retrieved order.
        this.userOrders = (response.value as { orders: Order[] }).orders;
      } catch (error) {
        this.handleError(error, 'Failed to fetch the order');
      }
    },

    async getAllOrders(): Promise<void> {
      try {
        // Make an API request to fetch all orders
        const response = await customFetch('orders/all-orders', 'GET', {}, access_token);

        // Update the orders state with the fetched orders
        this.orders = (response.value as { orders: Order[] }).orders;
      } catch (error) {
        this.handleError(error, 'Failed to fetch orders');
      }
    },

    async cancelOrder(orderId: number): Promise<void> {
      try {
        // Make an API request to cancel an order
        await customFetch(`orders/${orderId}/cancel`, 'PUT', {}, access_token);

        // Remove the canceled order from the state
        this.orders = this.orders.filter((order) => order.id !== orderId);
      } catch (error) {
        this.handleError(error, 'Failed to cancel the order');
      }
    },

    async markOrderAsDelivered(orderId: number): Promise<void> {
      try {
        // Make an API request to mark an order as delivered
        await customFetch(`orders/${orderId}/deliver`, 'PUT', {}, access_token);

        // Optionally, you can update the local state after marking as delivered
        await this.getAllOrders();
      } catch (error) {
        this.handleError(error, 'Failed to mark the order as delivered');
      }
    },

    handleError(error: any, message: string) {
      console.error(message, error.message);
    },
  },
  getters: {
    allOrders: (state: OrdersStoreState) => state.orders, // Getter to get all orders
    allUserOrders: (state: OrdersStoreState) => state.userOrders, // Getter to get all orders of the user
    orderCount: (state: OrdersStoreState) => state.orders.length, // Getter for the total number of orders
  },
});
