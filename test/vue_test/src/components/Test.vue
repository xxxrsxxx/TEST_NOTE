<template>
	<div style="margin-top: 15px;">
		<div>
			<p @click="dispatch">TEST</p>
			<TestList
				v-for="(item, index) in this.list"
				:data="item"
				:all="group"
				@$emit="catchEvent"
			>
			</TestList>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import _ from 'lodash';

import TestList from '@/components/TestList';

@Component({
	components: { TestList },
})
export default class Test extends Vue {
	data() {
		return {
			obj: { array: [1, 2, 3, 4, 5], test: 1 },
			copy: {},
			list: [
				{ _id: 1, value: 1 },
				{ _id: 2, value: 2 },
				{ _id: 3, value: 3 },
				{ _id: 4, value: 4 },
			],
			elClick: false,
			group: { exec: false, data: [] },
			select: [],
		};
	}
	calculate() {
		const { obj } = this;
		let _t = _.keys(obj).forEach(x => {
			this.copy[`${x}`] = obj[`${x}`];
		});
		console.log('_t', this.copy);
	}
	catchEvent(e) {
		this.select.push(e);
		console.log('catchEvent', e[0], this.select);
	}
	dispatch() {
		let te = _.map(this.list, obj => {
			return obj.value;
		});
		let o = (this.elClickelClick = this.elClick == false ? true : false);
		this.group = {};
		this.group.exec = o;
		this.group.data = te;
	}
	mounted() {
		let calc = this.calculate();
	}
}
</script>

<style scoped></style>
