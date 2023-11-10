<template>
  <div>
    <h1>User Orders</h1>
    <button @click="getUserSpecificOrders">Get User Orders</button>
    <table>
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Order Date</th>
          <th>Status</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>
        <!-- Display orders as needed -->
        <tr v-for="order in userOrders" :key="order.id">
          <td>{{ order.orderNumber }}</td>
          <td>{{ formatOrderDate(order.orderDate) }}</td>
          <td>{{ order.status }}</td>
          <td>{{ formatCurrency(order.totalAmount) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useOrdersStore } from '~/store/orders';

const userId = 123;
const userOrders = ref([]);

const getUserSpecificOrders = async () => {
  const ordersStore = useOrdersStore();
  const response = await ordersStore.getUserOrders(userId);
  userOrders.value = response.orders;
};

const formatOrderDate = (date) => {
  // Implement a date formatting function as needed
  return new Date(date).toLocaleDateString();
};

const formatCurrency = (amount) => {
  // Implement currency formatting function as needed
  return `$${amount.toFixed(2)}`;
};
</script>
