<template>
	<div class="box d-flex gap-4">
		<div>
			<router-link :to="'/recipes/' + recipe.id">
				<img :src="pictureUrl" :alt="recipe.name">
			</router-link>
		</div>
		<div>
			<h3>
				<router-link :to="'/recipes/' + recipe.id">
					{{ recipe.name }}
				</router-link>
			</h3>
			<p>{{ recipe.summary?.slice(0, 120) }}{{ recipe.summary?.length > 120 ? "..." : null }}</p>
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
	min-height: 10rem;
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
	line-height: 1.1;
	color: var(--main-text);
	max-height: 5.3rem;
	margin-bottom: 0;
	overflow: hidden;
	font-size: .8rem;
}

.top .box img {
	width: 8rem;
	height: 100%;
	border-radius: 4px;
	object-fit: cover;
}
</style>