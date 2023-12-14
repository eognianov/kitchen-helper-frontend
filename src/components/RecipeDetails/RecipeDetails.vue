<template>
	<div class="recipe-detail">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-12 text-center">
					<h1>Roast Chicken With Lemon Gravy</h1>
					<div class="by"><i class="fa fa-user" aria-hidden="true"></i> Gerina Amy</div>
				</div>
				<div class="col-lg-8">
					<img src="/images/P1560722.JPG?url" alt="">
					<div class="info">
						<div class="row">
							<div class="col-lg-4 col-sm-4">
								<p>Serves:</p>
								<p><strong><i class="fa fa-users" aria-hidden="true"></i> 4 people</strong>
								</p>
							</div>
							<div class="col-lg-4 col-sm-4">
								<p>Time to prepare:</p>
								<p><strong><i class="fa fa-clock-o" aria-hidden="true"></i> 1 Hour</strong>
								</p>
							</div>
							<div class="col-lg-4 col-sm-4">
								<p>Complexity:</p>
								<p><strong><i class="fa fa-clock-o" aria-hidden="true"></i> 5</strong>
								</p>
							</div>
						</div>
					</div>


					<p>Lorem ipsum dolor sit amet, usu eu vocibus laboramus appellantur, pro no natum ullum omittam. Mei vitae
						utinam complectitur eu. Te usu cibo vulputate. Id propriae adipisci pro. Legere nominati ut mel, natum
						libris at vix.</p>

					<div class="tag">
						<a href="#">Chicken</a>
						<a href="#">Lemon</a>
						<a href="#">Sayur</a>
					</div>

					<div class="ingredient-direction">
						<div class="row">
							<div class="col-lg-6 col-sm-6">
								<h3>Ingredients</h3>
								<ul class="ingredients p-3">
									<li>3 Slice Chicken</li>
									<li>2 cubes beef bouillon, crumbled</li>
									<li>2 pounds cubed beef stew meat</li>
									<li>3 tablespoons vegetable oil</li>
									<li>1 large onion, chopped</li>
									<li>1 teaspoon dried rosemary</li>
									<li>1/2 teaspoon ground black pepper</li>
								</ul>
							</div>
							<div class="col-lg-6 col-sm-6">
								<h3>Instructions</h3>
								<ol class="directions">
									<li>Mei latine maluisset constituam ut. Eum vero vocibus at, minim debet deterruisset cum ei. Soluta
										virtute tibique cu quo, his vivendo suscipit ea. Legere fabulas pro ea.
									</li>
									<li>An unum soluta eos, audire meliore te nam. Mundi choro sensibus ut vim, ut sed errem ludus
										tractatos, eu vix fierent definiebas. Ad est autem appareat. Vim ne latine interpretaris, eum
										sensibus mediocritatem cu.
									</li>
									<li>Est an etiam cetero fierent. At sit primis evertitur. Est prima electram voluptatum ne. Nec id
										atqui contentiones mediocritatem, ut mel enim soleat audire, tecripta consequat ea.
									</li>
									<li>Vidit mutat periculis sed ex, ex mel nihil suscipiantur. Brute noster aeterno et eum, mea et idque
										primis repudiare.
									</li>
								</ol>
							</div>
						</div>
					</div>


					<div class="nutrition-facts clearfix">
						<h3>Nutrition Facts</h3>
						<div>
							<p>Calories:</p>
							<p><strong>632 kcal</strong>
							</p>
						</div>
						<div>
							<p>Carbohydrate:</p>
							<p><strong>37 g</strong>
							</p>
						</div>
						<div>
							<p>Fat:</p>
							<p><strong>92 g</strong>
							</p>
						</div>
						<div>
							<p>Protein:</p>
							<p><strong>63 g</strong>
							</p>
						</div>
						<div>
							<p>Cholesterol:</p>
							<p><strong>0 mg</strong>
							</p>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "RecipeDetails"
}
</script>

<style scoped>
.recipe-detail {
	padding: 70px 0
}

.recipe-detail h1 {
	font-size: 2.5rem;
	font-weight: 700;
	margin-bottom: 10px;
	color: #727272;
}

.recipe-detail .by {
	margin-bottom: 40px;
	font-size: 18px;
	color: #727272;
}

.recipe-detail .by i {
	font-size: 20px;
	color: #727272;
}

.recipe-detail img {
	width: 100%
}


