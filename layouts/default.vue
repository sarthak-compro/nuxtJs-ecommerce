<template>
  <nav class="flex py-1 shadow-md">
    <NuxtLink to="products" class="flex mx-16">
      <img src="~/assets/images/logo.jpg" alt="" class="w-[80px] h-auto rounded-full" />
      <h1 class="my-auto ml-2 text-xl font-serif">Frozen Bazaar</h1>
    </NuxtLink>
    <div class="ml-auto my-auto flex items-center">
      <NuxtLink v-if="useAuthStore().isLoggedIn" to="cart" class="relative px-4 py-2 mx-4 text-xl">
        <font-awesome-icon :icon="['fas', 'cart-shopping']" class="custom-icon-size" />
        <div
          class="absolute top-0 right-0 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
          {{ useCartStore().itemCount }}
        </div>
      </NuxtLink>
      <NuxtLink v-if="useAuthStore().isLoggedIn" to="profile" class="px-4 py-2 mx-4 text-xl">
        <font-awesome-icon :icon="['fas', 'user']" class="custom-icon-size" />
      </NuxtLink>
      <button v-if="useAuthStore().isLoggedIn" class="mx-4 px-4 py-2 rounded-md"
        @click="useAuthStore().logout">Logout</button>
    </div>
  </nav>
  <div class="py-8 px-24">
    <slot />
  </div>
</template>
  
<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
import { useCartStore } from '~/store/cart';
</script>
  
<style scoped>
.custom-icon-size {
  font-size: 1.25em;
}
</style>
  