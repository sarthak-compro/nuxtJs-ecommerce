<template>
    <div class="home" v-if="!useAuthStore().isLoggedIn">
      <div class="register_section right_border">
        <h1 class="text-2xl font-semibold mb-4">Register</h1>
        <form @submit.prevent="onRegister">
          <input type="text" placeholder="username" class="block username-input" v-model="registerForm.username">
          <input type="email" placeholder="email" class="block password-input" v-model="registerForm.email">
          <input type="password" placeholder="password" class="block password-input" v-model="registerForm.password">
          <div>
            <input type="radio" name="role" value="user" v-model="registerForm.role">User
            <input type="radio" name="role" value="admin" v-model="registerForm.role">Admin
          </div>
          <button type="submit" class="register-btn">Sign Up</button>
        </form>
        <div v-if="registrationSuccess" class="success-message text-green-600">
            Registration successful! You can now log in.
        </div>
        <div v-if="registrationError" class="error">{{ registrationError }}</div>
      </div>
      <div class="login_section left_border">
        <h1 class="text-2xl font-semibold mb-4">Login</h1>
        <form @submit.prevent="onLogin">
          <input type="text" placeholder="username" class="block username-input" v-model="loginForm.username">
          <input type="password" placeholder="password" class="block password-input" v-model="loginForm.password">
          <button type="submit" class="log-in-btn">Log In</button>
        </form>
        <div v-if="loginError" class="error">{{ loginError }}</div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
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
let token = ref();
let registrationError = ref();
const registrationSuccess = ref(false);
let loginError = ref();

onMounted(() => {
  if (useAuthStore().isLoggedIn) navigateTo('products');
})

const onRegister = async (event: any) => {
  event.preventDefault();
  
  registrationError.value = "";
  registrationSuccess.value = false;
  
  try {
    const requestData = {
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
      roles: [registerForm.role]
    };
    const user = await customFetch('auth/register', 'POST', { body: requestData });
    registrationSuccess.value = true;
    console.log(user.value);
    registerForm.username = '';
    registerForm.email = '';
    registerForm.password = '';
    registerForm.role = 'user';
  } catch (error: any) {
    registrationError.value = 'Failed to register: ' + error.message;
  }
};

const onLogin = async (event: any) => {
  event.preventDefault();

  // Reset the loginError to an empty string
  loginError.value = "";

  try {
    const requestData = {
      username: loginForm.username,
      password: loginForm.password
    };
    token = await customFetch('auth/login', 'POST', { body: requestData });
    if (token.value) {
      useAuthStore().login();
      localStorage.setItem('access_token', JSON.stringify(token.value.access_token));
      useRouter().push('products');
    //   await getCart();
    }
  } catch (error: any) {
    loginError.value = 'Failed to login: ' + error.message;
  }
};
</script>