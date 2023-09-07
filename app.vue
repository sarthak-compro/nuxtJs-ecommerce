<template>
  <div>
    <div class="home" v-if="!isLoggedIn">
      <div class="register_section right_border">
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
      <div class="login_section left_border">
        <h1>Login</h1>
        <form @submit.prevent="onLogin">
          <input type="text" placeholder="username" class="block username-input" v-model="loginForm.username">
          <input type="password" placeholder="password" class="block password-input" v-model="loginForm.password">
          <button type="submit" class="block log-in-btn">Log In</button>
        </form>
      </div>
    </div>
    <div v-if="isLoggedIn">
      <button class="log-out-btn" @click="isLoggedIn = false">Logout</button>
      <div>
        <h1>Products</h1>
        <button v-if="!addProductBtnClicked" class="add-product-btn block" @click="addProductBtnClicked = !addProductBtnClicked">Add Product(Admin)</button>
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
            <button v-if="!productUpdateStates[product.id]" class="update_product_btn" @click="updateProductBtnClicked(product.id)">Update Product(Admin)</button>
            <button class="delete_product_btn" @click="deleteProduct(product)">Delete Product(Admin)</button>
            <div v-if="productUpdateStates[product.id]">
              <form @submit.prevent="updateProduct(product.id)">
                <input type="text" placeholder="name" class="block name-input" v-model="updateProductForm.name">
                <input type="text" placeholder="description" class="block desc-input" v-model="updateProductForm.description">
                <input type="number" placeholder="price" class="block price-input" v-model="updateProductForm.price">
                <input type="text" placeholder="category" class="block category-input" v-model="updateProductForm.category">
                <button type="submit" class="update-product-btn">Update Product</button>
                <button type="button" class="cancel-btn" @click="cancelUpdate(product.id)">Cancel</button>
              </form>
            </div>
          </div>
        </template>
      </div>
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

const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  role: 'user'
});
const loginForm = reactive({
  username: '',
  password: ''
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
const isLoggedIn = ref(false);
const cart = ref();
const products = ref();
const addProductBtnClicked = ref(false);
const productUpdateStates: any = reactive({});
let token = ref();

const onRegister = async (event: any) => {
  event.preventDefault();
  try {
    const requestData = {
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
      roles: [registerForm.role]
    };
    const user = await customFetch('auth/register', 'POST', { body: requestData });
    console.log(user.value);
    registerForm.username = '';
    registerForm.email = '';
    registerForm.password = '';
    registerForm.role = 'user';
  } catch (error) {
    handleError(error, 'Failed to register');
  }
};

const onLogin = async (event: any) => {
  event.preventDefault();
  try {
    const requestData = {
      username: loginForm.username,
      password: loginForm.password
    };
    token = await customFetch('auth/login', 'POST', { body: requestData });
    if (token.value) {
      isLoggedIn.value = true;
      await getProducts();
      await getCart();
    }
  } catch (error) {
    handleError(error, 'Failed to login');
  }
};

const getProducts = async () => {
  try {
    const res: any = await customFetch('products', 'GET');
    products.value = res.value;
  } catch (error) {
    handleError(error, 'Failed to fetch products');
  }
};

const getCart = async () => {
  try {
    const res: any = await customFetch('cart', 'GET', {}, token.value.access_token);
    cart.value = res.value;
  } catch (error) {
    handleError(error, 'Failed to fetch cart');
  }
};

const addProduct = async () => {
  addProductBtnClicked.value = false;
  try {
    const requestData = {
      name: addProductForm.name,
      description: addProductForm.description,
      price: addProductForm.price,
      category: addProductForm.category
    };
    await customFetch('products', 'POST', { body: requestData });
    await getProducts();
  } catch (error) {
    handleError(error, 'Failed to add product');
  }
};

const updateProductBtnClicked = (productId: number) => {
  products.value.products.forEach((product: any) => cancelUpdate(product.id));
  productUpdateStates[productId] = true;
}

const updateProduct = async (productId: number) => {
  try {
    const requestData = {
      name: updateProductForm.name,
      description: updateProductForm.description,
      price: updateProductForm.price,
      category: updateProductForm.category,
    };
    await customFetch(`products/${productId}`, 'PUT', { body: requestData }, token.value.access_token);
    await getProducts();
    await getCart();
    productUpdateStates[productId] = false;
  } catch (error) {
    handleError(error, 'Failed to update product');
  }
};

const cancelUpdate = (productId: number) => {
  productUpdateStates[productId] = false;
};


const deleteProduct = async (product: any) => {
  try {
    await customFetch(`products/${product.id}`, 'DELETE');
    await getProducts();
  } catch (error) {
    handleError(error, 'Failed to delete product');
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
    handleError(error, 'Failed to add to cart');
  }
};

const removeFromCart = async (product: any) => {
  try {
    const res: any = await customFetch('cart/item', 'DELETE', { body: { productId: product.id } }, token.value.access_token);
    cart.value = res.value;
    if (!cart.value?.items?.length) cart.value = undefined;
  } catch (error) {
    handleError(error, 'Failed to remove from cart');
  }
};

const deleteCart = async () => {
  try {
    await customFetch('cart', 'DELETE', {}, token.value.access_token);
    cart.value = undefined;
  } catch (error) {
    handleError(error, 'Failed to delete the cart');
  }
};

const handleError = (error: any, message: string) => {
  console.error(message, error.message);
};
</script>

<style>

.home {
  display: flex;
  justify-content: center;
}

.register_section, .login_section {
  padding: 50px 100px;
  margin-top: 100px;
}

.right_border {
  border-right: 1px solid gray;
}

.left_border {
  border-left: 1px solid gray;
}

.username-input, .password-input, .name-input, .desc-input, .price-input, .category-input, .cancel-btn, .update-product-btn {
  padding: 5px;
  margin: 10px 5px;
}

.log-in-btn, .log-out-btn, .register-btn, .add-product-btn {
  padding: 5px;
  margin: 10px 5px;
}

.log-out-btn{
  display: block;
  margin-left: auto;
}

.block {
  display: block;
}

.product, .cart, .add_to_cart_btn, .remove_from_cart_btn, .deleteCart_btn, .update_product_btn, .delete_product_btn {
  padding: 5px;
  margin: 10px 5px;
}
</style>
