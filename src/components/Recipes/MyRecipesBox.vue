<template>
	<div>
		<div class="d-flex justify-content-between item">
			<div @click="toggleVisible" class="recipe-name">{{ recipe.name }}</div>
			<div v-if="!recipe.is_published && !pending && !error"
					 class="published pointer"
					 @click="publishRecipe(recipe.id)">
				<i class="fa-regular fa-square">
				</i>
			</div>
			<div
					class="published pointer"
					v-if="recipe.is_published && !pending && !error"
					@click="publishRecipe(recipe.id)">
				<i class="fa-regular fa-square-check"></i>
			</div>
			<div v-if="pending" class="">
				<div class="lds-ring">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
			<div v-if="error" class="error published">error</div>
		</div>
		<div v-if="isVisible" class="summary">{{ recipe.summary }}</div>
	</div>
</template>

<script setup>
import axios from "axios";
import {ref} from 'vue';
import {useAuthStore} from "@/stores/authStore";

const auth = useAuthStore();
const isVisible = ref(false)
const error = ref(false)

const props = defineProps(['recipe'])
const recipe = ref(props.recipe)
const pending = ref(false)

async function publishRecipe(id) {
	pending.value = true;
	let newValue = recipe.value.is_published === true ? 'false' : 'true'
	try {
		const response = await axios.patch(`/recipes/${id}`, {
			field: 'is_published',
			value: newValue
		}, {
			headers: {
				"Content-Type": "application/json",
				'Authorization': 'Bearer ' + auth.token
			}
		})
		if (response.status === 200) {
			setTimeout(() => {
				error.value = false
				recipe.value.is_published = newValue === 'true'
				pending.value = false
			}, 300)
		}
	} catch (e) {
		pending.value = false
		error.value = true
	}
}

function toggleVisible() {
	isVisible.value = !isVisible.value
}
</script>

<style scoped>
.summary {
	margin-top: .4rem;
	border-top: 1px dashed var(--dark-background);
	font-size: .8rem;
	line-height: 1.2;
	padding-top: 8px;
	padding-bottom: 6px;
}

.recipe-name {
	width: 100%;
	padding-right: 10px;
	text-transform: capitalize;
}

.recipe-name, .pointer {
	cursor: pointer;
}

.published {
	margin-right: 35px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.error {
	font-size: .8rem;
	color: var(--main-alert);
}

.sending {
	font-size: .8rem;
}

.lds-ring {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 16px;
	height: 16px;
	margin-right: 35px;
	margin-top: 3px;
}

.lds-ring div {
	box-sizing: border-box;
	display: block;
	position: absolute;
	width: 16px;
	height: 16px;
	border: 1px solid var(--main-text);
	border-radius: 50%;
	animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	border-color: var(--main-text) transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
	animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
	animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
	animation-delay: -0.15s;
}

@keyframes lds-ring {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>