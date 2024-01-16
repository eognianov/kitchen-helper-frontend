<template>
    <div class="admin-container">
        <ul class="nav flex-column">
            <li class="nav-item">
                <router-link to="/admin/users" class="nav-link">Users</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/admin/roles" class="nav-link">Roles</router-link>
            </li>
        </ul>

        <div class="content">
        <router-view></router-view>
        </div>
    </div>
</template>


<script setup>
    import { ref, onMounted } from 'vue';

    onMounted(() => {
    if (window.location.pathname.includes('admin')) {
        document.querySelector('#app > footer').style.display = 'none';
    }
    });
</script>

<style scoped>
    h2 {
        text-align: center;
        color: #CADA2C;
    }
    .admin-container {
        display: flex;
        justify-content: space-between;
        position: fixed;
        width: 100%;
    }

    .admin-container div {
        width: 80%;
    }

    .admin-container ul {
        width: 18%;
        position: sticky;
        top: 92px;
        overflow-y: auto;
        height: 100vh;
        background-color: var(--dark-background);
        margin-bottom: -90px;
        min-width: 80px;
    }

    footer {
        display: none;
    }

    @media screen and (max-width: 300px) {
        .admin-container ul {
            top: 150px;
        }
    }

</style>