.recipe-detail .tag a {
	display: inline-block;
	padding: 10px 20px;
	color: #fff;
	border: 1px solid #FBB040;
	border-radius: 6px;
	background: #FBB040;
	transition: all 0.3s ease;
	margin: 0 3px 6px 0;
	text-decoration: none;
}

.recipe-detail .tag a:hover {
	text-decoration: none;
	background-color: #f8f8f8;
	color: #727272;
	border: 1px solid #727272;
	transition: all 0.3s ease;
}


.recipe-detail .info {
	margin-bottom: 20px;
	padding: 20px;
	color: #fff;
	background-color: #727272;
}

.recipe-detail .info p {
	font-size: .8rem;
	margin-bottom: 0
}

.recipe-detail .info p strong {
	font-size: 1rem;
	color: #fff
}

.recipe-detail .ingredient-direction {
	margin-top: 30px
}

.recipe-detail .ingredient-direction h3 {
	font-size: 1.2rem;
	font-weight: 700;
	margin-bottom: 20px
}

.recipe-detail .ingredient-direction ul.ingredients {
	padding: 30px 30px 30px 0;
	list-style: none;
	background: #f9f9f9
}

.recipe-detail .ingredient-direction ul.ingredients li {
	margin-bottom: 10px;
	padding-bottom: 10px;
	border-bottom: 1px dashed #dedede
}

.recipe-detail ol.directions > li {
	position: relative;
	margin-bottom: 30px;
	padding-left: 20px
}

.recipe-detail ol.directions {
	list-style-type: none;
	margin: 15px 0 0 34px;
	padding: 0;
	counter-reset: li-counter
}

.recipe-detail ol.directions > li:before {
	font-size: 16px;
	font-weight: 700;
	line-height: 32px;
	position: absolute;
	top: 3px;
	left: -34px;
	width: 34px;
	height: 34px;
	text-align: center;
	color: #999;
	background-color: #f4f4f4;
	content: counter(li-counter);
	counter-increment: li-counter;
	cursor: default
}

.recipe-detail .nutrition-facts {
	position: relative;
	margin-bottom: 50px;
	padding-top: 20px;
	padding-bottom: 20px;
	border-top: 1px dashed #dedede;
	border-bottom: 1px dashed #dedede
}

.recipe-detail .nutrition-facts h3 {
	font-size: .9rem;
	position: absolute;
	top: -20px;
	left: 0;
	padding: 8px 10px;
	color: #fff;
	background-color: #666
}

.recipe-detail .nutrition-facts p {
	font-size: .8rem
}

.recipe-detail .nutrition-facts p strong {
	font-size: 1rem
}

.recipe-detail .nutrition-facts div {
	float: left;
	width: 20%
}

.recipe-detail .nutrition-facts div p {
	margin-bottom: 0
}

.recipe-detail .blog-comment h3 {
	font-size: 14px;
	font-weight: 800;
	line-height: 30px;
	text-decoration: underline;
	text-transform: uppercase;
	color: #333
}

.recipe-detail .blog-comment a {
	font-weight: 700;
	color: #333
}

.recipe-detail .blog-comment ul {
	padding: 0;
	list-style-type: none
}

.recipe-detail .blog-comment img {
	opacity: 1;
	border-radius: 4px;
	filter: alpha(opacity=100);
}

.recipe-detail .blog-comment img.avatar {
	position: relative;
	float: left;
	width: 65px;
	height: 65px;
	margin-top: 0;
	margin-left: 0
}

.recipe-detail .blog-comment .post-comments {
	position: relative;
	margin-right: 0;
	margin-bottom: 20px;
	padding: 10px 20px;
	color: #6b6e80;
	border: 1px dashed #dedede;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
	background: #fff;
	-o-border-radius: 4px
}

.recipe-detail .blog-comment .meta {
	font-size: 13px;
	margin-bottom: 10px !important;
	padding-bottom: 8px;
	color: #aaa;
	border-bottom: 1px solid #eee
}

.recipe-detail .blog-comment ul.comments ul {
	margin-left: 85px;
	padding: 0;
	list-style-type: none
}

.recipe-detail .reply {
	margin-bottom: 30px;
	padding: 20px;
	border-radius: 4px
}

.recipe-detail .reply h3 {
	margin-top: 0;
	text-decoration: none
}

.recipe-detail .reply .required {
	color: red
}

.recipe-detail .reply .btn-submit {
	margin-top: 10px;
	padding: 17px;
	color: #fff;
	background: #e13b2b
}

.recipe-detail .reply .btn-submit:hover {
	color: #222;
	font-weight: 400;
}
</style>