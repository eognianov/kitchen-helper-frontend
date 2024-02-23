import {defineStore, acceptHMRUpdate} from 'pinia'
import {constructUrl, getRequest} from './helpers'

export const useRecipeStore = defineStore({
    id: 'recipe',
    state: () => ({
        recipes: [],
        categories: [],
        ingredients: [],
        recipeOfTheDay: [],
        topFirst: [],
        topSecond: [],
        topThird: [],
        page_size: null,
        page_number: null,
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
        async getOneRecipe(url, token) {
            let response = await getRequest(url, token)
            if (response.status === 200) {
                return response.data.recipes[0]
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
        async init(token) {
            this.recipes = []
            if (this.categories.length === 0) {
                await this.getCategories()
            }
            if (this.ingredients.length === 0) {
                await this.getIngredients()
            }
            if (this.recipeOfTheDay.length === 0) {
                const url = '/recipes/?page=1&page_size=1&sort=id:desc'
                const newRecipe = await this.getOneRecipe(url, token)
                if (newRecipe) {
                    this.recipeOfTheDay.push(await this.getOneRecipe(url, token))
                }
            }
            if (this.topFirst.length === 0) {
                const url = 'recipes/?page=1&page_size=1&filters=category:1&sort=id:desc'
                const newRecipe = await this.getOneRecipe(url, token)
                if (newRecipe) {
                    this.topFirst.push(await this.getOneRecipe(url, token))
                }
            }
            if (this.topSecond.length === 0) {
                const url = 'recipes/?page=1&page_size=1&filters=category:2&sort=id:desc'
                const newRecipe = await this.getOneRecipe(url, token)
                if (newRecipe) {
                    this.topSecond.push(await this.getOneRecipe(url, token))
                }
            }
            if (this.topThird.length === 0) {
                const url = 'recipes/?page=1&page_size=1&filters=category:3&sort=id:desc'
                const newRecipe = await this.getOneRecipe(url, token)
                if (newRecipe) {
                    this.topThird.push(await this.getOneRecipe(url, token))
                }
            }
            if (this.recipes.length === 0) {
                this.page_number = 1
                this.page_size = 6
                let new_url = constructUrl(this.page_number, this.page_size, this.sort, this.filters)
                await this.fillRecipes(new_url, token)
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
            const url = this.constructUrl()
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
    import.meta.hot.accept(acceptHMRUpdate(useRecipeStore, import.meta.hot))
}