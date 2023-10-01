import { create } from 'zustand'


export const useStore = create((set) => ({
    user: null,
    error: null,
    isLoading: null,
    getUser: async () => {
        try {
            set({ isLoading: true })
            const 
        } catch(err) {
            set({ error: err.message, isLoading: false })
        }
    }
}))