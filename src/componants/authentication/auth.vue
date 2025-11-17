<template>
  <div class="auth-container">
    <div class="auth-content">
      <h1 class="logo">ChatApp</h1>
      
      <transition name="fade" mode="out-in">
        <component 
          :is="currentForm" 
          @switch-to-login="showLoginForm"
          @switch-to-signup="showSignupForm"
          @login-success="handleLoginSuccess"
          @signup-success="handleSignupSuccess"
        />
      </transition>
    </div>
    
    <div class="auth-image">
      <div class="overlay"></div>
      <div class="feature">
        <h2>Connect with friends and the world around you</h2>
        <p>Chat with your friends anytime, anywhere with our secure messaging platform.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import LoginForm from './LoginForm.vue';
import SignupForm from './SignupForm.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentForm = shallowRef<object>(LoginForm);

const showLoginForm = () => {
  currentForm.value = LoginForm;
};

const showSignupForm = () => {
  currentForm.value = SignupForm;
};

const handleLoginSuccess = () => {
  router.push('/chat');
};

const handleSignupSuccess = () => {

  showLoginForm();
};
</script>

<style scoped>
@import './auth.css';
</style>