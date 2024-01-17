import {defineStore, acceptHMRUpdate} from 'pinia'
import axios from "axios";
import {getRecipes} from "../components/Recipes/helepers";

export const useRecipeStore = defineStore({
    id: 'recipe',
    state: () => ({
        recipes: [],
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
                        item.picture = await this.getImageById(item.picture, token)
                        const user = await this.getUserById(item.created_by, token)
                        item.created_by = user.username
                        this.recipes.push(item)
                    }
                    this.next_page = response.data.next_page
                }
            } catch (error) {
                console.log(error)
                return null
            }
        },
        async init(token) {
            if (this.recipes.length === 0) {
                let new_url = this.constructUrl()
                await this.getRecipes(new_url, token)
            }
        },
        async nextPage(token) {
            await this.getRecipes(this.next_page, token)
        },
        async getImageById(id, token) {
            try {
                const response = await axios.get(`/images/${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                if (response.status === 200) {
                    if (response.data.in_cloudinary === false) {
                        const url = response.data.url.replaceAll("\\", '/')
                        return `http://127.0.0.1:8000/${url}`
                    } else {
                        return response.data.url
                    }

                }
            } catch (e) {
                return null
            }
        },
        async getUserById(id, token) {
            try {
                const response = await axios.get(`/users/${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                if (response.status === 200) {
                    return response.data
                } else {
                    return {'username': `Anonymous`}
                }
            } catch (e) {
                return {'username': `${id}`}
            }
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRecipeStore, import.meta.hot))
}