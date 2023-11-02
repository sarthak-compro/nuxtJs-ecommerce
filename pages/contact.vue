<template>
  <div class="contact-container">
    <h1>Contact Us</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="formData.name" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" required>
      </div>
      <div class="form-group">
        <label for="message">Message:</label>
        <textarea id="message" v-model="formData.message" rows="5" required></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>

    
  </div>
</template>
  
<script setup>
const formData = ref({
  name: '',
  email: '',
  message: '',
});

const submitForm = () => {
  console.log('Contact Form submitted with data:', formData);
  formData.value = {
    name: '',
    email: '',
    message: '',
  };
};
</script>
  
  
<style scoped>
.contact-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}
</style>
  