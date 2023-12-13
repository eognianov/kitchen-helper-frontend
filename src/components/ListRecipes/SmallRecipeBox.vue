<template>
	<div class="col-lg-4 col-sm-6">
		<div class="box grid recipes">
			<div class="by"><i class="fa fa-user" aria-hidden="true"></i> Gerina Amy</div>
			<router-link to="/details">
				<img src="/images/P1560722.JPG?url" alt="">
			</router-link>
			<h2>
				<router-link to="/details">
					Cornbread Topped Cast-Iron Skillet Chili
				</router-link>
			</h2>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
			<div class="tag">
				<a href="#">Chicken</a>
				<a href="#">Lemon</a>
				<a href="#">Sayur</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "SmallRecipeBox"
}
</script>

<style scoped>
.box.grid.recipes {
	position: relative;
	margin-bottom: 20px;
	padding-bottom: 20px;
	text-align: center;
	border: 1px solid #dedede
}

.box.grid.recipes .by {
	position: absolute;
	width: 100%;
	padding: 10px 25px;
	text-align: left;
	color: #fff;
	background-color: #727272AA;
	font-size: 14px;
	font-weight: bolder;
}

.box.grid.recipes .tag, .box.grid.recipes h2, .box.grid.recipes p {
	padding-right: 10px;
	padding-left: 10px
}

.box.grid.recipes p {
	font-size: .85rem;
	line-height: 1.2;
}

.box.grid.recipes h2 {
	font-size: 1.1rem;
	font-weight: 700;
	text-transform: capitalize
}

.box.grid.recipes h2 a {
	color: #333;
}

.box.grid.recipes img {
	width: 100%;
	margin-bottom: 10px
}

.box.grid.recipes .tag a {
	display: inline-block;
	padding: 5px 10px;
	color: #fff;
	border: 1px solid #FBB040;
	border-radius: 6px;
	background: #FBB040;
	transition: all 0.3s ease;
	margin: 0 3px 6px 0;
	text-decoration: none;
}

.box.grid.recipes .tag a:hover {
	text-decoration: none;
	background-color: #f8f8f8;
	color: #222;
	transition: all 0.3s ease;
}

</style>