<template>
	<div class="flex m-1">
		<vue-draggable-next class="dragArea list-group w-full" :list="list">
			<div
					class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
					v-for="element in list"
					:key="element.name"
			>
				{{element.id }} - {{ element.name }}
			</div>
		</vue-draggable-next>
		<button @click="print">Print</button>
	</div>
</template>
<script setup>
import {ref} from 'vue'
import {VueDraggableNext} from 'vue-draggable-next'

const list = ref([
	{name: 'John', id: 1},
	{name: 'Joao', id: 2},
	{name: 'Jean', id: 3},
	{name: 'Gerard', id: 4},
])
function print(){
	console.log(list.value)
}
</script>