<template>
	<div>
		<div class="d-flex justify-content-between item">
			<span @click="toggleVisible" class="recipe-name">{{ recipe.name }}</span>
			<span @click="toggleVisible" class="recipe-name" style="width: 100%;"> </span>
			<span v-if="!recipe.is_published && !pending"
						class="published"
						@click="publishRecipe(recipe.id)">
						<i class="fa-regular fa-square">
						</i>
			</span>
			<span
					class="published"
					v-if="recipe.is_published && !pending"
					@click="unpublishRecipe(recipe.id)">
						<i class="fa-regular fa-square-check"></i>
			</span>
			<div v-if="pending" class="sending">
				<div class="lds-ring">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
			<span v-if="error" class="error">error</span>
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

	const response = await axios.patch(`/recipes/${id}`, {
		field: 'is_published',
		value: 'true'
	}, {
		headers: {
			"Content-Type": "application/json",
			'Authorization': 'Bearer ' + auth.token
		}
	})
	if (response.status === 200) {
		setTimeout(() => {
			error.value = false
			recipe.value.is_published = true
			pending.value = false
		}, 300);

	} else {
		error.value = true
	}
}

async function unpublishRecipe(id) {
	pending.value = true;

	const response = await axios.patch(`/recipes/${id}`, {
		field: 'is_published',
		value: 'false'
	}, {
		headers: {
			"Content-Type": "application/json",
			'Authorization': 'Bearer ' + auth.token
		}
	})
	if (response.status === 200) {
		setTimeout(() => {
			error.value = false
			recipe.value.is_published = false;
			pending.value = false
		}, 300);
	} else {
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

.recipe-name, .published {
	cursor: pointer;
}

.error, .sending {
	display: flex;
	align-items: center;
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
	width: 16px;
	height: 16px;
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