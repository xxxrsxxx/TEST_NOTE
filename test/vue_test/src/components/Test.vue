<template>
	<div style="margin-top: 15px;">
		<div>
			<label for="a">전체선택</label>
			<input type="checkbox" name="a" id="a" v-model="selectAll" @click="allHandler" />
			<button @click="deleteHandler">선택삭제</button>
			<TestList
				v-for="(item, index) in this.list"
				:data="item"
				:index="index"
				:group="group"
				@check="checkHandler"
				@close="closeHandler"
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
				{ _id: 0, value: 1 },
				{ _id: 1, value: 2 },
				{ _id: 2, value: 3 },
				{ _id: 3, value: 4 },
			],
			group: { exec: false, data: [] },
			select: [],
			selectAll: false,
		};
	}

	calculate() {
		const { obj } = this;
		_.keys(obj).forEach(x => {
			this.copy[`${x}`] = obj[`${x}`];
		});
	}

	checkHandler(e) {
		if (e.checked) this.select.push(e);
		let _idx;
		if (!e.checked) {
			this.select.forEach((o, i) => {
				if (o.key == e.key) _idx = i;
			});
			this.select.splice(_idx, 1);
		}
		this.allCheck();
	}

	closeHandler(e) {
		this.list.splice(e.key, 1);
	}

	allHandler() {
		let te = _.map(this.list, obj => {
			return obj.value;
		});
		this.allCheck();
		let o = (this.selectAll = !this.selectAll);
		if (o) this.select = [];
		this.group = {};
		this.group.exec = o;
		this.group.data = te;
	}

	allCheck() {
		const { list, select } = this;
		if (list.length == select.length) this.selectAll = true;
		else this.selectAll = false;
	}

	deleteHandler() {
		let key = this.select.map((o, i) => {
			return o.key;
		});
		let _list = this.list.filter(e => {
			return !key.includes(e._id);
		});
		this.list = _list;
		this.allCheck();
	}

	mounted() {
		let calc = this.calculate();
	}
}
</script>

<style scoped></style>
