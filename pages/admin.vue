<template>
    <div>
      <h1>Admin Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Delivery Address</th>
            <th>City</th>
            <th>Payment Mode</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in useOrdersStore().allOrders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.userId }}</td>
            <td>{{ order.totalPrice }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.user.name }}</td>
            <td>{{ order.user.email }}</td>
            <td>{{ order.deliveryAddress.street }}</td>
            <td>{{ order.deliveryAddress.city }}</td>
            <td>{{ order.paymentMode }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { useOrdersStore } from '~/store/orders';
  import { onMounted } from 'vue';
  
  onMounted(async () => {
      await useOrdersStore().getAllOrders();
  });
  </script>
  