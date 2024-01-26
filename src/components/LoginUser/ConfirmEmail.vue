<template>
	<div class="container d-flex justify-content-center loginform confirm-email" style="margin-top:1rem;">
		<div class="row align-items-center justify-content-center">
			<div
                class="col-lg-12 col-lg-8 py-5 mx-2 rightcolumn d-flex flex-column align-items-center align-self-center shadow-lg"
            >
				<h3 v-if="isEmailConfirmed" class="email-confirmed">Email was successfully confirmed. <i class="fa-regular fa-face-smile-beam"></i><img src="/images/logos/kh-logo-hw.svg" alt></h3>
				<h3 v-else class="email-not-confirmed">{{ errorMessage }} <i class="fa-regular fa-face-frown-open"></i></h3>
			</div>
		</div>
	</div>
</template>

<script setup>
    import { useRoute } from "vue-router";
    import { ref, onMounted } from "vue";
    import axios from "axios";

    const route = useRoute();
    const confirmationToken = ref(route.params.token);
    const isEmailConfirmed = ref(null);
    const errorMessage = ref(null);

    onMounted(() => {
        if (confirmationToken) {
            axios.get(`/users/confirm-email/${confirmationToken.value}`, {
            })
            .then(response => {
                if (response.status === 200) {
                    isEmailConfirmed.value = true;
                    document.querySelector('.loginform').classList.add('email-confirmed');
                }
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.detail) {
                    errorMessage.value = error.response.data.detail;
                } else {
                    errorMessage.value = 'Somethig went wrong.';
                }
                document.querySelector('.loginform').classList.add('email-not-confirmed');
            });
        }
    });
</script>

<style scoped>
.confirm-email {
	max-width: 650px;
	padding: 4rem;
	color: var(--main-text);
    height: 300px;
    margin-top: 5rem !important; 
}

.email-confirmed {
    background-color: var(--main-hover);
}

.email-not-confirmed {
    background-color: var(--dark-background);
    color: #fff;
}
</style>
