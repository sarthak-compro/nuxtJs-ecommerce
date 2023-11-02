<template>
  <div>
    <h1 class="text-4xl mb-8">Products</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      <template v-for="product in useProductStore().products">
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-xl">
          <img src="~/assets/images/peas.webp" alt="Product Image" class="w-[150px] h-auto mx-auto py-2">
          <div :to="`products/${product.name}`" class="block px-6 py-4">
            <div class="mb-4">
              <div class="font-bold text-xl">{{ product.name }}</div>
              <p class="text-gray-700 text-base mt-2">Price: ₹ {{ product.price }}</p>
            </div>
            <button class="w-full py-3 hover:bg-green-300" @click="addToCart(product)">Add to cart</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Product } from '~/interfaces/product';
import { useCartStore } from '~/store/cart';
import { useProductStore } from '~/store/products';

definePageMeta({
  middleware: ['authenticated-user-only'],
});

onBeforeMount(async () => {
  await useProductStore().getProducts();
});

const addToCart =async (product: Product) => {
  await useCartStore().addToCart(product);
}
</script>
