import {defineStore, acceptHMRUpdate} from 'pinia'
import axios from "axios";
import VueJwtDecode from 'vue-jwt-decode';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        logged: false,
        user: null,
        title: 'My counter title'
    }),
    actions: {
        async init() {
            try {
                let token = localStorage.getItem('token')
                if (token) {
                    let decoded = VueJwtDecode.decode(token);
                    let response = await axios.get(`users/${decoded.sub}/`)
                    if (response.status === 200) {
                        this.user = response.data
                        this.logged = true;
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
        async login(username, password) {
            try {
                const response = await axios.post(`/users/signin`, {
                    username: username,
                    password: password
                }, {
                    headers: {"Content-Type": "multipart/form-data"}
                })
                let token = response.data.access_token

                localStorage.setItem('token', token);

                if (token) {
                    let decoded = VueJwtDecode.decode(token);
                    let response = await axios.get(`users/${decoded.sub}/`)

                    if (response.status === 200) {
                        this.user = response.data
                        this.logged = true;
                    }
                }
            } catch (error) {
                if (error.response) {
                    throw new Error(error.response.data.detail);
                } else if (error.request) {
                    throw new Error('Something went wrong. Please try again later.');
                } else {
                    throw new Error('Something went wrong. Please try again later.');
                }
            }
        },
        logout() {
            localStorage.removeItem('token')
            this.user = null;
            this.logged = false
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}