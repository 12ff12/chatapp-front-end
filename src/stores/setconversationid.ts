import { defineStore } from 'pinia'

export const usesetConversation = defineStore('setconversation', {
    state: () => ({
        id: null as number | null,
        conversation_id: null as number | null
    }),
    actions: {
        setConversation(conversation_id: number,id:number) {
            this.conversation_id = conversation_id;
            this.id = id;
        }
    }
});
