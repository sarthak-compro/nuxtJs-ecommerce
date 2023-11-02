<template>
  <nav class="flex py-1 shadow-md sticky top-0 bg-white">
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

  <template v-if="useAuthStore().isLoggedIn">
    <button @click="toggleMenu" class="menu-button">Menu</button>
    <div class="menu !shadow-lg" :class="{ 'menu-open': isMenuOpen }">
      <button @click="isMenuOpen = false" class="close-button hover:bg-gray-200">
        <font-awesome-icon :icon="['fas', 'times']" class="text-gray-500 text-2xl" />
      </button>
      <ul class="menu-list">
        <li>
          <NuxtLink to="products" @click="toggleMenu" class="text-2xl mx-auto">Products</NuxtLink>
        </li>
        <li>
          <NuxtLink to="orders" @click="toggleMenu" class="text-2xl mx-auto">My orders</NuxtLink>
        </li>
        <li>
          <NuxtLink to="contact" @click="toggleMenu" class="text-2xl mx-auto">Contact support</NuxtLink>
        </li>
      </ul>
    </div>
  </template>

  <div class="py-8 px-24">
    <slot />
  </div>
</template>
  
<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
import { useCartStore } from '~/store/cart';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>
  
<style scoped>
.custom-icon-size {
  font-size: 1.25em;
}

.menu {
  position: fixed;
  top: 90px;
  left: 0;
  height: calc(100% - 90px);
  width: 250px;
  background-color: white;
  border-left: 1px solid #ccc;
  box-shadow: -1px 0 3px rgba(0, 0, 0, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 1;
  display: flex;
  flex-direction: column;
}

.menu-open {
  transform: translateX(0);
}

.menu-button,
.close-button {
  background: none;
  border: none;
  color: #333;
  padding: 0.15rem 0.5rem;
  margin: 0.75rem;
  font-size: 1.25rem;
  cursor: pointer;
  align-self: flex-end;
}

.close-button:hover {
  @apply rounded-full bg-gray-200;
}

.menu-list {
  list-style: none;
  padding: 0;
}

.menu-list li {
  display: flex;
  padding: 0.75rem;
  font-size: 1rem;
  text-align: left;
}

.menu-list li:hover {
  background-color: green;
}

.menu-list li:hover a {
  color: white;
}

.menu-list a {
  text-decoration: none;
  color: #333;
}
</style>
  