<template>
    <div>
        <h2>Recipes</h2>
        <div class="search-container">
            <input type="text" v-model="searchQuery" placeholder="Search for recipe..." />
        </div>
        <div class="table-wrapper">
            <table class="table table-striped table-hover user-table-container">
                <thead>
                    <tr>
                        <th scope="col">Recipe Id</th>
                        <th scope="col">Category</th>
                        <th scope="col">Recipe Name</th>
                        <th scope="col">Created By</th>
                        <th scope="col">Is Published</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(recipe, index) in filteredItems" :key="index">
                        <th scope="row">{{ recipe.id }}</th>
                        <td scope="row">{{ recipe.category.name }}</td>
                        <td class="recipe-name">
                            <router-link :to="{ name: 'admin-recipe-details', params: { id: recipe.id } }" class="nav-link">
                                {{ recipe.name }}
                            </router-link>
                        </td>
                        <td>{{ recipe.created_by }}</td>
                        <td>{{ recipe.is_published }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script setup>
    import { ref, onMounted, computed } from 'vue';
    import axios from 'axios';
    import { useAuthStore } from "@/stores/authStore";

    const auth = useAuthStore();
    const items = ref([]);
    const searchQuery = ref('');

    onMounted(() => {
        axios.get('/recipes', {
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + auth.token
            }
        })
        .then(response => {
            items.value = response.data.recipes;
        })
        .catch(error => {
            console.error('Error fetching recipe data:', error);
        });
    });

    const filteredItems = computed(() => {
        return items.value.filter(recipe => {
            const lowerSearchQuery = searchQuery.value.toLowerCase();
            return Object.values(recipe).some(value => {
                if (value !== null && typeof value !== 'undefined') {
                    const stringValue = String(value).toLowerCase();
                    return stringValue.includes(lowerSearchQuery);
                }
                return false;
            });
        });
    });
</script>
  
<style scoped>
    .search-container {
        margin-bottom: 12px;
    }

    .search-container > input {
        border: 2px solid gray;
        border-radius: 4px;
    }

    .search-container > input:focus {
        outline: none;
    }

    .recipe-name a {
        color: #CADA2C;
        font-weight: 700;
    }

    .table-wrapper {
        width: 100%;
        height: min(70vh, 700px);
        overflow-y: auto;
    }
</style>
