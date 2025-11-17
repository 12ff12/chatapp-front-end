<template>
  <router-view />
</template>

<style>
/* Global styles */
:root {
  --primary: #6b46c1;
  --primary-light: #9f7aea;
  --primary-dark: #553c9a;
  --gray-100: #f7fafc;
  --gray-200: #edf2f7;
  --gray-300: #e2e8f0;
  --gray-400: #cbd5e0;
  --gray-500: #a0aec0;
  --gray-600: #718096;
  --gray-700: #4a5568;
  --gray-800: #2d3748;
  --gray-900: #1a202c;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.5;
  color: var(--gray-800);
  background-color: var(--gray-100);
}

a {
  color: var(--primary);
  text-decoration: none;
}

button, input, textarea {
  font-family: inherit;
  font-size: 1rem;
}

button {
  cursor: pointer;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--gray-200);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: var(--gray-400);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--gray-500);
}
</style>