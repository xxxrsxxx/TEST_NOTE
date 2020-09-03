<template>
	<div class="object" style="display: flex;">
		<div
			style="flex: 1;"
			v-for="item in items"
			:key="item._id"
			@click="
				() => {
					select = item;
				}
			"
		>
			<label :class="item._id == select._id ? 'is_active' : ''">
				<input type="radio" v-model="select" :value="item" />
			</label>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
@Component
export default class TestObject extends Vue {
	select: Object = {};
	items: Array<Object> = [
		{ _id: 1, value: 1 },
		{ _id: 2, value: 2 },
		{ _id: 3, value: 3 },
	];
	data() {
		return {};
	}
	@Watch('select')
	selectHandler() {
		console.log('watch select', this.select);
	}
	mounted() {}
}
</script>

<style scoped></style>
