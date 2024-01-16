<template>
    <div>
      <h2>User Details</h2>
      <div>
        <p><strong>User ID:</strong> {{ user.id }}</p>
        <p><strong>Username:</strong> {{ user.username }} </p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Roles:</strong> {{ user.roles ? user.roles.map(role => role.name).join(', ') : '' }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useAuthStore } from "@/stores/authStore";
  import { useRoute } from 'vue-router';
  
  const auth = useAuthStore();
  const route = useRoute();
  
  const userId = ref(route.params.id);
  const user = ref({});
  
  onMounted(() => {
    if (userId) {
        console.log(userId.value)
      axios.get(`/users/${userId.value}`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + auth.token
        }
      })
        .then(response => {
          user.value = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });
    }
  });
  </script>
  