<template>
	<div
		class="filter"
		style="display: flex; flex-direction: column; justify-content: center; margin-top: 30px;"
	>
		<div>
			{{ items }}
		</div>
		<div>
			<input
				type="text"
				v-model="searchText"
				name="input_01"
				id="input_01"
				@keyup.enter="_filterHandler"
			/>
			<button @click="_filterHandler">button</button>
		</div>
		<div>
			<p>{{ keyword }}</p>
			<ul>
				<li v-for="item in searchItems">
					{{ item.text }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
@Component
export default class FilterLogic extends Vue {
	private searchText: String = '';
	private items: Array<Object> = [
		{ key: 0, text: 'value service 01' },
		{ key: 1, text: 'testKey service 02' },
		{ key: 2, text: 'do,io' },
		{ key: 3, text: 'test.tv' },
		{ key: 4, text: 'noMore' },
		{ key: 5, text: 'slash/dummy' },
	];
	private searchItems: Array<object> = [];
	private keyword: Array<string> = [];
	data() {
		return {};
	}
	_filterHandler() {
		if (this.searchText == '') return;
		this._filter();
	}

	_filter() {
		const _keyword = [];
		const reformat = this.items.map((o, idx) => {
			let _array = o.text.split(/[.,\/ -]/);
			_array.forEach(e => {
				_keyword.push(e);
			});
			let _trim = _array.toString().replace(/,/gi, '');
			return { ...this.items[idx], trim: _trim };
		});
		this.keyword = _keyword;

		const extract = reformat.filter((obj, idx) => {
			let reg = new RegExp(this.searchText, 'gi');
			let str = obj.trim.match(reg);
			if (str) return obj;
		});

		// setting
		this.text = '';
		this.searchItems = extract;
	}

	mounted() {
		//console.log('child', this);
		//this._filter();
	}
}
</script>

<style scoped></style>
