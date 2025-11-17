import { defineStore } from 'pinia'
export const useIsUserSelectedStore = defineStore('isuserselected', {
    state: () => ({
        isuserselected: false
    }),
    actions: {
        setIsUserSelected(value: boolean) {
            this.isuserselected = value;
        }
    }
});
