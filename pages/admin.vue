<template>
  <div class="my-8">
    <h1 class="text-4xl">Products</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      <template v-for="product in useProductStore().products">
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-xl">
          <img src="~/assets/images/peas.webp" alt="Product Image" class="w-[150px] h-auto mx-auto py-2">
          <div :to="`products/${product.name}`" class="block px-6 pt-4">
            <div class="mb-4">
              <div class="font-bold text-xl">{{ product.name }}</div>
              <p class="text-gray-700 text-base mt-2">Price: Rs.{{ product.price }}</p>
            </div>
          </div>
          <div class="flex px-2">
            <button v-if="!productUpdateStates[product.id]" class="w-1/2 !py-3 update_product_btn"
              @click="updateProductBtnClicked(product.id)">Update</button>
            <button class="w-1/2 delete_product_btn" @click="deleteProduct(product)">Delete</button>
          </div>
          <div v-if="productUpdateStates[product.id]">
            <form @submit.prevent="updateProduct(product.id)">
              <input type="text" placeholder="name" class="block name-input" v-model="updateProductForm.name">
              <input type="text" placeholder="description" class="block desc-input"
                v-model="updateProductForm.description">
              <input type="number" placeholder="price" class="block price-input" v-model="updateProductForm.price">
              <input type="text" placeholder="category" class="block category-input" v-model="updateProductForm.category">
              <button type="submit" class="update-product-btn">Update Product</button>
              <button type="button" class="cancel-btn" @click="cancelUpdate(product.id)">Cancel</button>
            </form>
          </div>
        </div>
      </template>
    </div>
    <button v-if="!addProductBtnClicked" class="w-full mt-8 p-3 rounded-sm"
      @click="addProductBtnClicked = !addProductBtnClicked">Add Product</button>
    <div v-if="addProductBtnClicked">
      <form @submit.prevent="addProduct">
        <input type="text" placeholder="name" class="block name-input" v-model="addProductForm.name">
        <input type="text" placeholder="description" class="block desc-input" v-model="addProductForm.description">
        <input type="number" placeholder="price" class="block price-input" v-model="addProductForm.price">
        <input type="text" placeholder="category" class="block category-input" v-model="addProductForm.category">
        <button type="submit" class="add-product-btn">Add Product</button>
        <button type="button" class="cancel-btn" @click="addProductBtnClicked = false">Cancel</button>
      </form>
    </div>
  </div>
  <div class="my-8">
    <h1 class="text-4xl">Orders</h1>
    <table class="mt-8 w-full">
      <thead>
        <tr>
          <th>Order number</th>
          <th>Total Price</th>
          <th>Status</th>
          <th>Delivery Address</th>
          <th>City</th>
          <th>Payment Mode</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="order in useOrdersStore().allOrders" :key="order.id">
          <td>{{ order.orderNumber }}</td>
          <td>{{ order.totalAmount }}</td>
          <td>{{ order.status }}</td>
          <td>{{ order.shippingAddress.street }}</td>
          <td>{{ order.shippingAddress.city }}</td>
          <td>{{ order.paymentMethod }}</td>
          <td>
            <button v-if="order.status === OrderStatus.PENDING" @click="markStatusAsDelivered(order.id)">Mark as Delivered</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useOrdersStore } from '~/store/orders';
import { useProductStore } from '~/store/products';
import { useCartStore } from '~/store/cart';
import { OrderStatus } from '~/enums/status';

definePageMeta({
  middleware: ['authenticated-user-only'],
});

onMounted(async () => {
  await useOrdersStore().getAllOrders();
  console.log(useOrdersStore().allOrders);
  await useProductStore().getProducts();
});

const addProductForm = reactive({
  name: '',
  description: '',
  price: 0,
  category: ''
});

const updateProductForm = reactive({
  name: '',
  description: '',
  price: 0,
  category: ''
});

const addProductBtnClicked = ref(false);
const productUpdateStates: any = reactive({});

const cancelUpdate = (productId: number) => {
  productUpdateStates[productId] = false;
};

const updateProductBtnClicked = (productId: number) => {
  useProductStore().products.forEach((product: any) => cancelUpdate(product.id));
  productUpdateStates[productId] = true;
};

const addProduct = async () => {
  addProductBtnClicked.value = false;
  const requestData = {
    name: addProductForm.name,
    description: addProductForm.description,
    price: addProductForm.price,
    category: addProductForm.category
  };
  await useProductStore().addProduct(requestData);
  await useProductStore().getProducts();
};

const updateProduct = async (productId: number) => {
  const requestData = {
    name: updateProductForm.name,
    description: updateProductForm.description,
    price: updateProductForm.price,
    category: updateProductForm.category,
  };
  await useProductStore().updateProduct(productId, requestData);
  await useProductStore().getProducts();
  await useCartStore().getCart();
  productUpdateStates[productId] = false;
};

const deleteProduct = async (product: any) => {
  await useProductStore().deleteProduct(product.id);
  await useProductStore().getProducts();
};

const markStatusAsDelivered = async (orderNumber: number) => {
  await useOrdersStore().markOrderAsDelivered(orderNumber);
}
</script>
