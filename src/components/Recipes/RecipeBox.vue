<template>
	<div class="box grid recipes">
		<div class="by">
			<i class="fa fa-user" aria-hidden="true"></i> {{ recipe.created_by ? recipe.created_by : "Unknown" }}
		</div>
		<router-link :to="'/recipes/' + recipe.id">
			<img :src="pictureUrl" :alt="recipe.name">
		</router-link>
		<h2>
			<router-link :to="'/recipes/' + recipe.id">
				{{ recipe.name }}
			</router-link>
		</h2>
		<p>{{ recipe.summary?.slice(0, 80) }}{{ recipe.summary?.length > 80 ? "..." : null }} </p>
		<div class="tag">
			<router-link
					:to="'/recipes/category/' + recipe.category.id">
				{{ recipe.category.name }}
			</router-link>
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
.box {
	color: var(--main-text);
}

.box.grid.recipes {
	position: relative;
	margin-bottom: 40px;
	padding-bottom: 20px;
	text-align: center;
	border: 1px solid var(--light-background)
}

.box.grid.recipes .by {
	position: absolute;
	width: 100%;
	padding: 20px 35px;
	text-align: left;
	color: var(--white);
	background-color: var(--dark-background-transparent);
	font-size: 18px;
	font-weight: bold;
}

.box.grid.recipes .tag, .box.grid.recipes h2, .box.grid.recipes p {
	padding-right: 15px;
	padding-left: 15px
}

.box.grid.recipes h2 {
	font-size: 1.3rem;
	font-weight: 700;
	text-transform: capitalize;

}

.box.grid.recipes p {
	height: 40px;
}

.box.grid.recipes h2 a {
	color: var(--main-text)
}

.box.grid.recipes img {
	width: 100%;
	height: 300px;
	margin-bottom: 30px;
	object-fit: cover;

}

.box.grid.recipes .tag a {
	display: inline-block;
	padding: 10px 20px;
	color: var(--white);
	border: 1px solid var(--main-color);
	border-radius: 6px;
	background: var(--main-color);
	transition: all 0.3s ease;
	margin: 0 3px 6px 0;
	text-decoration: none;
}

.box.grid.recipes .tag a:hover {
	text-decoration: none;
	background-color: var(--main-hover);
	color: var(--main-text);
	transition: all 0.3s ease;
}

@media only screen and (max-width: 1400px) {
	.box.grid.recipes p {
		height: 60px;
	}
}

@media only screen and (max-width: 1200px) {
	.box.grid.recipes p {
		height: 80px;
	}
}

@media only screen and (max-width: 990px) {
	.box.grid.recipes p {
		height: 60px;
	}
}

@media only screen and (max-width: 768px) {
	.box.grid.recipes p {
		height: 80px;
	}
}

@media only screen and (max-width: 575px) {
	.box.grid.recipes p {
		height: 40px;
	}
}

@media only screen and (max-width: 433px) {
	.box.grid.recipes p {
		height: 60px;
	}
}

@media only screen and (max-width: 321px) {
	.box.grid.recipes p {
		height: 80px;
	}
}
@media only screen and (max-width: 1398px) {
	.box.grid.recipes h2 {
		height: 50px;
		overflow: hidden;
	}
}


</style>