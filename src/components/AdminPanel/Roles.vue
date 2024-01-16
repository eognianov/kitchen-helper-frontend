<template>
    <h2>Roles</h2>
    <div class="table-wrapper">
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
    </div>
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

</style>