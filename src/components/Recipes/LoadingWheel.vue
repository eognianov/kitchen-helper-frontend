<template>
	<div class="lds-ring">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</template>

<script>

</script>

<style scoped>
.lds-ring {
	position: relative;
	width: 84px;
	/*padding-right: 64px;*/
}
.lds-ring div {
	box-sizing: border-box;
	display: block;
	position: absolute;
	width: 64px;
	height: 64px;
	margin: 10px;
	border: 10px solid var(--light-background);
	border-radius: 50%;
	animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	border-color: var(--light-background) transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
	animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
	animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
	animation-delay: -0.15s;
}

@keyframes lds-ring {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>