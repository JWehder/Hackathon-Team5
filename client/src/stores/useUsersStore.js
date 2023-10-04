import { create } from 'zustand'
import axios from 'axios'

const getUser = () => axios.get("http://localhost:5555/me")

const login = (user) => axios.post('/login', user)

const logout = () => axios.delete('/logout')

const signup = (userData) => axios.post('http://localhost:5555/signup', userData)

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
    logout: async () => {
        try {
            set({ isLoading: true });
            const response = await logout();
            set({ isLoading: false, user: response.data });
        } catch(err) {
            set({ error: err.message, isLoading: false })
        }
    },
    signup: async (userData) => {
        try{
            console.log(userData)
            set({ isLoading: true });
            const response = await signup(userData);
            set({ isLoading: false, user: response.data });
        } catch(err) {
            set({ error: err.message, isLoading: false })
        }
    }
}))