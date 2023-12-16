<template>
  <nav-bar></nav-bar>
  <router-view></router-view>
  <footer-nav></footer-nav>
</template>

<script>
import NavBar from './components/NavBar/NavBar.vue';
import FooterNav from './components/FooterNav/FooterNav.vue';

export default {
  components: {
    'nav-bar': NavBar,
    'footer-nav': FooterNav,
  }
}

</script>

<style>
:root {
  --main-color: #FBB040;
  --grey: #727272;
  --grey-transparent: #727272AA;
  --dark-grey: #333333;
  --light-grey: #AAAAAA;
  --very-light-grey: #DEDEDE;
  --white-hover: #F8F8F8;
  --white: #ffffff;
  --red: #e13b2b;
}

body {
  font-family: 'Roboto', sans-serif;
  letter-spacing: .5px;
  padding-top: 90px;
}

body, html {
  height: 100%;
}

a {
  text-decoration: none !important;
}

@media only screen and (max-width: 992px) {
  body {
    padding-top: 70px;
  }
}

@media only screen and (max-width: 480px) {
  body {
    padding-top: 50px;
  }
}
</style>