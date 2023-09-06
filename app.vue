<template>
  <div>
    <div v-if="!isLoggedIn">
      <div>
        <h1>Register</h1>
        <form @submit.prevent="onRegister">
          <input type="text" placeholder="username" class="block username-input" v-model="registerForm.username">
          <input type="email" placeholder="email" class="block password-input" v-model="registerForm.email">
          <input type="password" placeholder="password" class="block password-input" v-model="registerForm.password">
          <div>
            <input type="radio" name="role" value="user" v-model="registerForm.role">User
            <input type="radio" name="role" value="admin" v-model="registerForm.role">Admin
          </div>
          <button type="submit" class="block register-btn">Sign Up</button>
        </form>
      </div>
      <div>
        <h1>Login</h1>
        <form @submit.prevent="onLogin">
          <input type="text" placeholder="username" class="block username-input" v-model="loginForm.username">
          <input type="password" placeholder="password" class="block password-input" v-model="loginForm.password">
          <button type="submit" class="block log-in-btn">Log In</button>
        </form>
      </div>
    </div>
    <div v-if="isLoggedIn">
      <div>
        <h1>Products</h1>
        <button v-if="!addProductBtnClicked" class="add-product-btn block" @click="addProductBtnClicked = !addProductBtnClicked">Add Product</button>
        <div v-if="addProductBtnClicked">
          <form @submit.prevent="addProduct">
            <input type="text" placeholder="name" class="block name-input" v-model="addProductForm.name">
            <input type="text" placeholder="description" class="block desc-input" v-model="addProductForm.description">
            <input type="number" placeholder="price" class="block price-input" v-model="addProductForm.price">
            <input type="text" placeholder="category" class="block category-input" v-model="addProductForm.category">
            <button type="submit" class="add-product-btn">Add Product</button>
            <button type="submit" class="cancel-btn" @click="addProductBtnClicked = false">Cancel</button>
          </form>
        </div>
        <template v-for="product in products?.products">
          <div class="product">
            <span>{{ product }}</span>
            <button class="add_to_cart_btn" @click="addToCart(product)">Add to cart</button>
            <button class="remove_from_cart_btn" @click="removeFromCart(product)">Remove from cart</button>
            <button v-if="!updateProductBtnClicked" class="update_product_btn" @click="updateProductBtnClicked = !updateProductBtnClicked">Update Product</button>
            <button class="delete_product_btn" @click="deleteProduct(product)">Delete Product</button>
            <div v-if="updateProductBtnClicked">
              <form @submit.prevent="updateProduct(product)">
                <input type="text" placeholder="name" class="block name-input" v-model="updateProductForm.name">
                <input type="text" placeholder="description" class="block desc-input" v-model="updateProductForm.description">
                <input type="number" placeholder="price" class="block price-input" v-model="updateProductForm.price">
                <input type="text" placeholder="category" class="block category-input" v-model="updateProductForm.category">
                <button type="submit" class="update-product-btn">Update Product</button>
                <button type="submit" class="cancel-btn" @click="updateProductBtnClicked = false">Cancel</button>
              </form>
            </div>
          </div>
        </template>
      </div>
      {{ cart }}
      <div v-if="cart && Object.keys(cart).length">
        <h1>Cart</h1>
        <button class="deleteCart_btn block" @click="deleteCart()">Delete Cart</button>
        <div class="cart">
          <span class="block">CartId: {{ cart.cartId }}</span>
          <span class="block">UserId: {{ cart.userId }}</span>
          <span class="block">TotalPrice: {{ cart.totalPrice }}</span>
          <span>Items:</span>
          <template v-for="item in cart.items">
            <span class="block">{{ item }}</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { customFetch } = customHttp();

let registerForm = ref({
  username: '',
  email: '',
  password: '',
  role: 'user'
})
let loginForm = ref({
  username: '',
  password: ''
})
let addProductForm = ref({
  name: '',
  description: '',
  price: 0,
  category: ''
})
let updateProductForm = ref({
  name: '',
  description: '',
  price: 0,
  category: ''
})
let isLoggedIn = ref(false);
let cart = ref();
let products = ref();
let addProductBtnClicked = ref(false);
let updateProductBtnClicked = ref(false);
let token = ref();

const onRegister = async (event: any) => {
  event.preventDefault();
  try {
    const requestData = {
      username: registerForm.value.username,
      email: registerForm.value.email,
      password: registerForm.value.password,
      roles: [registerForm.value.role]
    };
    const user = await customFetch('auth/register', 'POST', { body: requestData });
    console.log(user.value);
  } catch (error) {
    console.error('Failed to register:', error);
  }
};

const onLogin = async (event: any) => {
  event.preventDefault();
  try {
    const requestData = {
      username: loginForm.value.username,
      password: loginForm.value.password
    };
    token = await customFetch('auth/login', 'POST', { body: requestData });
    if (token.value) {
      isLoggedIn.value = true;
      await getProducts();
    }
  } catch (error) {
    console.error('Failed to login:', error);
  }
};

const getProducts = async () => {
  try {
    const res: any = await customFetch('products', 'GET');
    products.value = res.value;
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
};

const addProduct = async () => {
  addProductBtnClicked.value = false;
  try {
    const requestData = {
      name: addProductForm.value.name,
      description: addProductForm.value.description,
      price: addProductForm.value.price,
      category: addProductForm.value.category
    };
    await customFetch('products', 'POST', { body: requestData });
    await getProducts();
  } catch (error) {
    console.error('Failed to add product:', error);
  }
};

const updateProduct = async (product: any) => {
  updateProductBtnClicked.value = false;
  try {
    const requestData = {
      name: updateProductForm.value.name,
      description: updateProductForm.value.description,
      price: updateProductForm.value.price,
      category: updateProductForm.value.category
    };
    await customFetch(`products/${product.id}`, 'PUT', { body: requestData });
    await getProducts();
  } catch (error) {
    console.error('Failed to update product:', error);
  }
};

const deleteProduct = async (product: any) => {
  try {
    await customFetch(`products/${product.id}`, 'DELETE');
    await getProducts();
  } catch (error) {
    console.error('Failed to delete product:', error);
  }
};

const addToCart = async (product: any) => {
  try {
    const requestData = {
      productId: product.id,
      name: product.name,
      quantity: 1,
      price: product.price
    };
    const res: any = await customFetch('cart', 'POST', { body: requestData }, token.value.access_token);
    cart.value = res.value;
  } catch (error) {
    console.error('Failed to add to cart:', error);
  }
};

const removeFromCart = async (product: any) => {
  try {
    const res: any = await customFetch('cart/item', 'DELETE', { body: { productId: product.id } }, token.value.access_token);
    cart.value = res.value;
  } catch (error) {
    console.error('Failed to remove from cart:', error);
  }
};

const deleteCart = async () => {
  try {
    await customFetch('cart', 'DELETE', {}, token.value.access_token);
    cart.value = undefined;
  } catch (error) {
    console.error('Failed to delete the cart:', error);
  }
};

</script>

<style>
.username-input, .password-input, .name-input, .desc-input, .price-input, .category-input, .cancel-btn, .update-product-btn {
  padding: 5px;
  margin: 10px 5px;
}

.log-in-btn, .register-btn, .add-product-btn {
  padding: 5px;
  margin: 10px 5px;
}

.block {
  display: block;
}

.product, .cart, .add_to_cart_btn, .remove_from_cart_btn, .deleteCart_btn, .update_product_btn, .delete_product_btn {
  padding: 5px;
  margin: 10px 5px;
}
</style>
