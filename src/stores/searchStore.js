import {defineStore, acceptHMRUpdate} from 'pinia'
import axios from "axios";

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
        constructUrl() {
            let pagination = ''
            let filter_expression = ''
            let sort_expression = ''

            if (this.page_number && this.page_size) {
                pagination = `?page=${this.page_number}&page_size=${this.page_size}`
            }

            let sort_conditions = []
            for (const key in this.sort) {
                const value = this.sort[key];
                if (value !== null) {
                    sort_conditions.push(`${key}:${value}`)
                }
            }
            if (sort_conditions.length > 0) {
                if (pagination !== '') {
                    sort_expression = `&sort=${sort_conditions.join(",")}`
                } else {
                    sort_expression = `?sort=${sort_conditions.join(",")}`
                }
            }

            let filter_conditions = []
            for (const key in this.filters) {
                const value = this.filters[key];
                if (value !== null) {
                    filter_conditions.push(`${key}:${value}`)
                }
            }
            if (filter_conditions.length > 0) {
                if (pagination !== '' && sort_expression !== '' || (pagination !== '' || sort_expression !== '')) {
                    filter_expression = `&filters=${filter_conditions.join(",")}`
                } else {
                    filter_expression = `?filters=${filter_conditions.join(",")}`
                }
            }
            return `/recipes/${pagination}${sort_expression}${filter_expression}`
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
                    this.previous_page = response.data.previous_page
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
        async getCategories() {
            try {
                let response = await axios.get('/categories/')
                if (response.status === 200) {
                    this.categories = response.data
                    return response.data
                }

            } catch (error) {
                console.log(error)
                return null
            }
        },
        async getIngredients(token) {
            try {
                let response = await axios.get('ingredients/',
                    {
                        headers: {'Authorization': 'Bearer ' + token}
                    })
                if (response.status === 200) {
                    this.ingredients = response.data
                    return response.data
                }
            } catch (error) {
                console.log(error)
                return null
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
            await this.getRecipes(url, token)
        },
        async nextPage(token) {
            await this.getRecipes(this.next_page, token)
        },
        async previousPage(token) {
            await this.getRecipes(this.previous_page, token)
        },
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
}