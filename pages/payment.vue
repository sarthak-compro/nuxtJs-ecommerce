<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-semibold mb-4">Delivery Address</h1>
    <div class="bg-white p-4 shadow-md">
      <form @submit.prevent="submitAddress">
        <div class="mb-4">
          <label for="name" class="block text-lg font-medium">House no.</label>
          <input v-model="address.name" type="text" id="name" name="name" class="form-input" required />
        </div>
        <div class="mb-4">
          <label for="street" class="block text-lg font-medium">Street Address</label>
          <input v-model="address.street" type="text" id="street" name="street" class="form-input" required />
        </div>
        <div class="mb-4">
          <label for="city" class="block text-lg font-medium">City</label>
          <input v-model="address.city" type="text" id="city" name="city" class="form-input" required />
        </div>
        <div class="mb-4">
          <label for="zip" class="block text-lg font-medium">Zip Code</label>
          <input v-model="address.zip" type="text" id="zip" name="zip" class="form-input" required />
        </div>
        <div class="mt-4">
          <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Submit Address</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>

const address = ref({
  name: '',
  street: '',
  city: '',
  zip: '',
});

const submitAddress = () => {
  console.log('Submitted address:', address.value);
  navigateTo('order-confirmation');
};
</script>
