import {defineStore, acceptHMRUpdate} from 'pinia'
import axios from "axios";

export const useRecipeStore = defineStore({
    id: 'recipe',
    state: () => ({
        recipes: [],
        recipeOfTheDay: [],
        topBreakfast: [],
        topLunch: [],
        topDinner: [],
        page_size: 6,
        page: 1,
        previous_page: null,
        next_page: null,
        total_pages: null,
        total_items: null,
        sort_expression: '',
        filter_expression: '',
        filters: {
            category: null,
            complexity: null,
            time_to_prepare: null,
            created_by: null,
            period: null,
            ingredient: null,
            title: null,
            summary: null,
            any: null,
        },
        sort: {
            id: null,
            name: null,
            created_by: null,
            time_to_prepare: null,
            created_on: null,
            updated_on: null,
            complexity: null,
            'category.name': null,
            'category.id': null,
        }

    }),
    actions: {
        constructUrl() {
            let sort_f = []
            for (const key in this.sort) {
                const value = this.sort[key];
                if (value !== null) {
                    sort_f.push(`${key}:${value}`)
                }
            }
            if (sort_f.length > 0) {
                this.sort_expression = `&sort=${sort_f.join(",")}`
            }
            let filter_f = []
            for (const key in this.filters) {
                const value = this.filters[key];
                if (value !== null) {
                    filter_f.push(`${key}:${value}`)
                }
            }
            if (filter_f.length > 0) {
                this.filter_expression = `&filters=${filter_f.join(",")}`
            }
            return `/recipes/?page=${this.page}&page_size=${this.page_size}${this.sort_expression}${this.filter_expression}`
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
                }
            } catch (error) {
                console.log(error)
                return null
            }
        },
        async getOneRecipe(url, token) {
            try {
                let response = await axios.get(url, {
                    headers: {'Authorization': 'Bearer ' + token}
                })
                if (response.status === 200) {
                    const OneRecipe = response.data.recipes[0]

                    return OneRecipe
                }
            } catch (error) {
                console.log(error)
                return null
            }
        },
        async init(token) {
            if (this.recipeOfTheDay.length === 0) {
                const url = '/recipes/?page=1&page_size=1&sort=id:desc'
                this.recipeOfTheDay.push(await this.getOneRecipe(url, token))
            }
            if (this.topBreakfast.length === 0) {
                const url = 'recipes/?page=1&page_size=1&filters=category:4&sort=id:desc'
                this.topBreakfast.push(await this.getOneRecipe(url, token))
            }
            if (this.topLunch.length === 0) {
                const url = 'recipes/?page=1&page_size=1&filters=category:2&sort=id:desc'
                this.topLunch.push(await this.getOneRecipe(url, token))
            }
            if (this.topDinner.length === 0) {
                const url = 'recipes/?page=1&page_size=1&filters=category:3&sort=id:desc'
                this.topDinner.push(await this.getOneRecipe(url, token))
            }
            if (this.recipes.length === 0) {
                let new_url = this.constructUrl()
                await this.getRecipes(new_url, token)
            }
        },
        async nextPage(token) {
            await this.getRecipes(this.next_page, token)
        },
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRecipeStore, import.meta.hot))
}