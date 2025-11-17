<script setup lang="ts">
import "@/componants/chat-app/app.css";
import UsersList from "@/componants/chat-app/users-componants/main.vue";
import ChatWindow from "@/componants/chat-app/chat-componants/main.vue";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useLastMessageStore } from "@/stores/lastmessageStore";
import { useNotificationStore } from "@/stores/notificationsfrom";
import { usesetConversation } from "@/stores/setconversationid";
import { useNotificationUserStore } from "@/stores/notificationuserStore";

const notificationuserStore = useNotificationUserStore();
const echoInstance =ref<any>(null)
const lastMessageStore = useLastMessageStore();
const notificationsFrom=useNotificationStore()
const onlineUsers = ref([]);
const newMessage=ref<object>({})
const selectedUserId = ref<number | null>(null);
const selectedUser = ref<User | null>(null);
const isMobile = ref<boolean>(window.innerWidth <= 425);
const currentConversationId = ref<number | null>(null);
const setConversation=usesetConversation();
const isuserpicked=ref<boolean>(false)

interface User {
  id: number;
  name: string;
  sort?: number;
  email: string;
  last_active_at: string;
  avatar_url: string | null;
  lastmessage: any;
  isonline?: boolean;        
  conversation_id?: number | null;
  unreadmessages?: boolean;
}

const handleResize = () => {
  isMobile.value = window.innerWidth <= 525;
};

onMounted(() => {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
        
    });
}
  window.addEventListener('resize', handleResize);
  echoInstance.value = window.Echo.private('newMessage.'+localStorage.getItem('user_id'));

  
echoInstance.value.listen('newMessage', (e:any) => {
    newMessage.value={
      conversation_id: e.conversationId,
      content: e.message.content,
      userid: e.user.id,
    }
    lastMessageStore.setLastMessage({
      lastmessage: e.message.content,
      fromUserId: e.user.id,
      created_at: e.message.created_at,
    })
    setConversation.setConversation(e.conversationId,e.user.id);
    notificationuserStore.setUser(e.user);
    notificationuserStore.setMessage(e.message);
    notificationuserStore.setConversationId(e.conversationId);
    notificationsFrom.addConversation(e.conversationId)

     if (Notification.permission === "granted") {
            new Notification(`New message from ${e.user.name}`, {
                body: e.message.content
            });
        }
 
});

echoInstance.value = window.Echo.join('online-users')
    .here(users => {
        onlineUsers.value = users;
    })
    .joining(user => {
        onlineUsers.value.push(user);
      
    })
    .leaving(user => {
        onlineUsers.value = onlineUsers.value.filter(u => u.id !== user.id);
      
    });
});

onUnmounted(() => {
 
  window.removeEventListener('resize', handleResize);
});

// Show users list if:
// - Not on mobile, OR
// - On mobile AND no user is selected
const showUsers = computed(() => {
  return !isMobile.value || selectedUserId.value === null;
});

// Show chat if:
// - Not on mobile, OR
// - On mobile AND a user is selected
const showChat = computed(() => {
  return !isMobile.value || selectedUserId.value !== null;
});

const handleUserSelected = (user: User) => {

  selectedUserId.value = user.id;
  selectedUser.value = user;
}

const handleConversationSelected = (conversationId: number | null) => {
  currentConversationId.value = conversationId;
 
};

const handleBack = () => {
  selectedUserId.value = null;
  selectedUser.value = null;
  currentConversationId.value = null;
  isuserpicked.value=false;
};

</script>

<template>
  <div class="chat-layout">
    <!-- Users List - Hidden on mobile when a user is selected -->
    <div class="users-container" v-show="showUsers"> 
      <UsersList  @user-selected="handleUserSelected"
      @conversation-selected="handleConversationSelected"
      :onlineUsers="onlineUsers"
      :new-message="newMessage"
      ></UsersList>

    </div>
    
    <!-- Chat Window - Hidden on mobile when no user is selected -->
    <div class="chat-container" v-show="showChat"> 
     <ChatWindow 
      :user-id="selectedUserId"
      :user="selectedUser"
      :conversation-id="currentConversationId"
      :online-users="onlineUsers"
      :new-message="newMessage"
      v-if="selectedUserId !== null" 
      @back="handleBack"
    />
    </div>
  </div>
</template>

<!-- Your existing styles remain unchanged -->
<style scoped>
.chat-layout {
  display: flex;
  height: 100vh;
  width: 100%;
}
</style>