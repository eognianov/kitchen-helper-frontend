import {defineStore, acceptHMRUpdate} from 'pinia'
import axios from "axios";
import VueJwtDecode from 'vue-jwt-decode';
import {ref} from "vue";
import {tr} from "vuetify/locale";

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
                localStorage.setItem('token', response.data.access_token);
                this.logged = true

            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data.detail);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    throw new Error(error.response.data.detail);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    // console.log(error.request);
                    console.log(error.request)
                    throw new Error('Something went wrong. Please try again later.');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    // console.log('Error', error.message);
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