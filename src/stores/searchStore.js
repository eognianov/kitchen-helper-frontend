import {defineStore, acceptHMRUpdate} from 'pinia'
import {getRequest, constructUrl} from './helpers'

export const useSearchStore = defineStore({
    id: 'search',
    state: () => ({
        recipes: [],
        categories: [],
        ingredients: [],
        recipeOfTheDay: [],
        topFirst: [],
        topSecond: [],
        topThird: [],
        page_size: 6,
        page_number: 1,
        previous_page: null,
        next_page: null,
        total_pages: null,
        total_items: null,
        filters: {
            category: null,
            created_by: null,
            period: null,
            ingredient: null,
            search: null,
            deleted: null,
            published: null,
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
                this.previous_page = response.data.previous_page
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
        async getIngredients() {
            let response = await getRequest('/ingredients/', null)
            if (response.status === 200) {
                this.ingredients = response.data
                return response.data
            }
        },
        resetSearch() {
            this.recipes = []
            this.page_size = null
            this.page_number = null
            this.filters.category = null
            this.filters.created_by = null
            this.filters.period = null
            this.filters.ingredient = null
            this.filters.search = null
            this.filters.deleted = null
            this.filters.published = null
            this.sort.id = null
            this.sort.name = null
            this.sort['category.name'] = null
            this.sort.created_by = null
            this.sort.created_on = null
            this.sort.updated_on = null
            this.sort['category.id'] = null
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
        async previousPage(token) {
            await this.fillRecipes(this.previous_page, token)
        },
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
}