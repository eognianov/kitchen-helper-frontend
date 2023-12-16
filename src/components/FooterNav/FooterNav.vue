<template>
	<footer>
		<div class="container">
			<div class="row">
				<div class="col-lg-8 col-sm-6">
					<h5>About</h5>
					<p>Nunc at augue gravida est fermentum vulputate. gravida est fermentum vulputate Pellentesque et ipsum in dui
						malesuada tempus.</p>
				</div>
				<div class="col-lg-2 col-sm-6">
					<h5>Archive</h5>
					<ul>
						<li><a href="#">June 2017</a>
						</li>
						<li><a href="#">July 2017</a>
						</li>
						<li><a href="#">August 2017</a>
						</li>
						<li><a href="#">September 2017</a>
						</li>
					</ul>
				</div>
				<div class="col-lg-2 col-sm-6">
					<h5>Recipes</h5>
					<ul>
						<li><a href="#">Browse Recipes</a>
						</li>
						<li><a href="#">Recipe Detail</a>
						</li>
						<li><a href="#">Submit Recipe</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
	name: "FooterNav"
}
</script>

<style scoped>
footer {
	margin-top: 90px;
	padding: 90px 0;
	background-color: var(--dark-grey);
}

footer h5 {
	margin-bottom: 30px;
	padding-bottom: 20px;
	color: var(--light-grey);
	border-bottom: 1px dashed var(--light-grey);
}

footer p, footer ul li a {
	color: var(--light-grey);
	transition: all 0.3s ease;
}

footer ul li a:hover {
	color: var(--white);
	transition: all 0.3s ease;
}

footer ul {
	padding-left: 0;
}

footer ul li {
	list-style: none;
}
</style>