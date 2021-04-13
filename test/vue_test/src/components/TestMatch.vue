<template>
	<div
		class="filter"
		style="display: flex; flex-direction: column; justify-content: center; margin-top: 30px"
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
			<!--			<p>{{ keyword }}</p>-->
			<!--			<ul>-->
			<!--				<li v-for="item in searchItems">-->
			<!--					{{ item.text }}-->
			<!--				</li>-->
			<!--			</ul>-->
			<p>{{ searchItems.length }}</p>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
@Component
export default class FilterLogic extends Vue {
	private searchText: String = '';
	private items: Array<Object> = [
		{ key: 0, text: '흰색보에얼룩지워주세요' },
		{ key: 1, text: '아이보리터틀넥.' },
		{ key: 2, text: '흰색가디건보풀제거부탁드립니다' },
		{ key: 3, text: '점퍼에흰색이묻었습니다.' },
		{ key: 4, text: '패딩넥라인붉은오염' },
		{ key: 5, text: '신발끈검은얼룩제거' },
		{ key: 6, text: '동물털제거' },
		{ key: 7, text: '기본으로만' },
		{ key: 8, text: '동물털제거' },
		{
			key: 9,
			text:
				'폴로남색기름때제거/라코스테자주색및검정색니트보풀제거부탁합니다분홍블라우스얼룩제거',
		},
		{ key: 10, text: '흰색카라오염(블랙니트탑)후드부분오염(회색후드티)' },
		{ key: 11, text: '기본동물털제거(무료)부탁드립니다' },
		{ key: 12, text: '검은색숏패딩등부분얼룩' },
		{ key: 13, text: '이불에음식을흘려서양념묻은거깨끗히지우ㅏ주세요' },
		{ key: 14, text: '니트가디건보풀제거요청' },
		{ key: 15, text: '(복도에끌리면오염되므로)겉포장하단봉해주세요' },
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
			let _array = o.text.split(/(?:[.,\/ -])/);
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
		console.log('extract', extract);
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
