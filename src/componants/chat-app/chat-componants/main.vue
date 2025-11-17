<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import "./main.css";
import phone from "@/assets/phone-icon.png";
import video from "@/assets/video-icon.png";
import sent from "@/assets/sent.png";
import axios from "axios";
import translate from "@/assets/translate.png";
import "@/echo";
import { useLastMessageStore } from "@/stores/lastmessageStore";
import { saveConversationMessages, getAllConversationsMessages, lastConversationsMessages } from "./aiMessagesMethodes";
import  {Languages}  from "./languages.js";
import { usesetConversation } from "@/stores/setconversationid";
import placeholder from "@/assets/placeholder.png";
import { useIsUserSelectedStore } from "@/stores/isuserselectedStore";
interface User {
  id: number;
  name: string;
  email: string;
  last_active_at: string;
  avatar_url: string | null;
  lastmessage: any;
  isonline?: boolean;        
  conversation_id?: number | null;  
}

const props = defineProps<{ 
  userId: number | null;
  conversationId: number | null;
  user: User | null;
  onlineUsers: User[];
  newMessage:any;
}>();

const newMessage = ref<string>('');
const messages = ref<any>([]);
const conversation_id = ref<number | null>(props.conversationId);
const lastMessageStore = useLastMessageStore();
const isloading = ref<boolean>(true);
const aiLoading = ref<boolean>(false);
const showtranslator=ref<boolean>(false);
const isOpen = ref<boolean>(false);
const selectedLanguage = ref<any>(null);
const searchQuery = ref<string>('');
const searchInput = ref<HTMLInputElement | null>(null);
const translateText = ref<string>('');
const istranslationLoading=ref<boolean>(false);
const setConversation=usesetConversation();
const isuserselected=useIsUserSelectedStore();
const filteredLanguages = computed(() => {
  if (!searchQuery.value.trim()) return Languages;
  const q = searchQuery.value.toLowerCase();
  return Languages.filter(l =>
    l.name.toLowerCase().includes(q) ||
    l.nativeName.toLowerCase().includes(q) ||
    l.code.toLowerCase().includes(q)
  );
});
const focusInput = () => {
  isOpen.value = true;
  nextTick(() => {
    searchInput.value?.focus();
  });
};

const handleSearch = () => {
  if (!isOpen.value) isOpen.value = true;
};

const selectLanguage = (language:any) => {
  selectedLanguage.value = language;
  localStorage.setItem('language', JSON.stringify(language));
  istranslationLoading.value=true;
  axios.post('https://grey-dotterel-732681.hostingersite.com/api/translate', {
    prompt: newMessage.value,
    language: language.code
  },{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }
).then((res) => {
  translateText.value = res.data.response;
  istranslationLoading.value=false;   
  }).catch((err) => {
    console.error('translate error', err);
    translateText.value="error while trying to translate"
    istranslationLoading.value=false;
  });
  isOpen.value = false;
};

watch(
  () => props.userId,
  async () => {
    isloading.value = true;
    if (!props.userId || props.userId === -1) {
      const storedMessages = await getAllConversationsMessages();
      messages.value = storedMessages.map(m => ({
        id: m.id,
        content: m.message,
        author_id: m.userID,
        created_at: new Date().toISOString()
      }));
      isloading.value = false;

      await nextTick(() => {
        const container = document.querySelector('.messages-container');
        if (container) container.scrollTop = container.scrollHeight;
      });
      return;
    }
    messages.value = [];
    axios.get('https://grey-dotterel-732681.hostingersite.com/api/messages', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      params: { to_user_id: props.userId }
    }).then((res) => {
      messages.value = res.data.messages;
      if (res.data.conversation_id) {
        conversation_id.value = res.data.conversation_id;
      }
      isloading.value = false;
      nextTick(() => {
        const container = document.querySelector('.messages-container');
        if (container) container.scrollTop = container.scrollHeight;
      });
    });
  }
);

