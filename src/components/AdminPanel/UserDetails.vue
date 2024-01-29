<template>
    <div class="user-details">
        <h2>User Details</h2>
        <div>
            <p><strong>User ID:</strong> {{ user.id }}</p>
            <p><strong>Username:</strong> {{ user.username }} </p>
            <p><strong>Email:</strong> </p>
            <div class="input-save">
                <input v-model="editedEmail" class="form-control" />
                <button @click="handleSaveClick(user.id)" class="btn btn-save btn-sm">Save</button>
            </div>
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
    <div class="buttons">
        <button @click="handleDeleteClick(user.id)" class="btn btn-danger btn-sm">Delete</button>
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

    const userId = ref(route.params.id);
    const user = ref({});
    const roles = ref({});
    const selectedRoles = ref([]);
    const editedEmail = ref('');

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
                editedEmail.value = user.value.email;
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

        const headers = {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + auth.token
            }

        try {
            if (isChecked) {
            await axios.post(
                `/users/${user.value.id}/roles`, roleId, {
                headers: headers
                }
            );
            toast.success(`Role ${roleId} added successfully to user ${user.value.id}.`);
            } else {
            await axios.delete(
                `/users/${user.value.id}/roles/${roleId}`, {
                headers: headers
                }
            );
            toast.error(`Role ${roleId} removed successfully from user ${user.value.id}.`);
            }
        } catch (error) {
            toast.error(error.message)
            selectedRoles.value = user.value.roles.map(role => role.id);
        }
    };

    const handleDeleteClick = async (userId) => {
        toast.warning('Work in progres.')
    };

    const handleSaveClick = async (userId) => {
        try {
            await axios.patch(
                `/users/${userId}`, {
                    field: 'email',
                    value: editedEmail.value
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + auth.token
                    }
                }
            );
            toast.success(`User ${userId} updated successfully.`);
        } catch (error) {
            toast.error(error.message);
            editedEmail.value = user.value.email;
        }
    };
</script>

<style scoped>

    .user-details {
        margin-left: 14px;
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
  