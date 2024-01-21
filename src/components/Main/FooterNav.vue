<template>
	<footer>
		<div class="container">
			<div class="row">
				<div class="col-lg-10 col-sm-12 mt-6 about">
					<h5>About</h5>
					<p>Kitchen Helper is an innovative project developed for <b>SoftUni Intern and Team Lead Academy</b>,
						designed to revolutionize the culinary experience.
						This cutting-edge application is a recipe hub powered by an advanced <b>AI generator</b>,
						offering users a seamless and enhanced search functionality based on ingredients.
					</p>
					<p>
						The robust back-end of Kitchen Helper is built on a foundation of powerful technologies,
						including <b>FastAPI, Nginx, Uvicorn, Celery, and PostgreSQL.</b>
						These components work together seamlessly to ensure efficient data processing,
						storage, and retrieval. On the front-end, we've leveraged the capabilities of
						<b>Vue.js, Axios, Pinia, and Bootstrap </b>to create a user-friendly interface
						that enhances the overall experience.
					</p>
					<p>
						Kitchen Helper is not just a recipe app; it's a testament to the fusion of
						technology and culinary arts, providing users with a sophisticated platform
						to explore, discover, and create delightful dishes with ease.
					</p>
				</div>
				<div class="col-lg-2 col-sm-12 mt-6">
					<h5>Team</h5>
					<ul class="row">
						<li class="col-lg-12 col-sm-6">
							<a href="https://github.com/eognianov" target="_blank">Emilian Ognianov </a>
							<p>Team Leader</p>
						</li>
						<li class="col-lg-12 col-sm-6">
							<a href="https://github.com/ddimitrovv" target="_blank">Dimitar Dimitrov </a>
							<p>Back-end, Front-end</p>
						</li>
						<li class="col-lg-12 col-sm-6">
							<a href="https://github.com/VelinIliev" target="_blank">Velin Iliev</a>
							<p>Front-end, Back-end</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</footer>
</template>

<style scoped>
footer {
	margin-top: 90px;
	padding: 40px 0;
	background-color: var(--dark-background);
}

footer h5 {
	margin-bottom: 30px;
	padding-bottom: 20px;
	color: var(--light-text);
	border-bottom: 1px dashed var(--light-text);
}

footer p, footer ul li a {
	color: var(--light-text);
	transition: all 0.3s ease;
}

footer ul li a {
	font-weight: 800;
}

footer ul li a:hover {
	cursor: pointer;
	font-size: 1.1rem;
	color: var(--secondary-color);
	transition: all 0.3s ease;
}

footer ul {
	padding-left: 0;
}

footer ul li {
	list-style: none;
}

footer ul li p {
	font-size: .8rem;
	font-weight: normal;
}

footer .about {
	line-height: 1.7;
}
footer .about b{
	font-weight: 800;
}

footer .fa-regular {
	color: var(--light-text);
}
</style>