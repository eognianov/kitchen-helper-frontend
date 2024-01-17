<template>
    <div>
        <h2>Users</h2>
        <div class="search-container">
            <input type="text" v-model="searchQuery" placeholder="Search for user..." />
        </div>
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
                    <tr v-for="(user, index) in filteredItems" :key="index">
                        <th scope="row">{{ user.id }}</th>
                        <td class="username">
                        <router-link :to="{ name: 'admin-user-details', params: { id: user.id } }" class="nav-link">
                            {{ user.username }}
                        </router-link>
                        </td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.roles.map(role => role.id).join(', ') }}</td>
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

    const filteredItems = computed(() => {
        return items.value.filter(user => {
            const lowerSearchQuery = searchQuery.value.toLowerCase();
            return Object.values(user).some(value => {
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

    .username a {
        color: #CADA2C;
        font-weight: 700;
    }
</style>
  