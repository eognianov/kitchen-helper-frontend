import {defineStore, acceptHMRUpdate} from 'pinia'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        logged: false,
        title: 'My counter title'
    }),
    actions: {
        login() {
            this.logged = true
        },
        logout() {
            this.logged = false
        }
    }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}