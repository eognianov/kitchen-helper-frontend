<template>
    <h2>Users</h2>
    <div class="table-wrapper">
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
    </div>
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
    .table-wrapper {
        height: 700px;
        width: 100%;
        overflow-y: auto;
        overflow-x: auto;
    }

    @media screen and (max-height: 768px) {
        .table-wrapper {
        height: 450px;
        }
    }

    @media screen and (max-height: 640px) {
        .table-wrapper {
        height: 300px;
        }
    }
    @media screen and (max-height: 460px) {
        .table-wrapper {
        height: 200px;
        }
    }

    @media screen and (max-height: 300px) {
        .table-wrapper {
        height: 140px;
        }
    }

    .username a {
      color: #CADA2C;
      font-weight: 700;
    }
</style>