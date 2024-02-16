import { create } from 'zustand'
import axios from 'axios'

const getUser = () => axios.get('http://localhost:5555/me')

const login = (user) => axios.post('http://localhost:5555/login', user)

const logout = (user) =>  axios.delete('http://localhost:5555/logout', user)

const signup = (userData) => axios.post('http://localhost:5555/signup', userData)


export const useStore = create((set) => ({
    user: null,
    error: null,
    isLoading: null,
    getUser: async () => {
        try {
            set({ isLoading: true });
            const response = await getUser();
            set({ isLoading: false, user: response.data });
            console.log(response.data)
        } catch(err) {
            set({ error: err.message, isLoading: false });
        }
    },
    login: async (user) => {
        try {
            set({ isLoading: true, error: null });
            const response = await login(user);
            set({ isLoading: false, user: response.data, error: null })
        } catch(err) {
            set({ error: err.response.data.error, isLoading: false })
        }
    },
    logout: async () => {
        try {
            set({ isLoading: true });
            await logout();
            set({ isLoading: false, user: null });
        } catch(err) {
            set({ error: err.message, isLoading: false })
        }
    },
    signup: async (userData) => {
        try{
            set({ isLoading: true, error: null });
            const response = await signup(userData);
            set({ isLoading: false, user: response.data });
        } catch(err) {
            set({ error: err.response.data.error, isLoading: false })
        }
    },
    clearError: () => set({ error: null }),
    oauth: async (user) => {
        try {
            set({ user: user });
        } catch(err) {
            set({ error: err.message })
        }
    }
}))