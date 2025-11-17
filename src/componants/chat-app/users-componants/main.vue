<script setup lang="ts">
import "./main.css";
import usersContainer from "./users.vue";
import { ref,onMounted,onUnmounted } from 'vue';
import axios from "axios";
import '@/echo.js';
import { watch } from 'vue';
import { useLastMessageStore } from '@/stores/lastmessageStore';
import { useNotificationStore } from "@/stores/notificationsfrom";
import debounce from 'lodash/debounce';
import placeholder from '@/assets/placeholder.png';
import gemini from '@/assets/gemini.jpg';
import { usesetConversation } from "@/stores/setconversationid";
import { useIsUserSelectedStore } from '@/stores/isuserselectedStore';
import { useNotificationUserStore } from '@/stores/notificationuserStore';

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


const props = defineProps<{onlineUsers: User[],newMessage: any}>()
const enableScrolling = ref<boolean>(false);
const echoInstance =ref<any>(null)




const users = ref<User[]>([{
    id: -1,
    name: "gemini ai",
    sort: 1,
    email: "gemini@ai.com",
    last_active_at: null,
    avatar_url: gemini,
    lastmessage: "unkown",
    isonline: true,
    conversation_id: -1,
    unreadmessages: false
}]);
const UserProfile = ref<User | null>(null);
const selectedUserId = ref<number>(0);
const currentConversationId=ref<number>(null)
const loading=ref<boolean>(true)  
const imageLoaded = ref(false);  
const windowHeight = ref(window.innerHeight);
const isuserselected=useIsUserSelectedStore();
const searchQuery = ref('');
const lastMessageStore = useLastMessageStore();
const notificationsFrom=useNotificationStore();
const setConversation=usesetConversation();
const notificationuserStore = useNotificationUserStore();
watch(
    () => notificationuserStore.user,
    () => {
        if(notificationuserStore.user==null ){
            return;
        }
        const user = notificationuserStore.user;
        const message = notificationuserStore.message;
        const conversationId = notificationuserStore.conversationId;
        const index = users.value.findIndex(u => u.id === user.id);
        if (index === -1) {
            users.value.unshift({
                id: user.id,
                name: user.name,
                email: user.email,
                last_active_at: user.last_active_at,
                avatar_url: user.avatar,
                lastmessage: message.content,
                isonline: user.isonline,
                conversation_id: conversationId,
                unreadmessages: true
            });
        } 
    }
)

watch(
    () => setConversation.conversation_id,
    () => {
        if(setConversation.conversation_id==null ){
            return;
        }
        const conversationId = setConversation.conversation_id;
        const id=setConversation.id;
        users.value.forEach(
            (user) => {
                if(user.id === id){
                    user.conversation_id = conversationId;
                    
                }
            }
        )            
    }
)
watch(
  () => lastMessageStore.messages,
  () => {
    const mapped = users.value.map(user => {
      if (user.id) {
        const lastMessage = lastMessageStore.getLastMessage(user.id);
        if (lastMessage) {
          const hasNotification = user.conversation_id != null && notificationsFrom.getConversations().includes(user.conversation_id as number);
          if (hasNotification) {
            notificationsFrom.removeConversation(user.conversation_id as number);
          }
          return {
            ...user,
            // Use last message time (ms) so both sent and received updates bump the user up
            sort: new Date(lastMessage.created_at).getTime(),
            unreadmessages: hasNotification && selectedUserId.value !== user.id,
            lastmessage: { content: lastMessage.lastmessage }
          };
        }
      }
      return user;
    });
    const pinned = mapped.length > 0 ? [mapped[0]] : [];
    const rest = mapped.slice(1).sort((a, b) => (b.sort ?? 0) - (a.sort ?? 0));
    users.value = [...pinned, ...rest];
  },
  { deep: true }
);
const handleImageLoad = () => {
    imageLoaded.value = true;
};
const handleImageError = () => {
    imageLoaded.value = false;
};


   



onMounted(() => {
    
    axios.get('http://localhost:8000/api/users', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    }).then((res) => {
        users.value =[...users.value,...res.data.users];
        loading.value = false;        
        if(windowHeight.value < 90*res.data.users.length){
            enableScrolling.value = true;
        }
    });

    axios.get('http://localhost:8000/api/myprofile', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    }).then((res) => {
        UserProfile.value = res.data;
        if (UserProfile.value?.avatar_url) {
            const img = new Image();
            img.onload = handleImageLoad;
            img.onerror = handleImageError;
            img.src = UserProfile.value.avatar_url;
        }
       
    }).catch(error => {
        console.error('Error loading user profile:', error);
        imageLoaded.value = false;
    });
});


onUnmounted(() => {
   echoInstance.value.leave('online-users');
});


const logout = () => {
    
   axios.post(
  'http://localhost:8000/api/logout',
  {},
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
)
.then((res) => {
  localStorage.removeItem('token');
  window.location.href = '/auth';
})
.catch((err) => {
  alert("Logout error");
  console.error(err.response);
});
    
};

