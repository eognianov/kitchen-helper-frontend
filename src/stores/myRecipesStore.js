import {defineStore, acceptHMRUpdate} from 'pinia'
import {getRecipes} from './helpers'

export const useMyRecipesStore = defineStore({
    id: 'myRecipes',
    state: () => ({
        recipes: []
    }),
    actions: {
        async searchTrigger(token, user) {
            this.recipes = []
            let url = `/recipes/?filters=created_by:${user}`
            let response = await getRecipes(url, token)
            if (response.status === 200) {
                for (const item of response.data.recipes){
                    this.recipes.push(item)
                }
            }
        },
        resetStore() {
            this.recipes = []
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMyRecipesStore, import.meta.hot))
}