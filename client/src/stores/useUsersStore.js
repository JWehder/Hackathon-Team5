import { create } from 'zustand'
import axios from 'axios'

const getUser = axios.get("/me")

const login = (user) => axios.post('/login', user)

export const useStore = create((set) => ({
    user: null,
    error: null,
    isLoading: null,
    getUser: async () => {
        try {
            set({ isLoading: true });
            const response = await getUser();
            set({ isLoading: false, data: response.data });
        } catch(err) {
            set({ error: err.message, isLoading: false });
        }
    },
    login: async (user) => {
        try {
            set({ isLoading: true });
            const response = await login(user);
            set({ isLoading: false, data: response.data })
        } catch(err) {
            set({ error: err.message, isLoading: false })
        }
    },
    logout:
}))