<template>
    <div  class="recipe-detais">
        <div>
            <h2>Recipe Details</h2>
            <div>
                <p><strong>Recipe ID:</strong> {{ recipe.id }}</p>
                <p><strong>Name:</strong> {{ recipe.name }} </p>
                <p><strong>Created By:</strong> {{ recipe.created_by }} </p>
                <p><strong>Created On:</strong> {{ recipe.created_on }} </p>
                <p><strong>Picture:</strong></p>
                <img v-if="recipe.picture" :src="recipe.picture" alt="Recipe Image" />
                <p v-else>No picture available</p>
                <p><strong>Summary:</strong> {{ recipe.summary }} </p>
                <p><strong>Serves:</strong> {{ recipe.serves }} </p>
                <p><strong>Calories:</strong> {{ recipe.calories }} </p>
                <p><strong>Carbo:</strong> {{ recipe.carbo }} </p>
                <p><strong>Category:</strong> {{ recipe.serves }} </p>
            </div>
        </div>
        <div>
            <ul class="list-group">
            <li v-for="ingredient in ingredients" :key="ingredient.id" class="list-group-item">
                <span>{{ ingredient.name }}</span>
            </li>
            </ul>
            <div class="buttons">
                <button @click="handleDeleteClick(user.id)" class="btn btn-danger btn-sm">Delete</button>
            </div>
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
                console.log(response.data);
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
        toast.warning('Work in progres.')
    };

    const handleSaveClick = async (userId) => {
        toast.warning('Work in progres.')
    };
</script>

<style scoped>

    .recipe-details {
        display: flex;
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
    }

    .btn-danger {
        margin-top: 20px;
        padding: 6px 24px;
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

</style>
  