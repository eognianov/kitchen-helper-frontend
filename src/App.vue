<template>
	<nav-bar></nav-bar>
	<p>Hello</p>
	<button class="btn btn-danger mt-5"><i class="bi bi-usb-c"></i> test</button>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
	components: {
		'nav-bar': NavBar
	}
}

</script>