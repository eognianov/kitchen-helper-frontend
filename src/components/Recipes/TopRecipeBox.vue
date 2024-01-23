<template>
	<div class="box clearfix">
		<router-link :to="'/recipes/' + recipe.id">
			<img :src="pictureUrl" :alt="recipe.name">
		</router-link>
		<h3>
			<router-link :to="'/recipes/' + recipe.id">
				{{ recipe.name }}
			</router-link>
		</h3>
		<p>{{ recipe.summary.slice(0, 50) }}{{ recipe.summary.length > 50 ? "..." : null }}</p>
	</div>
</template>

<script setup>
import {ref} from "vue";
import {createPictureUrl} from "./helepers";

const props = defineProps(['recipe'])
const pictureUrl = ref(createPictureUrl(props.recipe.picture))
</script>

<style scoped>

.top .box {
	background-color: var(--white);
}

.top .box {
	padding: 25px
}

.top .box h3 {
	font-size: 1.2rem;
	font-weight: 700;
	padding-left: 120px;
	text-transform: capitalize;
}

.top .box h3 a {
	color: var(--main-text);
}

.top .box p {
	line-height: 22px;
	margin-bottom: 0;
	padding-left: 120px;
	color: var(--main-text);
	height: 90px;
}

.top .box img {
	float: left;
	width: 100px;
	height: 100px;
	border-radius: 6px;
	object-fit: cover;
}
</style>