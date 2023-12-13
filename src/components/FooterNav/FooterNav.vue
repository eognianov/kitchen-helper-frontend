<template>
	<footer>
		<div class="container">
			<div class="row">
				<div class="col-lg-3 col-sm-6">
					<h5>About</h5>
					<p>Nunc at augue gravida est fermentum vulputate. gravida est fermentum vulputate Pellentesque et ipsum in dui
						malesuada tempus.</p>
				</div>
				<div class="col-lg-3 col-sm-6">
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
				<div class="col-lg-3 col-sm-6">
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
				<div class="col-lg-3 col-sm-6">
					<h5>Newsletter</h5>
					<form>
						<div class="form-group">
							<input type="text" class="form-control">
						</div>
						<button type="submit" class="btn">Subscribe</button>
					</form>
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
	background-color: #333;
}

footer h5 {
	margin-bottom: 30px;
	padding-bottom: 20px;
	color: #fff;
	border-bottom: 1px dashed #AAA
}

footer p, footer ul li a {
	color: #AAA;
	transition: all 0.3s ease;
}

footer ul li a:hover {
	color: #fff;
	transition: all 0.3s ease;
}

footer ul {
	padding-left: 0
}

footer ul li {
	list-style: none
}

.form-control {
	display: block;
	width: 100%;
	padding: .375rem .75rem;
	font-size: 1rem;
	line-height: 1.5;
	color: #222;
	background-color: #fff;
	background-clip: padding-box;
	border: 1px solid #ced4da;
	border-radius: 3px;
	transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

footer .btn {
	margin-top: 8px;
	padding: 13px 24px 11px;
	color: #fff;
	border-radius: 6px;
	background-color: #FBB040;
}

footer .btn:hover {
	color: #222;
	font-weight: bold;
	background-color: #f8f8f8;
}
</style>