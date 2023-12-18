<template>
	<div class="box grid recipes">
		<div class="by">
			<i class="fa fa-user" aria-hidden="true"></i> Gerina Amy
		</div>
		<router-link to="/details">
			<img src="/images/P1560722.JPG?url" alt="">
		</router-link>
		<h2>
			<router-link to="/details">
				Roast Chicken With Lemon Gravy
			</router-link>
		</h2>
		<p>Dapibus mattis a. Nec lacus nam. Volutpat molestie ipsum. Eu et fermentum malesuada et et lorem mauris
			aenean partur..</p>
		<div class="tag">
			<a href="#">Chicken</a>
			<a href="#">Lemon</a>
			<a href="#">Sayur</a>

		</div>
	</div>
</template>

<script>
export default {
	name: "RecipeBox"
}
</script>

<style scoped>
.box {
	color: var(--dark-grey);
}
.box.grid.recipes {
	position: relative;
	margin-bottom: 40px;
	padding-bottom: 20px;
	text-align: center;
	border: 1px solid var(--very-light-grey)
}

.box.grid.recipes .by {
	position: absolute;
	width: 100%;
	padding: 20px 35px;
	text-align: left;
	color: var(--white);
	background-color: var(--grey-transparent);
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

.box.grid.recipes h2 a {
	color: var(--dark-grey)
}

.box.grid.recipes img {
	width: 100%;
	margin-bottom: 30px
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
	background-color: var(--white-hover);
	color: var(--grey);
	transition: all 0.3s ease;
}
</style>