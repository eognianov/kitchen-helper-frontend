<template>
    <div class="container-fluid recipe-form">
        <div class="container d-flex justify-content-center" style="margin-top: 1.5rem;">
            <div class="row align-items-center justify-content-center">
                <div class="col-md-12 col-lg-8 py-5 mx-2 rightcolumn d-flex flex-column align-items-center align-self-center shadow-lg">
                <div class="col-md-12">
                    <form @submit.prevent="createRole">
                    <h3>Create a Role</h3>
                    <div class="form-group mt-5">
                        <input type="text" id="roleName" class="form-control" placeholder="Role Name" v-model="roleName">
                    </div>

                    <p class="error" :class="{ show: errorFound }">{{ errorMessage }}</p>

                    <button id="btn" class="btn btn-lg btn-block form-btn font-weight-bold">Create Role</button>
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
  
    let roleName = ref('');
    let errorFound = ref(false);
    let errorMessage = ref('');
  
    async function createRole() {
        if (roleName.value === '') {
            errorFound.value = true;
            errorMessage.value = 'Please provide a role name';
            return;
        }
  
        try {
            const response = await axios.post(
            `/roles`, {
                name: roleName.value
            },{
                headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + auth.token
            }
            }
            );
            console.log(response.data);
            toast.success(`Role ${response.data.name} with id ${response.data.id} added successfully.`);
            roleName.value = ''
            // router.push('/admin/roles');

        } catch (error) {
            toast.error(error.message)
            errorFound.value = true;
            errorMessage.value = error.message;
        }
    }
</script>
  
<style scoped>
    .recipe-form .form-group {
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

    .recipe-form {
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

    div.container.d-flex.justify-content-center > div {
        width: 35vw;
    }

    div.container.d-flex.justify-content-center div button {
        margin-top: 18px;
    }
    
</style>
