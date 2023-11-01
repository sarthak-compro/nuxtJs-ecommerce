<template>
  <div>
    <h1 class="text-4xl mb-8">Products</h1>
    <template v-for="product in products?.products">
      <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white my-4 hover:shadow-xl">
        <img src="~/assets/images/peas.webp" alt="Product Image" class="w-[150px] h-auto mx-auto py-2">
        <div class="">
          <div :to="`products/${product.name}`" class="block px-6 py-4">
            <div class="flex mt-2">
              <div class="font-bold text-xl mb-2 my-auto">{{ product.name }}</div>
              <select v-model="selectedWeight" id="weight" name="weight" class="mt-1 ml-auto p-2 border rounded-md w-40">
                <option value="0.25">0.25kg</option>
                <option value="0.5">0.5kg</option>
                <option value="1">1kg</option>
                <option value="5">5kg</option>
              </select>
            </div>

            <p class="text-green-600 mt-2" v-if="selectedWeight">
              {{ selectedWeight }}kg Rate: Rs.{{ (selectedWeight * product.price) }}
            </p>
            <p class="text-gray-700 text-base">Rate per kg: Rs.{{ product.price }}</p>
          </div>
          <div class="flex justify-between px-4 py-2">
            <button class="w-full py-3 hover:bg-green-300" @click="useCartStore().addToCart(product)">Add to
              cart</button>
            <!-- <button class="w-1/2 remove_from_cart_btn hover:bg-green-300"
                @click="useCartStore().removeFromCart(product)">Remove from
                cart</button> -->
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cart';
definePageMeta({
  middleware: ['authenticated-user-only'],
})

const { customFetch } = customHttp();

const products = ref();
const selectedWeight = ref(0.25);
// let cart = useCartStore().cart;
// const access_token = JSON.parse(localStorage.getItem('access_token') || '{}');

onBeforeMount(async () => {
  await getProducts();
})

const getProducts = async () => {
  try {
    const res: any = await customFetch('products', 'GET');
    products.value = res.value;
  } catch (error) {
    handleError(error, 'Failed to fetch products');
  }
};

const handleError = (error: any, message: string) => {
  console.error(message, error.message);
};
</script>