<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-semibold mb-4">Order Summary</h1>
    <div class="bg-white p-4 shadow-md">
      <div v-if="useCartStore().itemCount === 0">
        <p>Your order is empty. Please add items to your cart.</p>
      </div>
      <div v-else>
        <div class="mb-4">
          <h2 class="text-xl font-semibold">Items in Your Order</h2>
          <ul>
            <li v-for="item in useCartStore().cart.items" :key="item.productId"
              class="flex justify-between items-center my-2">
              <span class="text-lg">{{ item.name }}</span>
              <span class="text-lg">{{ item.quantity }} x Rs. {{ item.price }} = Rs. {{ item.subTotalPrice
              }}</span>
            </li>
          </ul>
        </div>
        <div class="mb-4">
          <h2 class="text-xl font-semibold">Order Total</h2>
          <p class="text-lg">Total Amount: Rs. {{ useCartStore().cart.totalPrice }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="container mx-auto mt-10">
    <h1 class="text-3xl font-semibold mb-4">Payment Options</h1>
    <div class="bg-white p-4 shadow-md">
      <div>
        <h2 class="text-xl font-semibold">Choose Payment Method</h2>
        <div class="mt-4">
          <label class="inline-flex items-center">
            <input type="radio" v-model="selectedPayment" value="phonepe" class="form-radio text-green-500" />
            <span class="ml-2 text-lg">PhonePe</span>
          </label>
        </div>
        <div class="mt-2">
          <label class="inline-flex items-center">
            <input type="radio" v-model="selectedPayment" value="cod" class="form-radio text-green-500" />
            <span class="ml-2 text-lg">Cash on Delivery (COD)</span>
          </label>
        </div>
      </div>
      <div v-if="selectedPayment">
        <div class="mt-6">
          <button @click="processPayment" class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Proceed</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { useCartStore } from '~/store/cart'

const selectedPayment = ref(''); // Initially no payment method is selected

const processPayment = () => {
  if (selectedPayment.value === 'phonepe') {
    // Redirect to the PhonePe payment gateway (replace with the actual URL)
    window.location.href = 'https://example.com/phonepe-payment-gateway';
  } else if (selectedPayment.value === 'cod') {
    // Handle the Cash on Delivery payment method (e.g., place the order)
    useRouter().push('/payment');
  }
};
</script>
  