<template>
	<nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="navigation">
		<div class="container-fluid justify-content-center">
			<router-link to="/" class="navbar-brand">
				<img src="/images/logos/kh-logo-hw.svg" alt>
			</router-link>

			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
							aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
				<ul class="navbar-nav">
					<li class="nav-item">
						<router-link to="/" class="nav-link">
							Home
						</router-link>
					</li>
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true"
							 aria-expanded="false">

							Demo

						</a>
						<div class="dropdown-menu">
							<a class="dropdown-item" href="#">Homepage-1</a>
							<a class="dropdown-item" href="#">Homepage-2</a>
						</div>
					</li>
					<li class="nav-item dropdown">
						<router-link to="/recipes" class="nav-link" aria-haspopup="true">
							Recipes
						</router-link>
					</li>
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true"
							 aria-expanded="false">

							Pages

						</a>
						<div class="dropdown-menu">
							<a class="dropdown-item" href="#">Typography</a>
							<a class="dropdown-item" href="#">Contact</a>
						</div>
					</li>
					<li class="nav-item btn-submit-recipe">
						<router-link to="/create" class="nav-link">
							<i class="fa fa-upload" aria-hidden="true"></i>
							Submit Recipe
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: "NavBar.vue"
}
</script>

<style>

#navigation {
	box-sizing: border-box;
	padding-top: 0 ;
	padding-bottom: 0 ;
}

.navbar-brand img {
	max-width: 220px;
	width: 100%;
}

.navbar-dark .navbar-brand {
	color: #fff;
	transition: all 0.3s ease;
}

.navbar-dark .navbar-brand:hover {
	color: #f51e09;
	transition: all 0.3s ease;
}

.navbar .navbar-brand {
	font-weight: 700;
	position: absolute;
	left: 30px;
	letter-spacing: 5px;
	font-size: 21px;
}

.navbar .navbar-brand img {
	margin-right: 10px;
}

.navbar .navbar-brand i {
	color: #fff
}

.navbar .navbar-nav .btn-submit-recipe {
	position: absolute;
	right: 30px
}

.navbar .navbar-nav .btn-submit-recipe a {
	margin-top: 23px;
	padding: 13px 24px 11px;
	color: #fff;
	border-radius: 6px;
	background-color: #727272;
}

.navbar .navbar-nav .btn-submit-recipe a i {
	margin-right: 5px
}

.navbar .navbar-nav .btn-submit-recipe a:hover {
	background-color: #f8f8f8;
	color: #222;
	transition: all 0.3s ease;
	border: 1px solid #727272;
}

.dropdown-item {
	display: block;
	width: 100%;
	padding: 0.8rem 1.8rem;
	clear: both;
	font-weight: 400;
	color: #212529;
	text-align: inherit;
	white-space: nowrap;
	background: 0 0;
	border: 0;
}

.navbar .dropdown-item.active, .navbar .dropdown-item:active, .navbar .dropdown-item:focus, .navbar .dropdown-item:hover {
	text-decoration: none;
	color: #fff;
	background-color: #727272
}

.navbar-dark .navbar-nav {
	padding-left: 80px;
}

.navbar-dark .navbar-nav .nav-link {
	font-weight: 700;
	padding: 36px 20px 31px;
	color: #fff;
	transition: all 0.3s ease;
}

.navbar-dark .navbar-nav .nav-link:hover {
	color: #727272;
	transition: all 0.3s ease;
}

.navbar-dark .navbar-nav .active > .nav-link, .navbar-dark .navbar-nav .nav-link.active {
	color: #727272;
	border-bottom: 3px solid #727272;
}

.dropdown-menu {
	position: absolute;
	top: 100%;
	left: 0;
	z-index: 1000;
	display: none;
	float: left;
	min-width: 10rem;
	padding: 0;
	margin: 0;
	font-size: 1rem;
	color: #212529;
	text-align: left;
	list-style: none;
	background-color: #fff;
	background-clip: padding-box;
	border-radius: 0;
}


.navbar-dark {
	background-color: #FBB040;
}

.container-fluid > .navbar-toggler {
	border: 2px solid #FFFFFF66;
}
.navbar .nav-item a{
	box-sizing: border-box;
	border-bottom: 3px solid #72727200;
}
.navbar .nav-item a.router-link-active {
	color: #727272;
	border-bottom: 3px solid #727272;
}
.navbar .nav-item.btn-submit-recipe a.router-link-active {
	color: #fff;
}

@media only screen and (max-width: 992px) {
	.navbar {
		padding: 10px 0
	}

	.navbar-dark .navbar-nav {
		padding-left: 0;
	}

	.navbar .container-fluid {
		padding-right: 15px;
		padding-left: 15px
	}

	.navbar .navbar-brand {
		position: unset;
		left: unset
	}

	.navbar .justify-content-center {
		justify-content: space-between !important
	}

	.navbar .navbar-nav .btn-submit-recipe {
		position: unset;
		right: unset;
		text-align: center
	}

	.navbar-dark .navbar-nav .active > .nav-link, .navbar-dark .navbar-nav .nav-link.active {
		border-bottom: 1px solid #727272
	}

	.navbar-dark .navbar-nav .nav-link {
		padding: 15px
	}
}


@media only screen and (max-width: 768px) {
	.navbar {
		padding: 10px 0
	}

	.navbar .container-fluid {
		padding-right: 15px;
		padding-left: 15px
	}

	.navbar .navbar-brand {
		position: unset;
		left: unset
	}

	.navbar .justify-content-center {
		justify-content: space-between !important
	}

	.navbar .navbar-nav .btn-submit-recipe {
		position: unset;
		right: unset;
		text-align: center
	}

	.navbar-dark .navbar-nav .active > .nav-link, .navbar-dark .navbar-nav .nav-link.active {
		border-bottom: 1px solid #727272
	}

	.navbar-dark .navbar-nav .nav-link {
		padding: 15px
	}
}

@media only screen and (max-width: 480px) {
	.navbar-brand img {
		max-width: 180px;
		width: 80%;
	}

	.navbar {
		padding: 10px 0
	}

	.navbar .container-fluid {
		padding-right: 15px;
		padding-left: 15px
	}

	.navbar .navbar-brand {
		position: unset;
		left: unset
	}

	.navbar .justify-content-center {
		justify-content: space-between
	}

	.navbar .navbar-nav .btn-submit-recipe {
		position: unset;
		right: unset;
		text-align: center
	}

	.navbar-dark .navbar-nav .active > .nav-link, .navbar-dark .navbar-nav .nav-link.active {
		border-bottom: 1px solid #727272
	}

	.navbar-dark .navbar-nav .nav-link {
		padding: 15px
	}
}

</style>