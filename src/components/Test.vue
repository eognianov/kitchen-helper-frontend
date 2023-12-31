<template>
<!--	<h3>{{ counter.title }}</h3>-->
<!--	<button @click="counter.decrease"> - </button>-->
<!--	<span> {{ counter.count }} </span>-->
<!--	<button  @click="counter.increase"> + </button>-->
<!--	<h5>Edit title:</h5>-->
<!--	<input type="text" v-model="counter.title">-->
<!--	<br>-->
	<button  @click="auth.login"> login </button>
	<button  @click="auth.logout"> logout </button>
</template>

<script setup>
// import {useCounterStore} from "@/stores/counter";
import {useAuthStore} from "@/stores/authStore";

// const counter = useCounterStore()
const auth = useAuthStore()

</script>

<style scoped>
button, input {
	border: 1px solid black;
	padding: 10px;
}
</style>