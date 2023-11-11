<template>
  <div>
    <h1 class="text-4xl mb-8">My Orders</h1>
    <table class="w-full">
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Order Date</th>
          <th>Status</th>
          <th>Total Amount (₹)</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="order in useOrdersStore().allUserOrders" :key="order.id">
          <td>{{ order.orderNumber }}</td>
          <td>{{ formatOrderDate(order.orderDate) }}</td>
          <td>{{ order.status }}</td>
          <td>{{ formatCurrency(order.totalAmount) }}</td>
          <td>
            <button v-if="order.status != OrderStatus.CANCELED" @click="cancelOrder(order.id)">Cancel</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useOrdersStore } from '~/store/orders';
import { OrderStatus } from '~/enums/status';

onMounted(async() => {
  await useOrdersStore().getUserOrders();
});

const formatOrderDate = (date) => {
  // Implement a date formatting function as needed
  return new Date(date).toLocaleDateString();
};

const formatCurrency = (amount) => {
  // Implement currency formatting function as needed
  return `${amount.toFixed(2)}`;
};

const cancelOrder = async (orderId) => {
  await useOrdersStore().cancelOrder(orderId);
}
</script>
