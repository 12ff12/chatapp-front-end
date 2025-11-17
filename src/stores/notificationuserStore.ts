import { defineStore } from 'pinia'

export const useNotificationUserStore = defineStore('notificationUser', {
    state: () => ({
        user: null as any,
        message: null as any,
        conversationId: null as number | null
    }),
    actions: {
        setUser(user: any) {
            this.user = user;
        },
        setMessage(message: any) {
            this.message = message;
        },
        setConversationId(conversationId: number | null) {
            this.conversationId = conversationId;
        }
    }
});