watch(
  () => props.newMessage,
  () => {
    if (props.newMessage.conversation_id == props.conversationId || props.newMessage.userid==props.userId) {
      messages.value.push({
        id: Date.now(),
        content: props.newMessage.content,
        author_id: props.userId,
        created_at: new Date().toISOString(),
      });
      nextTick(() => {
        const container = document.querySelector('.messages-container');
        if (container) container.scrollTop = container.scrollHeight;
      });
    }
  }
);

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;

  if (props.userId === -1) {
    try {
      aiLoading.value = true;
      const message = newMessage.value;
    const context = await lastConversationsMessages();
      context.push({
        id: Date.now(),
        message,
        userID: localStorage.getItem("user_id"),
      });
      newMessage.value = "";
      messages.value.push({
        id: Date.now(),
        content: message,
        author_id: localStorage.getItem("user_id"),
        created_at: new Date().toISOString(),
      });
      nextTick(() => {
        const container = document.querySelector('.messages-container');
        if (container) container.scrollTop = container.scrollHeight;
      });
      const res = await axios.post(
          "https://grey-dotterel-732681.hostingersite.com/api/generate",
        { prompt: context },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await saveConversationMessages(Date.now(), message, localStorage.getItem("user_id"));
      await saveConversationMessages(Date.now() + 1, res.data.response, -1);
      messages.value.push({
        id: Date.now() + 1,
        content: res.data.response,
        author_id: -1,
        created_at: new Date().toISOString(),
      });

     
      await nextTick(() => {
        const container = document.querySelector(".messages-container");
        if (container) container.scrollTop = container.scrollHeight;
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
    aiLoading.value = false;
  } else {
    axios.post(
      'https://grey-dotterel-732681.hostingersite.com/api/sendmessage',
      { message: newMessage.value, to_user_id: props.userId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    ).then((res) => {
      if(props.conversationId==null){
        conversation_id.value = res.data.conversation_id;
        setConversation.setConversation(res.data.conversation_id, props.userId as number);
      }

      lastMessageStore.setLastMessage({
        lastmessage: newMessage.value,
        fromUserId: props.userId,
        created_at: new Date().toISOString(),
      });
      messages.value.push({
        id: Date.now(),
        content: newMessage.value,
        author_id: localStorage.getItem('user_id'),
        created_at: new Date().toISOString(),
      });
      newMessage.value = '';
      nextTick(() => {
        const container = document.querySelector('.messages-container');
        if (container) container.scrollTop = container.scrollHeight;
      });
    }).catch(error => {
      console.error('Error sending message:', error);
    });
  }
};

const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
};

onMounted(async () => {
  const container = document.querySelector('.messages-container');
  if(localStorage.getItem('language')){
   selectedLanguage.value = JSON.parse(localStorage.getItem('language') || '{}');
  }
  if (container) container.scrollTop = container.scrollHeight;
  if (props.userId !== -1) {
    axios.get('https://grey-dotterel-732681.hostingersite.com/api/messages', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: {
        to_user_id: props.userId
      }
    }).then((res) => {
      messages.value = res.data.messages;
      isloading.value = false;
      nextTick(() => {
        const container = document.querySelector('.messages-container');
        if (container) container.scrollTop = container.scrollHeight;
      });
      if (res.data.conversation_id) {
        conversation_id.value = res.data.conversation_id;
      }
    });
  } else {
    const storedMessages = await getAllConversationsMessages();
    messages.value = storedMessages.map(m => ({
      id: m.id,
      content: m.message,
      author_id: m.userID,
      created_at: new Date().toISOString()
    }));
    isloading.value = false;
    nextTick(() => {
      const container = document.querySelector('.messages-container');
      if (container) container.scrollTop = container.scrollHeight;
    });
  }
});

const isMobile = ref(window.innerWidth <= 525);
const emit = defineEmits<{ (e: 'back',user: null): void }>();
const handleBack = () =>{
emit('back',null)
isuserselected.setIsUserSelected(false);
} ;

const handletranslator = () => {
    showtranslator.value = !showtranslator.value; 
     
    istranslationLoading.value=true;
    if(!newMessage.value){
      istranslationLoading.value=false;
      return;
  }

  const persisted = localStorage.getItem('language');
  const persistedCode = persisted ? JSON.parse(persisted)?.code : undefined;
  const langCode = selectedLanguage.value?.code || persistedCode;

  if (showtranslator.value && langCode && newMessage.value) {
    axios.post('https://grey-dotterel-732681.hostingersite.com/api/translate', {
      prompt: newMessage.value,
      language: langCode
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      translateText.value = res.data.response;
      istranslationLoading.value=false;
    }).catch((err) => {
      console.error('translate error', err);
      translateText.value="error while trying to translate"
      istranslationLoading.value=false;
    });
  }
};
const handleApply=()=>{
   
    newMessage.value=translateText.value
   
    showtranslator.value=false;
    translateText.value=""
}

const handleClickOutside=()=>{
  isOpen.value=false
  showtranslator.value=false
  translateText.value="" 
}
</script>

<template>
  <div class="chat">
    <div v-if="user" class="chat-header">
      <div class="chat-header-info">
        <div v-show="isMobile" class="back-button" @click="handleBack">
          <span class="back-arrow"><</span>
          
          <img v-if="props.user.avatar_url" :src="props.user.avatar_url" alt="profile mobile img" class="chat-header-profile-image">
          <img v-else :src="placeholder" alt="profile mobile img" class="chat-header-profile-image">
        </div>
        <p class="chat-header-name">{{ props.user.name }}</p>
        <img v-if="props.user.avatar_url" :src="props.user.avatar_url" v-show="!isMobile" alt="profile img" class="chat-header-profile-image">
        <img v-else :src="placeholder" v-show="!isMobile" alt="profile img" class="chat-header-profile-image">
        <p v-if="(props.onlineUsers.some(u => u.id === props.user.id)||props.user.id===-1)" class="chat-header-online">online <span class="green-circle"></span></p>
        <p v-else class="chat-header-online">offline <span class="red-circle"></span></p>
      </div>
      <div class="chat-header-buttons">
        <img :src="phone" alt="phone" class="phone-image">
        <img :src="video" alt="video" class="video-image">
      </div>
    </div>

    <div v-if="user" class="chat-body" style="margin: 0;">
      <span v-if="isloading" class="messageloader"></span>
      <div v-else class="messages-container">
         
        <template v-for="msg in messages" :key="msg.id">
          <div 
            :class="{
              'sent-message-container': msg.author_id !== props.userId,
              'received-message-container': msg.author_id === props.userId,
             
            }"
          >
            <p :class="{
              'sent-message-text': msg.author_id !== props.userId,
              'received-message-text': msg.author_id === props.userId,
              
            }">
              {{ msg.content }}
            </p>
            <p :class="{
              'sent-message-time': msg.author_id !== props.userId,
              'received-message-time': msg.author_id === props.userId
            }">
              {{ msg.created_at.split('T')[0] }}
            </p>
          </div>
        </template>
          <div  class='received-message-container'
          style="padding-top: 20px;"
           v-if="aiLoading">
            <div class='aimessageloader '>
            </div>
          </div>
      </div>
    </div>
   

    <div v-if="user" class="chat-footer">
  <div v-if="showtranslator" class="translator-card" v-click-outside="handleClickOutside">
    <h2>Your Translation</h2>
     <span v-show="istranslationLoading" class="transaltor-loader"></span>
    <input  v-show="!istranslationLoading" type="text" v-model="translateText" readonly>

    <h1>Translate To</h1>

    <div class="custom-dropdown-wrapper" >
    <!-- Search Input -->
    <div 
      class="custom-dropdown"
      style="padding-left: 0px;
      padding-bottom: 0px;
      padding-top: 0px;
      "

      :class="{ 'dropdown-open': isOpen }"
      @click="focusInput"
    >
   
      <input
     
        ref="searchInput"
        v-model="searchQuery"
        type="text"
        class="lang-search-input"
        style="
        background-color: none;
        border: none;
       outline: none;
       width: 90%;
       height: 100%;
       margin: 0;
       padding: 0;
       padding-left: 15px;
       "
        placeholder="Search or select language..."
        @focus="isOpen = true"
        @input="handleSearch"
      >
      <div class="dropdown-arrow">▼</div>
    </div>
    
    <!-- Dropdown Options -->
    <div v-if="isOpen" class="dropdown-options">
      <div 
        v-for="language in filteredLanguages" 
        :key="language.code"
        class="dropdown-option"
        :class="{ 'option-selected': selectedLanguage && selectedLanguage.code === language.code }"
        @click="selectLanguage(language)"
      >
        <span class="option-text">{{ language.name }}</span>
        <span class="option-native">{{ language.nativeName }}</span>
      </div>
      
      <!-- No results message -->
      <div v-if="filteredLanguages.length === 0" class="no-results">
        No languages found for "{{ searchQuery }}"
      </div>
    </div>
    
    <!-- Selected language display (optional) -->
   
  </div>
   <div v-if="selectedLanguage && selectedLanguage.name" class="selected-display">
      Selected: <strong>{{ selectedLanguage.name }}</strong>
      <span class="selected-code">({{ selectedLanguage.code }})</span>
    </div>
    <button class="apply-button"
    @click="handleApply"
    >Apply</button>
  </div>
  
      <input 
        v-model="newMessage"
        @keydown.enter="handleKeyPress"
        class="chat-footer-input" 
        type="text" 
        placeholder="Type your message here" />
      <button class="translator-button" @click="handletranslator" >
        <img :src="translate" alt="globe" class="globe-image">
      </button>
      <button 
        @click="sendMessage"
        class="chat-footer-button"
        :disabled="!newMessage.trim()"
      >
        <img :src="sent" alt="sent" class="sent-image">
      </button>
    </div>
  </div>
</template>
