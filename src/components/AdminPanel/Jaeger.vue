<template>
    <iframe src="http://localhost:16686/search" frameborder="0"></iframe>
</template>

<script setup>
    import { onMounted, onUnmounted } from 'vue';

    onMounted(() => {
        const adminContainer = document.querySelector('.admin-container .content');
        const sideNavElement = document.querySelector('.admin-container .nav');
        adminContainer.style.margin = '0';
    });
    onUnmounted(() => {
        const adminContainer = document.querySelector('.admin-container .content');
        const sideNavElement = document.querySelector('.admin-container .nav');
        adminContainer.style.marginTop = '1.5rem';
        adminContainer.style.marginLeft = '14px;'
    });
</script>

<style scoped>

    iframe {
        height: 86vh;
        width: 100%;
        overflow-y: auto;
        overflow-x: auto;
        margin-left: 0;
    }

    .admin-container div.content {
        margin-left: 14px;
    }

</style>