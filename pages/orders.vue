<template>
    <div>
      <h1>User Orders</h1>
      <button @click="getUserSpecificOrders">Get User Orders</button>
      <table>
        <!-- Display orders as needed -->
      </table>
    </div>
  </template>
  
  <script setup>
  import { useOrdersStore } from '~/store/orders';
  
  const userId = 123;
  
  const getUserSpecificOrders = async () => {
    await useOrdersStore().getUserOrders(userId);
  };
  </script>
  