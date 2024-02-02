<template>
	<div class="box d-flex gap-4">
		<div>
			<router-link :to="'/recipes/' + recipe.id">
				<img :src="pictureUrl" :alt="recipe.name">
			</router-link>
		</div>
		<div class="text-wrapper">
			<h3>
				<router-link :to="'/recipes/' + recipe.id">
					{{ recipe.name }}
				</router-link>
			</h3>
			<p>{{ recipe.summary?.slice(0, 100) }}{{ recipe.summary?.length > 100 ? "..." : null }}</p>
		</div>
	</div>
</template>

<script setup>
import {ref} from "vue";
import {createPictureUrl} from "../../helpers/helepers";

const props = defineProps(['recipe'])
const pictureUrl = ref(createPictureUrl(props.recipe.picture))
</script>

<style scoped>
.top .box {
	height: 11rem;
	background-color: var(--white);
	padding: 15px
}

.top .box h3 {
	font-size: 1.1rem;
	font-weight: 700;
	text-transform: capitalize;
	line-height: 1.1rem;
}

.top .box h3 a {
	color: var(--main-text);
}

.top .box p {
	line-height: 1.2;
	color: var(--main-text);
	margin-bottom: 0;
	font-size: .8rem;
	margin-top: -5px;
}

.top .box img {
	width: 8rem;
	height: 100%;
	border-radius: 4px;
	object-fit: cover;
}

@media only screen and (max-width: 1200px) {
	.top .box {
		height: 12rem;
	}
	.top .text-wrapper {
		overflow: hidden;
	}
}

@media only screen and (max-width: 990px) {
	.top .box {
		height: 10rem;
	}

}

@media only screen and (max-width: 350px) {
	.top .box img {
		width: 6rem;
	}
	.top .box {
		height: 12rem;
	}
}
</style>