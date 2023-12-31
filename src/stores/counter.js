import {defineStore, acceptHMRUpdate} from 'pinia'

export const useCounterStore = defineStore({
    id: 'counter',
    state: () => ({
        count: 0,
        title: 'My counter title'
    }),
    actions: {
        increase() {
            this.count ++
        },
        decrease() {
            this.count --
        }
    }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot))
}