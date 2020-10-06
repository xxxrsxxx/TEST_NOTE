<template>
	<div>
		<p>TestValidate</p>
		<div style="display: flex;">
			<div v-for="item in values" :key="item.key" style="flex: 1 1 0%;">
				<label :for="item.key"></label>
				<input
					type="checkbox"
					:name="item.key"
					:id="item.key"
					:class="{ isActive: item.isActive }"
					@click="actHandler(item)"
				/>
			</div>
		</div>
		<div style="margin: 15px 0;">
			<button @click="calculate">calculate</button>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import _ from 'lodash';
@Component({})
export default class TestValidate extends Vue {
	data() {
		return {
			values: [
				{ key: 0, value: 0, isActive: false, isChild: true, child: [{ key: 'child0' }] },
				{ key: 1, value: 1, isActive: false, isChild: true, child: [{ key: 'child1' }] },
				{ key: 2, value: 2, isActive: false, isChild: false },
				{ key: 3, value: 3, isActive: false, isChild: false },
			],
		};
	}
	actHandler(obj) {
		console.log('actHandler', obj);
		let checked = !obj.isActive;
		obj.isActive = checked;
	}
	calculate() {
		let isActive = this.values.filter(x => x.isActive);
		let child = this.values
			.filter(x => x.isChild)
			.map(x => x.child)
			.flat();
		let array = this.values.concat(child);
		console.log('calculate', isActive, 'child', child, 'array', array);
	}
	mounted() {}
}
</script>

<style scoped></style>
