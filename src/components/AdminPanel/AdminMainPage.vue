<template>
    <div class="admin-container">
        <ul class="nav flex-column">
            <li class="nav-item" @click="goToUsers">
                <router-link to="/admin" class="nav-link">
                    <span class="clickable-text">Admin</span>
                </router-link>
            </li>
            <hr>
            <li class="nav-item" @click="goToUsers">
                <router-link to="/admin/users" class="nav-link">
                    <span class="clickable-text">Users</span>
                </router-link>
                <router-link to="/admin/users/add" class="nav-link add-link">+</router-link>
            </li>
            <hr>
            <li class="nav-item" @click="goToRoles">
                <router-link to="/admin/roles" class="nav-link">
                    <span class="clickable-text">Roles</span>
                </router-link>
                <router-link to="/admin/roles/add" class="nav-link add-link">+</router-link>
            </li>
            <hr>
            <li class="nav-item" @click="goToRecipes">
                <router-link to="/admin/recipes/" class="nav-link">
                    <span class="clickable-text">Recipes</span>
                </router-link>
            </li>
            <hr>
        </ul>

        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>


<script setup>
    import { onMounted, onUnmounted } from 'vue';

    onMounted(() => {
        document.querySelector('#app > footer').remove();
    });
    onUnmounted(() => {
        const footer = document.createElement('footer');
        document.querySelector('#app').appendChild(footer);
    });
</script>

<style scoped>

    body {
        height: 100vh;
    }

    h2 {
        text-align: center;
        color: #CADA2C;
    }
    .admin-container {
        display: flex;
        justify-content: space-between;
        position: fixed;
        width: 100%;
        height: 100%;
    }

    .admin-container div {
        margin-left: 14px;
    }

    .admin-container ul {
        width: 20%;
        position: sticky;
        overflow-y: auto;
        background-color: var(--dark-background);
        margin-bottom: 0;
        top: 0;
    }

    .admin-container ul li:first-child {
        margin-top: 1rem;
    }

    .admin-container ul li {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .content {
        margin-top: 1.5rem;
        width: 80%;
        height: min(70vh, 700px);
    }

    .submit {
        width: 99%;
        height: 85vh;
        overflow-y: auto;

    }

    hr {
        color: #CADA2C;
        border: 1px solid #CADA2C;
    }

    .admin-container ul li {
        color: #CADA2C;
        display: flex;
        justify-content: space-between;
        gap: 20px;
    }

    .clickable-text {
        cursor: pointer;
    }

    .add-link {
        color: #CADA2C;
        font-weight: 900;
    }

    .add-link:hover {
        color: #CADA2C;
    }

</style>