<template>
  <div class="auth-form">
    <h2>Create Account</h2>
    <p class="subtitle">Join our community today</p>
    
    <form @submit.prevent="handleSubmit">
      <!-- Avatar Upload Section -->
      <div class="form-group avatar-upload-container">
        <label>Profile Picture (Optional)</label>
        <div class="avatar-upload-wrapper">
          <div class="avatar-preview">
            <img v-if="avatarPreview" :src="avatarPreview" alt="Preview" class="avatar-image">
            <div v-else class="avatar-placeholder">
              <svg class="avatar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <label for="avatar-upload" class="avatar-upload-label">
              <svg class="camera-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </label>
            <input 
              id="avatar-upload" 
              type="file" 
              accept="image/*" 
              class="avatar-input" 
              @change="handleAvatarChange"
            >
            <button 
              v-if="avatarPreview" 
              type="button" 
              
              class="remove-avatar-btn"
              @click="removeAvatar"
            >
              ×
            </button>
          </div>
          <p class="avatar-hint">PNG, JPG up to 2MB</p>
        </div>
      </div>

      <div class="form-group">
        <label for="name">Full Name</label>
        <input 
          type="text" 
          id="name" 
          v-model="name" 
          placeholder="Enter your full name"
          required
        >
      </div>
      
      <!-- Rest of your form fields -->
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
        <label for="password">Password</label>
        <div class="password-input">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            id="password" 
            v-model="password" 
            placeholder="Create a password"
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
        <div v-if="passwordStrength" class="password-strength" :class="getPasswordStrengthClass">
          Password Strength: {{ passwordStrength }}
        </div>
      </div>
      
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input 
          :type="showConfirmPassword ? 'text' : 'password'" 
          id="confirmPassword" 
          v-model="confirmPassword" 
          placeholder="Confirm your password"
          required
        >
      </div>
      
      <div class="terms">
        <input 
          type="checkbox" 
          id="terms" 
          v-model="agreedToTerms"
          required
        >
        <label for="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
      </div>
      <p v-if="error" class="error">{{ error }}</p>
      
      <button 
        type="submit" 
        class="submit-btn"
        :disabled="!isFormValid" 
        :class="{ 'disabled': !isFormValid }"
      >
        Create Account
      </button>
    </form>
    
    <p class="switch-form">
      Already have an account? 
      <a href="#" @click="$emit('switch-to-login')">Sign in</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';

const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');
const showPassword = ref<boolean>(false);
const showConfirmPassword = ref<boolean>(false);
const agreedToTerms = ref(false);
const error = ref('');
const avatar = ref<File | null>(null);
const avatarPreview = ref<string>('');

const passwordStrength = computed(() => {
  if (!password.value) return '';
  if (password.value.length < 4) return 'Weak';
  if (password.value.length < 7) return 'Medium';
  return 'Strong';
});

const getPasswordStrengthClass = computed(() => {
  if (!password.value) return '';
  if (password.value.length < 4) return 'weak';
  if (password.value.length < 7) return 'medium';
  return 'strong';
});

const isFormValid = computed(() => {
  return (
    name.value && 
    email.value && 
    password.value && 
    password.value === confirmPassword.value && 
    password.value.length >= 7 &&
    agreedToTerms.value
  );
});

const handleAvatarChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    if (file.size > 2 * 1024 * 1024) {
      error.value = 'Image size should be less than 2MB';
      return;
    }
    avatar.value = file;
    avatarPreview.value = URL.createObjectURL(file);
  }
};

const removeAvatar = () => {
  avatar.value = null;
  avatarPreview.value = '';
  const input = document.getElementById('avatar-upload') as HTMLInputElement;
  if (input) input.value = '';
};

const handleSubmit = async () => {
  if (!isFormValid.value) return;
  error.value = '';
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('password', password.value);
    formData.append('password_confirmation', confirmPassword.value);
    if (avatar.value) {
      formData.append('avatar', avatar.value);
    }

    const response = await axios.post('https://grey-dotterel-732681.hostingersite.com/api/signup', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_id', response.data.user);    
      window.location.href = '/chat';
    }).catch((error) => {
      error.value = error.response?.data?.message || 'An error occurred during signup. Please try again.';
      
    });
  
};
</script>

<style scoped>
@import './SignupForm.css';
</style>