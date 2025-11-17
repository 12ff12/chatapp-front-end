import { defineStore } from 'pinia'

interface LastMessage {
    lastmessage: string;
    fromUserId: number;
    created_at: string;
}

export const useLastMessageStore = defineStore('lastmessage', {
    state: () => ({
        messages: [] as LastMessage[]
    }),
    
    actions: {
        setLastMessage(message: LastMessage) {
            const index = this.messages.findIndex(m => m.fromUserId === message.fromUserId);
            if (index !== -1) {
                this.messages[index] = message;
                
            } else {
                this.messages.push(message);
            }
        },
        
        getLastMessage(fromUserId: number): LastMessage | undefined {
            return this.messages.find(message => message.fromUserId === fromUserId);
        }
    },
});
