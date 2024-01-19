<template>
    <div class="table-wrapper">
        <h2>Recipes</h2>
        <div class="search-container">
            <input type="text" v-model="searchQuery" placeholder="Search for recipe..." />
        </div>
        <div>
            <table class="table table-striped table-hover user-table-container">
                <thead>
                    <tr>
                        <th>Recipe Id</th>
                        <th>Category</th>
                        <th>Recipe Name</th>
                        <th>Created By</th>
                        <th>Is Published</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(recipe, index) in items" :key="index">
                        <th scope="row">{{ recipe.id }}</th>
                        <td scope="row">{{ recipe.category.name }}</td>
                        <td class="recipe-name">
                            <router-link :to="{ name: 'admin-recipe-details', params: { id: recipe.id } }" class="nav-link">
                                {{ recipe.name }}
                            </router-link>
                        </td>
                        <td>
                            <router-link :to="{ name: 'admin-user-details', params: { id: recipe.created_by } }" class="nav-link">
                                {{ recipe.created_by }}
                            </router-link>    
                        </td>
                        <td>{{ recipe.is_published }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pagination">
            <button @click="requestPage(prevPage)" :disabled="prevPage ? false : true">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="requestPage(nextPage)" :disabled="nextPage ? false : true">Next</button>
        </div>
    </div>
</template>
  
<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import { useAuthStore } from "@/stores/authStore";

    const auth = useAuthStore();
    const items = ref([]);
    const searchQuery = ref('');
    const currentPage = ref(1);
    const totalPages = ref(0);
    const prevPage = ref('');
    const nextPage = ref('');

    onMounted(() => {
        requestPage('/recipes')
    });


    const requestPage  = (url, action) => {
        
        axios.get(
            url, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + auth.token
            }
        })
        .then(response => {
            totalPages.value = response.data.total_pages;
            items.value = response.data.recipes;
            prevPage.value = response.data.previous_page;
            nextPage.value = response.data.next_page;
            currentPage.value = response.data.page_number;
        })
        .catch(error => {
            console.error('Error fetching recipe data:', error);
        });
    };
    
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

    .nav-link {
        color: #CADA2C;
        font-weight: 700;
    }

    .table-wrapper {
        width: 100%;
        height: 85vh;
        overflow-y: auto;
        overflow-x: auto;
    }

    .pagination {
        margin-top: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 24px
    }

    .pagination button {
        cursor: pointer;
        padding: 5px 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background-color: #f8f8f8;
        color: #333;
    }

    .pagination button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

</style>