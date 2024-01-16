<template>
    <div class="container-fluid user-form">
        <div class="container d-flex justify-content-center" style="margin-top: 1.5rem;">
        <div class="row align-items-center justify-content-center">
            <div class="col-md-12 col-lg-8 py-5 mx-2 rightcolumn d-flex flex-column align-items-center align-self-center shadow-lg">
            <div class="col-md-12">
                <form @submit.prevent="createUser">
                <h3>Create a User</h3>
                <div class="form-group mt-5">
                    <input type="text" id="username" class="form-control" placeholder="Username" v-model="username" />
                </div>
                <div class="form-group">
                    <input type="email" id="email" class="form-control" placeholder="Email" v-model="email" />
                </div>
                <div class="form-group">
                    <input type="password" id="password" class="form-control" placeholder="Password" v-model="password" />
                </div>
                <div class="form-group">
                    <input
                    type="password"
                    id="confirmPassword"
                    class="form-control"
                    placeholder="Confirm Password"
                    v-model="confirmPassword"
                    />
                </div>
                <p class="error" :class="{ show: errorFound }">{{ errorMessage }}</p>
                <button id="btn" class="btn btn-lg btn-block form-btn font-weight-bold">Create User</button>
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>
  
<script setup>
    import axios from 'axios';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';
    import { useAuthStore } from "@/stores/authStore";

    const auth = useAuthStore();
    const router = useRouter();

    let username = ref('');
    let email = ref('');
    let password = ref('');
    let confirmPassword = ref('');
    let errorFound = ref(false);
    let errorMessage = ref('');

    async function createUser() {
    if (username.value === '' || email.value === '' || password.value === '' || confirmPassword.value === '') {
        errorFound.value = true;
        errorMessage.value = 'Please fill in all fields';
        return;
    }

    if (password.value !== confirmPassword.value) {
        errorFound.value = true;
        errorMessage.value = 'Passwords do not match';
        return;
    }

    try {
        const response = await axios.post(
        '/users/signup',
        {
            username: username.value,
            email: email.value,
            password: password.value
        },
        {
            headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + auth.token
            }
        }
        );

        toast.success(`User ${response.data.username} with id ${response.data.id} created successfully.`);
        username.value = '';
        email.value = '';
        password.value = '';
    //   router.push('/admin/users');
    } catch (error) {
        toast.error(error.message);
        errorFound.value = true;
        errorMessage.value = error.message;
    }
    }
</script>
  
<style scoped>
    .user-form .form-group {
    margin-top: 1.2rem;
    }

    .form-btn {
    font-size: 1rem;
    width: 100%;
    background-color: var(--main-color);
    color: var(--white);
    }

    .form-btn:hover {
    background-color: var(--main-hover);
    border: 1px solid var(--main-color);
    color: var(--main-text);
    }

    .rightcolumn {
    background-color: var(--white);
    }

    .user-form {
    padding: 4rem;
    color: var(--main-text);
    }

    .error {
    display: none;
    color: var(--main-alert);
    font-size: 0.8rem;
    }

    .show {
    display: block;
    }
</style>
  