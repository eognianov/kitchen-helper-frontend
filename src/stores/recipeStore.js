import {defineStore, acceptHMRUpdate} from 'pinia'
import axios from "axios";

export const useRecipeStore = defineStore({
    id: 'recipe',
    state: () => ({
        recipes: [],
        categories: [],
        ingredients: [],
        recipeOfTheDay: [],
        topBreakfast: [],
        topLunch: [],
        topDinner: [],
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
            created_by: null,
            created_on: null,
            updated_on: null,
            'category.name': null,
            'category.id': null,
        }
    }),
    actions: {
        constructUrl() {
            let pagination = ''
            let filter_expression = ''
            let sort_expression = ''

            if (this.page && this.page_size) {
                pagination = `?page=${this.page}&page_size=${this.page_size}`
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
                if (pagination !== '' || sort_expression !== '') {
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
                        item.picture = await this.getImageById(item.picture, token)
                        const user = await this.getUserById(item.created_by, token)
                        item.created_by = user.username
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
        async getOneRecipe(url, token) {
            try {
                let response = await axios.get(url, {
                    headers: {'Authorization': 'Bearer ' + token}
                })
                if (response.status === 200) {
                    const OneRecipe = response.data.recipes[0]
                    OneRecipe.picture = await this.getImageById(OneRecipe.picture, token)
                    const user = await this.getUserById(OneRecipe.created_by, token)
                    OneRecipe.created_by = user.username
                    return OneRecipe
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
        async init(token) {
            if (this.categories.length === 0) {
                await this.getCategories()
            }
            if (this.ingredients.length === 0 && token) {
                await this.getIngredients(token)
            }
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
                this.page = 1
                this.page_size = 6
                let new_url = this.constructUrl()
                await this.getRecipes(new_url, token)
            }
        },
        async searchTrigger(token) {
            const url = this.constructUrl()
            console.log(url)
            await this.getRecipes(url, token)
        },
        async nextPage(token) {
            await this.getRecipes(this.next_page, token)
        },
        async previousPage(token) {
            await this.getRecipes(this.previous_page, token)
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
                return {'username': 'Anonymous'}
            }
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRecipeStore, import.meta.hot))
}