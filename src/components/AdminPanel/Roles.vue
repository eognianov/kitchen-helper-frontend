<template>
    <div class="table-wrapper">
        <h2>Roles</h2>
        <div class="search-container">
            <input type="text" v-model="searchQuery" placeholder="Search for role..." />
        </div>
        <div>
            <table class="table table-striped table-hover role-table-container">
                <thead>
                    <tr>
                        <th scope="col">Role Id</th>
                        <th scope="col">Role name</th>
                        <th scope="col">Users</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(role, index) in filteredItems" :key="index">
                        <th scope="row">{{ role.id }}</th>
                        <td class="role-name">{{ role.name }}</td>
                        <td>
                            <span v-for="(userId, index) in role.users.map(user => user.id)" :key="index">
                                <router-link :to="{ name: 'admin-user-details', params: { id: userId } }" class="nav-link">
                                    {{ userId }}
                                </router-link>
                                {{ index < role.users.length - 1 ? ', ' : '' }}
                            </span>    
                        </td>
                        <td><button @click="handleDeleteClick(role.id)" class="btn btn-danger btn-sm">Delete</button></td>
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
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    const auth = useAuthStore();
    const items = ref([]);
    const searchQuery = ref('');

    onMounted(() => {
        axios.get('/roles', {
            params: {
                include_users: true
            },
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
        return items.value.filter(role => {
            const lowerSearchQuery = searchQuery.value.toLowerCase();
            return Object.values(role).some(value => {
                if (value !== null && typeof value !== 'undefined') {
                    const stringValue = String(value).toLowerCase();
                    return stringValue.includes(lowerSearchQuery);
                }
                return false;
            });
        });
    });

    const handleDeleteClick = async (roleId) => {
        toast.warning('Work in progres.')
    }
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
        display: inline-block;
        width: fit-content;
    }

    .table-wrapper {
        width: 99%;
        height: 85vh;
        overflow-y: auto;
        overflow-x: auto;
    }
    
</style>
