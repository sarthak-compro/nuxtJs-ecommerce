<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-semibold mb-4">Delivery Address</h1>
    <div class="bg-white p-4 shadow-md">
      <form @submit.prevent="submitAddress">
        <div class="mb-4">
          <label for="street" class="block text-lg font-medium">Street</label>
          <input v-model="address.street" type="text" id="street" name="street" class="form-input" required />
        </div>
        <div class="mb-4">
          <label for="city" class="block text-lg font-medium">City</label>
          <input v-model="address.city" type="text" id="city" name="city" class="form-input" required />
        </div>
        <div class="mb-4">
          <label for="state" class="block text-lg font-medium">State</label>
          <input v-model="address.state" type="text" id="state" name="state" class="form-input" required />
        </div>
        <div class="mb-4">
          <label for="postal" class="block text-lg font-medium">Postal Code</label>
          <input v-model="address.postalCode" type="text" id="postal" name="postal" class="form-input" required />
        </div>
        <div class="mt-4">
          <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Submit Address</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/store/cart';
import { useOrdersStore } from '~/store/orders';


const address = ref({
  street: '123',
  city: '123',
  state: '123',
  postalCode: '123',
});

const date = new Date();

let day = date.getDate();
let month = date.toLocaleString('default', { month: 'long' });
let year = date.getFullYear();

let currentDate = ref(`${month} ${day}, ${year}`);

const submitAddress = async () => {
  const order = {
    items: useCartStore().cart.items,
    orderDate: currentDate,
    totalAmount: useCartStore().cart.totalPrice,
    paymentMethod: 'CASH_ON_DELIVERY',
    shippingAddress: address.value,
  }
  // const createdOrder = await useOrdersStore().createOrder(order);
  const createdOrder = {orderNumber : 123};
  
  navigateTo(`order-confirmation/${createdOrder.orderNumber}`);
};
</script>
