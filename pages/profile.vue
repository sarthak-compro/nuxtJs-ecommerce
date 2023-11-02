<template>
    <div class="container mx-auto">
      <h1 class="text-3xl font-semibold mb-4">User Profile</h1>
      <div class="bg-white p-4 shadow-md">
        <div>
          <h2 class="text-xl font-semibold">Profile Information</h2>
          <div class="mt-4">
            <label for="username" class="text-lg">Username:</label>
            <input v-model="user.username" type="text" id="username" class="input-field" disabled />
          </div>
          <div class="mt-4">
            <label for="email" class="text-lg">Email:</label>
            <input v-model="user.email" type="email" id="email" class="input-field" disabled />
          </div>
        </div>
  
        <div class="mt-6">
          <h2 class="text-xl font-semibold">Change Password</h2>
          <form @submit.prevent="changePassword">
            <div class="mt-4">
              <label for="currentPassword" class="text-lg">Current Password:</label>
              <input v-model="currentPassword" type="password" id="currentPassword" class="input-field" required />
            </div>
            <div class="mt-4">
              <label for="newPassword" class="text-lg">New Password:</label>
              <input v-model="newPassword" type="password" id="newPassword" class="input-field" required />
            </div>
            <div class="mt-4">
              <label for="confirmPassword" class="text-lg">Confirm Password:</label>
              <input v-model="confirmPassword" type="password" id="confirmPassword" class="input-field" required />
            </div>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4">Change Password</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  
  const user = ref({
    username: 'JohnDoe', // Replace with the user's actual username
    email: 'johndoe@example.com', // Replace with the user's actual email
  });
  
  const currentPassword = ref('');
  const newPassword = ref('');
  const confirmPassword = ref('');
  
  const changePassword = () => {
    // Implement password change logic here
    // Validate the current password, new password, and confirm password
    if (newPassword.value === confirmPassword.value) {
      // Passwords match, update the user's password
      // You can send an API request or perform the necessary actions here
      console.log('Password changed successfully');
    } else {
      console.error('Passwords do not match');
    }
  };
  </script>
  
  <style scoped>
  .input-field {
    @apply w-full px-3 py-2 border rounded-md;
  }
  </style>
  