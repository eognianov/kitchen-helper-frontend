<template>
    <div  class="recipe-details">
        <div>
            <h2>Recipe Details</h2>
            <hr>
            <div>
                <p><strong>Recipe ID:</strong> {{ recipe.id }}</p>
                <hr>
                <p><strong>Name:</strong> {{ recipe.name }} </p>
                <hr>
                <p>
                    <strong>Created By:</strong> 
                    <router-link :to="{ name: 'admin-user-details', params: { id: recipe.created_by } }" class="nav-link">
                        {{ recipe.created_by }}
                    </router-link>
                </p>
                <p><strong>Created On:</strong> {{ recipe.created_on }} </p>
                <hr>
                <p>
                    <strong>Updated By:</strong> 
                    <router-link :to="{ name: 'admin-user-details', params: { id: recipe.updated_by } }" class="nav-link">
                        {{ recipe.updated_by }}
                    </router-link>
                </p>
                <p><strong>Updated On:</strong> {{ recipe.updated_on }} </p>
                <hr>
                <p><strong>Is Published:</strong> {{ recipe.is_published }} </p>
                <p>
                    <strong>Published By:</strong> 
                    <router-link :to="{ name: 'admin-user-details', params: { id: recipe.published_by } }" class="nav-link">
                        {{ recipe.published_by }}
                    </router-link>
                </p>
                <p><strong>Published On:</strong> {{ recipe.published_on }} </p>
                <hr>
                <p><strong>Is Deleted:</strong> {{ recipe.is_deleted }} </p>
                <p>
                    <strong>Deleted By:</strong> 
                    <router-link :to="{ name: 'admin-user-details', params: { id: recipe.deleted_by } }" class="nav-link">
                        {{ recipe.deleted_by }}
                    </router-link>
                </p>
                <p><strong>Deleted On:</strong> {{ recipe.deleted_on }} </p>
                <hr>
                <p><strong>Category:</strong> {{ recipe.serves }} </p>
                <hr>
                <p><strong>Picture:</strong></p>
                <img v-if="recipe.picture" :src="recipe.picture" alt="Recipe Image" />
                <p v-else>No picture available</p>
                <hr>
                <p><strong>Summary:</strong> {{ recipe.summary }} </p>
                <p><strong>Serves:</strong> {{ recipe.serves }} </p>
                <p><strong>Calories:</strong> {{ recipe.calories }} </p>
                <p><strong>Carbo:</strong> {{ recipe.carbo }} </p>
                <p><strong>Fats:</strong> {{ recipe.fats }} </p>
                <p><strong>Proteins:</strong> {{ recipe.proteins }} </p>
                <p><strong>Cholesterol:</strong> {{ recipe.cholesterol }} </p>
                <p><strong>Complexity:</strong> {{ recipe.complexity }} </p>
                <p><strong>Time To Prepare:</strong> {{ recipe.time_to_prepare }} </p>
            </div>
        </div>
        <hr>
        <div>
            <p><strong>Ingredients:</strong></p>
            <ul class="list-group">
                <li v-for="ingredient in ingredients" :key="ingredient.id" class="list-group-item">
                    <span>{{ ingredient.name }}</span>
                    <span @click="handleRemoveIngredient(ingredient.id)" class="remove-element">x</span>
                </li>
            </ul>
            <hr>
            <p><strong>Instructions:</strong></p>
            <ul class="list-group">
                <li v-for="instruction in instructions" :key="instruction.id" class="list-group-item">
                    <span>{{ instruction.instruction }}</span>
                    <span @click="handleRemoveInsruction(instruction.id)" class="remove-element">x</span>
                </li>
            </ul>
            <hr>
            <div class="buttons">
                <button @click="handleSaveClick(recipe.id)" class="btn btn-save btn-sm">Save</button>
                <button @click="handleDeleteClick(recipe.id)" class="btn btn-danger btn-sm">Delete</button>
            </div>
            <hr>
        </div>
    </div>
</template>
  
<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import { useAuthStore } from "@/stores/authStore";
    import { useRoute } from 'vue-router';
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    const auth = useAuthStore();
    const route = useRoute();

    const recipeId = ref(route.params.id);
    const recipe = ref({});
    let ingredients = ref({});
    let instructions = ref ({});

    onMounted(() => {
        if (recipeId) {
            axios.get(`/recipes/${recipeId.value}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + auth.token
            }
            })
            .then(response => {
                recipe.value = response.data;
                ingredients = response.data.ingredients;
                instructions = response.data.instructions;
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
        }
    });

    const handleDeleteClick = async (userId) => {
        toast.warning('Work in progres...')
    };

    const handleSaveClick = async (userId) => {
        toast.warning('Work in progres...')
    };

    const handleRemoveIngredient = async (ingredientId) => {
        toast.warning('Work in progres...')
    };
    const handleRemoveInsruction = async (instructionId) => {
        toast.warning('Work in progres...')
    };
</script>

<style scoped>

    .recipe-details {
        height: 85vh;
        overflow-y: auto;
    }

    .list-group {
    display: inline-block;
    width: 250px;
    height: 200px;
    border: 1px solid black;
    overflow-y: auto;
    overflow-x: auto;
    }

    .buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .btn-danger {
        padding: 6px 24px;
        margin-right: 10px;
    }

    .btn-save {
        color: #fff;
        background-color: #007bff;
        border-color: #007bff;
        padding: 6px 24px;
    }

    .btn-save:hover {
        color: #fff;
        background-color: #0056b3;
        border-color: #004080;
    }

    input.form-control {
        width: fit-content;
        max-width: 280px;
        margin-right: 12px;
    }

    div.input-save {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .nav-link {
        color: #CADA2C;
        font-weight: 700;
        display: inline-block;
        margin-left: 10px;
    }

    .list-group-item {
        display: flex;
        justify-content: space-between;
    }

    .remove-element {
        color: #bb2d3b;
        cursor: pointer;
        height: 24px;
        width: 24px;
        padding: 4px;
    }

    .recipe-details img {
        max-width: 250px;
        max-height: 200px;
    }

</style>
  