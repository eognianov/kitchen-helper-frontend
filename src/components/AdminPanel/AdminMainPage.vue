<template>
    <div class="admin-container">
        <ul class="nav flex-column">
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
        </ul>

        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>


<script setup>
    import { ref, onMounted } from 'vue';
    import VueJwtDecode from 'vue-jwt-decode';

    onMounted(() => {
        let decoded = VueJwtDecode.decode(localStorage.getItem('token'));
        if (!decoded.roles) {
            router.push('/login');
        }
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
        width: fit-content;
        position: sticky;
        top: 92px;
        overflow-y: auto;
        height: 100vh;
        background-color: var(--dark-background);
        margin-bottom: -90px;
        min-width: 80px;
    }

    .admin-container ul li:first-child {
        margin-top: 1rem;
    }

    .admin-container ul li {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    footer {
        display: none;
    }

    @media screen and (max-width: 300px) {
        .admin-container ul {
            top: 150px;
        }
    }

    .content {
        margin-top: 2rem;
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