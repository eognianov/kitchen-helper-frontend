<template>
    <h2>Users</h2>
    <table class="table table-striped table-hover user-table-container">
    <thead>
        <tr>
        <th scope="col">User Id</th>
        <th scope="col">Username</th>
        <th scope="col">Email</th>
        <th scope="col">Roles</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(user, index) in items" :key="index">
        <th scope="row">{{ user.id }}</th>
        <td class="username">
            <router-link :to="{ name: 'admin-user-details', params: { id: user.id } }" class="nav-link">
            {{ user.username }}
            </router-link>
        </td>
        <td>{{ user.email }}</td>
        <td>{{ user.roles.map(role => (role.name)).join(', ') }}</td>
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
    axios.get('/users/all', {
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
    .user-table-container {
        max-height: 40vh;
        overflow-y: auto;
        overflow-x: auto;
    }

    .username a {
      color: #CADA2C;
      font-weight: 700;
    }
</style>