import { createRouter, createWebHistory } from 'vue-router';
import Auth from '@/componants/authentication/auth.vue'; // Fixed spelling: components
import Chat from '@/componants/chat-app/chat.vue'; // Fixed spelling: components

// Create a proper authentication check function
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  // Add token validation logic if needed (expiration check, etc.)
  return token !== null && token !== 'undefined';
};

const routes = [
  {
    path: '/',
    redirect: () => {
      return isAuthenticated() ? '/chat' : '/auth';
    },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    // Prevent authenticated users from accessing auth page
    meta: { requiresGuest: true },
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    meta: { requiresAuth: true },
  },
] as const;

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Enhanced navigation guard
router.beforeEach((to, from, next) => {
  const authenticated = isAuthenticated();
  
  if (to.meta.requiresAuth && !authenticated) {
    next('/auth');
  } else if (to.meta.requiresGuest && authenticated) {
    next('/chat'); // Redirect authenticated users away from auth page
  } else {
    next();
  }
});

export default router;