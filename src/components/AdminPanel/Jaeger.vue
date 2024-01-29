<template>
    <iframe :src="jeagerBaseUrl" frameborder="0"></iframe>
</template>

<script setup>
    import { ref,onMounted, onUnmounted } from 'vue';
    const jeagerBaseUrl = ref(import.meta.env.VITE_BASE_JAEGER_URL);

    onMounted(() => {
        const adminContainer = document.querySelector('.admin-container .content');
        adminContainer.style.margin = '0';
    });
    onUnmounted(() => {
        const adminContainer = document.querySelector('.admin-container .content');
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