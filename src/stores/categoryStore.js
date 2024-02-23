import {defineStore, acceptHMRUpdate} from 'pinia'
import {constructUrl, getRequest} from './helpers'

export const useCategoryStore = defineStore({
    id: 'category',
    state: () => ({
        recipes: [],
        categories: [],
        page_size: 6,
        page_number: 1,
        next_page: null,
        total_pages: null,
        total_items: null,
        filters: {
            category: null,
        },
        sort: {
            id: null,
            name: null,
            'category.name': null,
            created_by: null,
            created_on: null,
            updated_on: null,
            'category.id': null,
        }
    }),
    actions: {
        async fillRecipes(url, token) {
            let response = await getRequest(url, token)
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
        },
        async getCategories() {
            let response = await getRequest('/categories/', null)
            if (response.status === 200) {
                this.categories = response.data
                return response.data
            }
        },
        resetSearch() {
            this.recipes = []
            this.filters.category = null
            this.sort.id = null
            this.sort.name = null
            this.sort['category.name'] = null
            this.sort.created_on = null
        },
        async searchTrigger(token) {
            this.page_number = 1
            this.recipes = []
            const url = constructUrl(this.page_number, this.page_size, this.sort, this.filters)
            await this.fillRecipes(url, token)
        },
        async nextPage(token) {
            await this.fillRecipes(this.next_page, token)
        },
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot))
}