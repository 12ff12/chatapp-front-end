<template>
  <div class="auth-form">
    <h2>Welcome Back</h2>
    <p class="subtitle">Sign in to continue to ChatApp</p>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          placeholder="Enter your email"
          required
        >
      </div>
      
      <div class="form-group">
        <div class="password-header">
          <label for="password">Password</label>
          <a href="#" class="forgot-password">Forgot Password?</a>
        </div>
        <input 
          :type="showPassword ? 'text' : 'password'" 
          id="password" 
          v-model="password" 
          placeholder="Enter your password"
          required
        >
        <button 
          type="button" 
          class="toggle-password"
          @click="showPassword = !showPassword"
        >
          {{ showPassword ? '👁️' : '👁️‍🗨️' }}
        </button>
      </div>
      <span v-if="error" class="error">{{ error }}</span>
      <button type="submit" class="submit-btn">Sign In</button>
    </form>
    
    <p class="switch-form">
      Don't have an account? 
      <a href="#" @click="$emit('switch-to-signup')">Sign up</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

const email = ref<string>('');
const password = ref<string>('');
const showPassword = ref<boolean>(false);
const error = ref<string>('');
const handleSubmit = () => {
  error.value = ''; // Clear any previous errors
  axios.post('https://grey-dotterel-732681.hostingersite.com/api/login', {
    email: email.value,
    password: password.value,
  }, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then((response) => {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user_id', response.data.user);
    window.location.href = '/chat';
  })
  .catch((err) => {
    console.error('Login error:', err);
    if(err.response.status === 401){
      error.value = 'email or password are wrong';
    }else{
      error.value = err.response.data.message||'Invalid email or password. Please try again.';
    }
  });
};

</script>

<style scoped>
@import './LoginForm.css';
</style>
