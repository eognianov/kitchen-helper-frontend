<template>
    <div>
    <h2>User Details</h2>
    <div>
        <p><strong>User ID:</strong> {{ user.id }}</p>
        <p><strong>Username:</strong> {{ user.username }} </p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Roles:</strong></p>
    </div>
    </div>
    <ul class="list-group">
    <li v-for="role in roles" :key="role.id" class="list-group-item">
        <input
        v-model="selectedRoles"
        class="form-check-input me-1"
        type="checkbox"
        :value="role.id"
        :id="`roleCheckbox${role.id}`"
        :checked="user.roles.some(userRole => userRole.id === role.id)"
        @click="handleCheckboxClick($event, role.id)"
        />
        <label :for="`roleCheckbox${role.id}`" class="form-check-label stretched-link">{{ role.name }}</label>
    </li>
    </ul>
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

    const userId = ref(route.params.id);
    const user = ref({});
    const roles = ref({});
    const selectedRoles = ref([]);

    onMounted(() => {
        if (userId) {
            axios.get(`/users/${userId.value}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + auth.token
            }
            })
            .then(response => {
                user.value = response.data;
                selectedRoles.value = user.value.roles.map(role => role.id);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });

            axios.get('/roles', {
                headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + auth.token
                }
            })
                .then(response => {
                roles.value = response.data;
                })
                .catch(error => {
                console.error('Error fetching user data:', error);
                });
        }
    });

    const handleCheckboxClick = (event, roleId) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            makeRequest(roleId, true);
        } else {
            makeRequest(roleId, false);
        }
    };

    const makeRequest = async (roleId, isChecked) => {

        try {
            if (isChecked) {
            await axios.post(
                `/users/${user.value.id}/roles/${roleId}`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + auth.token
            }
                }
            );
            toast.success(`Role ${roleId} added successfully to user ${user.value.id}.`);
            } else {
            await axios.delete(
                `/users/${user.value.id}/roles/${roleId}`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + auth.token
            }
                }
            );
            toast.error(`Role ${roleId} removed successfully from user ${user.value.id}.`);
            }
        } catch (error) {
            toast.error(error.message)
            selectedRoles.value = user.value.roles.map(role => role.id);
        }
    };
</script>

<style scoped>
    .list-group {
    display: inline-block;
    width: 250px;
    height: 200px;
    border: 1px solid black;
    overflow-y: auto;
    overflow-x: auto;
    }
</style>
  