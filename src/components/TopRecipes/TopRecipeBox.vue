<template>
	<div class="box clearfix">
		<router-link to="/details">
			<img src="/images/P1560722.JPG?url" alt="">
		</router-link>

		<h3>
			<router-link to="/details">
				Cinnamon Baked Doughnuts
			</router-link>
		</h3>
		<p>Lorem ipsum dolor sit amet, adipiscing elit...</p>
	</div>
</template>

<script>
export default {
	name: "TopRecipeBox"
}
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
}

.top .box h3 a {
	color: var(--dark-grey);
}

.top .box p {
	line-height: 22px;
	margin-bottom: 0;
	padding-left: 120px;
	color: var(--dark-grey);
}

.top .box img {
	float: left;
	width: 100px;
	height: 100px;
	border-radius: 6px
}
</style>