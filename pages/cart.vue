<template>
  <h1 class="text-5xl py-4">Cart</h1>
  <div class="bg-gray-100 p-4">
    <div class="container mx-auto">
      <div v-if="useCartStore().itemCount === 0">
        <p>Your shopping cart is empty.</p>
      </div>
      <ul class="bg-white rounded-lg p-4 shadow-md" v-else>
        <li v-for="item in useCartStore().cart?.items" class="flex justify-between items-center my-3">
          <div class="flex items-center">
            <span class="text-lg font-semibold">{{ item.name }}</span>
          </div>
          <span class="text-lg my-auto">₹ {{ item.price }}</span>
          <span class="text-lg my-auto">₹ {{ item.subTotalPrice }}</span>
          <div class="flex ml-2">
            <button @click="useCartStore().decrement(item)" class="px-2 py-1 mx-1 bg-gray-300 hover:bg-gray-400 text-gray-600 rounded-md"
              :disabled="item.quantity === 1">
              <font-awesome-icon :icon="['fas', 'minus']" />
            </button>
            <span class="text-xl mx-2">{{ item.quantity }}</span>
            <button @click="useCartStore().increment(item)"
              class="px-2 py-1 bg-green-300 hover:bg-green-400 text-green-600 rounded-md mx-1">
              <font-awesome-icon :icon="['fas', 'plus']" />
            </button>
            <button v-if="item.quantity >= 1" @click="useCartStore().removeFromCart(item)"
              class="px-2 py-1 bg-red-300 hover-bg-red-400 text-red-600 rounded-md mx-1">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </div>
        </li>
      </ul>
      <div class="bg-white rounded-lg p-4 shadow-md mt-4" v-if="useCartStore().itemCount > 0">
        <span class="text-lg font-semibold">Total: ₹{{ useCartStore().cart.totalPrice }}</span>
      </div>
      <button class="rounded-md p-2 mt-4 hover:bg-green-300" v-if="useCartStore().itemCount > 0">
        Checkout
      </button>
      <button class="rounded-md p-2 mt-4 ml-4 hover:bg-red-300" v-if="useCartStore().itemCount > 0"
        @click="useCartStore().deleteCart()">
        Delete Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cart';
definePageMeta({
  middleware: ['authenticated-user-only'],
})

onBeforeMount(async () => {
  await useCartStore().getCart();
});
</script>