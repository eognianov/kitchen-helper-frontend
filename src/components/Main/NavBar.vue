<template>
	<nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="navigation">
		<div class="container-fluid justify-content-center">
			<router-link to="/" class="navbar-brand">
				<img src="/images/logos/kh-logo-hw.svg" alt>
			</router-link>

			<button @click="toggleNavbar"
							class="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navbarNavDropdown"
							aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse justify-content-center"
					 :class="{ 'show': isNavbarVisible }"
					 id="navbarNavDropdown">
				<ul class="navbar-nav">
					<li class="nav-item" @click="isNavbarVisible ? isNavbarVisible=false : null">
						<router-link to="/" class="nav-link">
							Home
						</router-link>
					</li>
					<li class="nav-item" @click="isNavbarVisible ? isNavbarVisible=false : null">
						<router-link to="/recipes" class="nav-link">
							Recipes
						</router-link>
					</li>
					<li class="nav-item" @click="isNavbarVisible ? isNavbarVisible=false : null" v-if="!auth.logged">
						<router-link to="/login" class="nav-link">
							Login
						</router-link>
					</li>
					<li class="nav-item" @click="auth.logout" v-if="auth.logged">
						<a href="#" class="nav-link">Logout</a>
					</li>
					<li class="nav-item btn-submit-recipe" @click="isNavbarVisible ? isNavbarVisible=false : null" v-if="auth.logged">
						<router-link to="/create" class="nav-link">
							<i class="fa fa-upload" aria-hidden="true"></i>
							Submit Recipe
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</nav>

</template>

<script setup>
import {ref} from 'vue';
import {useAuthStore} from "@/stores/authStore";

const auth = useAuthStore()

let isNavbarVisible = ref(false)

function toggleNavbar() {
	isNavbarVisible.value = !isNavbarVisible.value
}
</script>

<style>

#navigation {
	box-sizing: border-box;
	padding-top: 0;
	padding-bottom: 0;
}

.navbar-brand img {
	max-width: 220px;
	width: 100%;
}

.navbar .navbar-brand {
	position: absolute;
	left: 30px;
}

.navbar .navbar-nav .btn-submit-recipe {
	position: absolute;
	right: 30px
}

.navbar .navbar-nav .btn-submit-recipe a {
	margin-top: 23px;
	padding: 13px 24px 11px;
	color: var(--white);
	border-radius: 6px;
	background-color: var(--dark-background);
	margin-bottom: 1rem;
}

.navbar .navbar-nav .btn-submit-recipe a i {
	margin-right: 5px
}

.navbar .navbar-nav .btn-submit-recipe a:hover {
	background-color: var(--main-hover);
	color: var(--main-text);
	transition: all 0.3s ease;
	border: 1px solid var(--main-text);
}

.navbar .navbar-nav .nav-link {
	font-weight: 700;
	padding: 36px 20px 31px;
	color: var(--white);
	transition: all 0.3s ease;
}

.navbar .navbar-nav .nav-link:hover {
	color: var(--secondary-text);
	transition: all 0.3s ease;
}

.navbar {
	background-color: var(--main-color);
}

.navbar .container-fluid > .navbar-toggler {
	border: 2px solid #FFFFFF66;
}

.navbar .nav-item a {
	box-sizing: border-box;
	border-bottom: 3px solid transparent;
}

.navbar #navbarNavDropdown > .navbar-nav > .nav-item > a.router-link-active {
	color: var(--secondary-text);
	border-bottom: 3px solid var(--secondary-text);
}

.navbar .nav-item.btn-submit-recipe a.router-link-active {
	color: var(--white);
}

.navbar .nav-item.btn-submit-recipe a.router-link-active:hover {
	color: var(--secondary-text);
}

#navbarNavDropdown.show > .navbar-nav > .nav-item > a.router-link-active {
	border-bottom: 1px solid var(--secondary-text);
}

@media only screen and (max-width: 992px) {
	.navbar {
		padding: 10px 0;
	}

	.navbar-dark .navbar-nav {
		padding-left: 0;
	}

	.navbar .container-fluid {
		padding-right: 15px;
		padding-left: 15px
	}

	.navbar .navbar-brand {
		position: unset;
		left: unset
	}

	.navbar .justify-content-center {
		justify-content: space-between !important
	}

	.navbar .navbar-nav .btn-submit-recipe {
		position: unset;
		right: unset;
		text-align: center
	}

	.navbar-dark .navbar-nav .nav-link {
		padding: 15px
	}
}

@media only screen and (max-width: 480px) {
	.navbar-brand img {
		max-width: 180px;
		width: 80%;
	}
}
</style>