const emit = defineEmits<{
  (e: 'user-selected', userId: User): void
  (e: 'conversation-selected', conversationId: number | null): void
}>()


const handleUserSelected = async (userId: User, conversationId: number | null) => {

    selectedUserId.value = userId.id;
    currentConversationId.value = conversationId;
    isuserselected.setIsUserSelected(true);
    if(userId.id === -1){
        emit('user-selected', userId);
        emit('conversation-selected', conversationId);
        return;
    }
    emit('user-selected', userId);
    emit('conversation-selected', conversationId);
    if(conversationId==null){
        return;
    }
    axios.post('http://localhost:8000/api/markasread',
    {
        conversation_id: conversationId,
        fromuserId: userId.id
    },
    {
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    }
    
    )
    users.value.forEach(
        (user) => {
            if(user.id === userId.id){
                user.unreadmessages = false;
            }
        }
    )
    
 
};


const handleSearch = debounce(() => {
    loading.value=true;
  if (!searchQuery.value.trim()){
 axios.get('http://localhost:8000/api/users',{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    }).then((res) => {
        users.value =[{
    id: -1,
    name: "gemini ai",
    email: "gemini@ai.com",
    last_active_at: "",
    avatar_url: gemini,
    lastmessage: "unkown",
    isonline: true,
    conversation_id: -1,
    unreadmessages: false
},...res.data.users];
        loading.value=false;
         if(windowHeight.value < 90*res.data.users.length){
            enableScrolling.value = true;
        }else{
            enableScrolling.value = false;
        }
    })
    return;
  } 

  axios.get('http://localhost:8000/api/findUser', {
    params: { search: searchQuery.value },
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
  .then(res => { users.value =[{
    id: -1,
    name: "gemini ai",
    email: "gemini@ai.com",
    last_active_at: "",
    avatar_url: gemini,
    lastmessage: "unkown",
    isonline: true,
    conversation_id: -1,
    unreadmessages: false
},...res.data.users]; 
    loading.value=false;
    if(windowHeight.value < 90*res.data.users.length){
            enableScrolling.value = true;
        }else{
            enableScrolling.value = false;
        }
  })
  .catch(err => console.error(err));
}, 300);


</script>
<template>
    <!-- Sidebar with ID for CSS targeting -->
   <div id="sidebar" class="side-bar">
        <div class="sidebar-header">
            <img 
                v-if="UserProfile && UserProfile.avatar_url" 
                :src="UserProfile.avatar_url" 
                alt="Profile" 
                class="user-profile"
            />
            <div class="user-info">
                <h4 v-if="UserProfile" class="user-name">{{ UserProfile.name }}</h4>
                <p class="user-status">Online</p>
            </div>
            <a href="#" class="hide-sidebar">
                &times;
            </a>
        </div>

        <nav class="sidebar-nav">
            <a href="#" class="nav-item">
                <i>👤</i> Profile
            </a>
            <a href="#" class="nav-item">
                <i>🔔</i> Notifications
            </a>
            <a href="#" class="nav-item">
                <i>⚙️</i> Settings
            </a>
            <a href="#" class="nav-item">
                <i>🌙</i> Dark Mode
            </a>
            <a href="#" class="nav-item">
                <i>❓</i> Help & Support
            </a>
        </nav>

        <button class="logout-btn" @click="logout">
            <i>🚪</i> Logout
        </button>
    </div>

    <!-- Main Content -->
    <div class="converstion-container">
        <div class="search-container">
            <a href="#sidebar">
                <img 
                    v-if="UserProfile && UserProfile.avatar_url && imageLoaded" 
                    :src="UserProfile.avatar_url" 
                    @load="handleImageLoad" 
                    @error="handleImageError"
                    alt="Profile" 
                    class="user-profile"
                />
                <img 
                    v-else
                    :src="placeholder" 
                    alt="Profile Placeholder" 
                    class="user-profile"
                />
            </a>
            <input 
                v-model="searchQuery"
                class="search-input" 
                type="text" 
                placeholder="Search by email or name"
                 @input="(e: Event) => handleSearch(e)"
            >
        </div>
      <div class="userschat-container" :class="{ 'enable-scrolling': enableScrolling }">
    <span v-if="loading" class="loader"></span>
    <div v-else class="users-wrapper">

      <div 
        v-for="(user, index) in users" 
        :key="user.id"
        class="user-item"
        :style="`--delay: ${index * 0.1}s`"
      > 
        <usersContainer 
          :user="user"
          :isonline="props.onlineUsers.some(u => u.id === user.id)"
          :is-selected="selectedUserId === user.id"
          :lastmessage="user.lastmessage"
          :conversation_id="user.conversation_id"
          :unreadmessages="user.unreadmessages"
          @user-selected="(userId) => handleUserSelected(userId, user.conversation_id)"
          @conversation-selected="(id) => emit('conversation-selected', id)"
        />
      </div>
    </div>
  </div>
    </div>
</template>