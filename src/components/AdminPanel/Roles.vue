<template>
    <h2>Roles</h2>
    <table class="table table-striped table-hover role-table-container">
        <thead>
        <tr>
            <th scope="col">Role Id</th>
            <th scope="col">Role name</th>
            <th scope="col">Users</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(role, index) in items" :key="index">
            <th scope="row">{{ role.id }}</th>
            <td>{{ role.name }}</td>
        </tr>
        </tbody>
    </table>
</template>
  
<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import { useAuthStore } from "@/stores/authStore";

    const auth = useAuthStore();
    const items = ref([]);

    onMounted(() => {
    axios.get('/roles', {
        headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + auth.token
        }
    })
        .then(response => {
        items.value = response.data;
        })
        .catch(error => {
        console.error('Error fetching user data:', error);
        });
    });
</script>
  
<style scoped>
    .role-table-container {
        max-height: 40vh;
        overflow-y: auto;
    }
</style>