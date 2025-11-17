// src/stores/notificationsfrom.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationStore = defineStore('notifications', () => {
  const newMessageConversations = ref<number[]>([]);

  function addConversation(id: number) {
    if (!newMessageConversations.value.includes(id)) {
      newMessageConversations.value.push(id);
    }
    
  }

  function getConversations() {
    return newMessageConversations.value;
  }

  function removeConversation(id: number) {
    newMessageConversations.value = newMessageConversations.value.filter(x => x !== id);
  }

  return {
    newMessageConversations,
    addConversation,
    getConversations,
    removeConversation
  };
});