<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import "./users.css";
import placeholder from '@/assets/placeholder.png';
import { useIsUserSelectedStore } from '@/stores/isuserselectedStore';

interface User {
  id: number;
  name: string;
  email: string;
  last_active_at: string;
  avatar_url: string | null;
  lastmessage: any;
}

const props = defineProps<{
  user: User
  isSelected: boolean
  isonline: boolean
  lastmessage: any;
  conversation_id: number | null;
  unreadmessages: boolean;
}>()

const emit = defineEmits<{
    (e: 'user-selected', user: User): void 
    (e: 'conversation_id', conversationId: number): void
}>();

const imageLoaded = ref(false);
const isuserselected=useIsUserSelectedStore();

const handleImageLoad = () => {
    imageLoaded.value = true;
};
const handleImageError = () => {
    imageLoaded.value = false;
};


onMounted(() => {
    if (props.user.avatar_url) {
        const img = new Image();
        img.onload = handleImageLoad;
        img.onerror = handleImageError;
        img.src = props.user.avatar_url;
    }
});

const classUserContainer = computed(() => ({
    'user-container': true,
    'user-container-active': props.isSelected&&isuserselected.isuserselected
}));

const classUserLastMessageTime = computed(() => ({
    'userchat-lastmessagetime': true,
    'userchat-lastmessagetime-online': props.isonline
}));

const handleClick = () => {
    emit('user-selected', props.user);
    if (props.conversation_id) {
        emit('conversation_id', props.conversation_id);
    }
};

const formatLastSeen = (dateString: string) => {
    if (!dateString) return 'Offline';
    const date = new Date(dateString);
    return `Last seen ${date.toLocaleString()}`;
};
</script>

<template>
    <div :class="classUserContainer" @click="handleClick">
        <img 
            v-show="!imageLoaded" 
            :src="placeholder" 
            alt="Loading..." 
            class="userchat-image"
        >
        <img 
            v-show="imageLoaded"
            :src="user.avatar_url" 
            @load="handleImageLoad" 
            @error="handleImageError"
            alt="user image" 
            class="userchat-image"
        >
        <div class="user-info">
            <p class="userchat-name">{{ user.name }}</p>
            <p class="userchat-lastmessage">
                {{ props.lastmessage?.content || 'you never talked' }}
            </p>
            <p :class="classUserLastMessageTime" :style="(isonline || user.id===-1)&& 'color: green'">
                {{ (isonline || user.id===-1) ? 'Online' : formatLastSeen(user.last_active_at) }}
                <p v-if="props.unreadmessages" class="unread-messages">new</p>
            </p>       
        </div>
    </div>
</template>