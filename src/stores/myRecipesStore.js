import {defineStore, acceptHMRUpdate} from 'pinia'
import axios from "axios";

export const useMyRecipesStore = defineStore({
    id: 'myRecipes',
    state: () => ({
        recipes: [],
        categories: [],
        page_size: null,
        page_number: null,
        next_page: null,
        total_pages: null,
        total_items: null,
        filters: {
            created_by: null,
        },
    }),
    actions: {
        constructUrl() {
            let pagination = ''
            let filter_expression = ''

            if (this.page_number && this.page_size) {
                pagination = `?page=${this.page_number}&page_size=${this.page_size}`
            }

            let filter_conditions = []
            for (const key in this.filters) {
                const value = this.filters[key];
                if (value !== null) {
                    filter_conditions.push(`${key}:${value}`)
                }
            }
            if (filter_conditions.length > 0) {
                if (pagination !== '' || pagination !== '') {
                    filter_expression = `&filters=${filter_conditions.join(",")}`
                } else {
                    filter_expression = `?filters=${filter_conditions.join(",")}`
                }
            }
            return `/recipes/${pagination}${filter_expression}`
        },

        async getRecipes(url, token) {
            try {
                let response = await axios.get(url, {
                    headers: {'Authorization': 'Bearer ' + token}
                })
                if (response.status === 200) {
                    for (const item of response.data.recipes) {
                        this.recipes.push(item)
                    }
                    this.next_page = response.data.next_page
                    this.total_pages = response.data.total_pages
                    this.total_items = response.data.total_items
                    this.page_number = response.data.page_number
                    this.page_size = response.data.page_size
                }
            } catch (error) {
                console.log(error)
                return null
            }
        },
        async searchTrigger(token) {
            this.recipes = []
            const url = this.constructUrl()
            await this.getRecipes(url, token)
        },
        async nextPage(token) {
            await this.getRecipes(this.next_page, token)
        },
        resetStore() {
            this.recipes = []
            this.categories = []
            this.page_size = null
            this.page_number = null
            this.next_page = null
            this.total_pages = null
            this.total_items = null
            this.filters.created_by = null
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMyRecipesStore, import.meta.hot))
}