<template>
	<div>
		<div id="container">
			<article id="content" class="content faq">
				<FaqDetailSearch ref="faqSearch" @searchTxt="searchTxt" />
				<FaqCategory ref="faqCategory" @selectCate="selectCate" />
				<div class="bg_space" />
				<FaqInDetail ref="faqDetail" />
			</article>
			<m85Footer />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import _ from 'lodash';

import m85Footer from '../../presentational/footer/Footer.vue';
import FaqDetailSearch from '../../presentational/voc/FaqDetailSearch.vue';
import FaqInDetail from '../../presentational/voc/FaqInDetail.vue';
import FaqCategory from '../../presentational/voc/FaqCategory.vue';
import { faqApi } from '@/common/repositories';
@Component({
	components: {
		m85Footer,
		FaqDetailSearch,
		FaqInDetail,
		FaqCategory,
	},
})
export default class Faq extends Vue {
	private faqCate: Array<object> = [];
	private faqObj: Object = { code: 'member', name: '회원정보' };
	private queryText: String = '';
	private filterMatch: boolean = true;

	/**
	 * name faq
	 * @dsc 초기 설정 값 셋팅
	 **/
	async faq() {
		await faqApi
			.getCategory({
				upperCode: 'faqCategory',
			})
			.then(res => {
				this.faqCate = res.data.items;
			});
		await this.searchFilter();

		let { faqObj } = this;

		const param = {
			code: faqObj.code,
			name: faqObj.name,
		};

		this.$refs.faqCategory.faqCate = this.faqCate;
		this.$refs.faqCategory.code = faqObj.code;

		if (this.filterMatch) this.selectCate(param);
		else {
			this.searchTxt({ text: this.queryText });
		}
	}
	/**
	 * name searchFilter
	 * @dsc faq 쿼리 스트링 카테고리 매치 필터
	 **/
	async searchFilter() {
		if (!this.$route.query.searchTxt) return;
		/**
		 * name keyword
		 * @dsc 검색 진입시 카테고리 api 기반 키워드 생성
		 **/
		let keyword = [];
		this.faqCate.forEach(obj => {
			let slash = obj.name.includes('/');

			let _data = slash ? obj.name.split('/') : obj.name.split(' ');
			_data.forEach(e => {
				keyword.push({ searchKey: e }, { searchKey: e.substring(0, 2) });
			});
		});
		keyword = _.uniqBy(keyword, 'searchKey');

		this.queryText = this.$route.query.searchTxt.toString();

		const origin = _.map(this.faqCate, obj => {
			let _data = obj.name.split('/').toString().replace(/,/gi, '');
			let _result = { ...obj, txt: _data };
			return _result;
		});

		const reformat = _.filter(origin, obj => {
			let first = keyword.filter(o => {
				let reg = new RegExp(o.searchKey, 'gi');
				let str = this.queryText.match(reg);
				if (str) return o;
			});

			const _result = _.uniqBy(first, 'code');
			if (_result.length != 0) {
				let newReg = new RegExp(_result[0].searchKey, 'gi');
				let newStr = obj.txt.match(newReg);
				if (newStr) return obj;
			}
		});

		if (reformat.length > 0) {
			this.filterMatch = true;
			this.faqObj = { ...reformat[0] };
		} else this.filterMatch = false;
	}

	selectCate(obj: object) {
		this.$refs.faqDetail.selectCate(obj);
	}

	searchTxt(obj: object) {
		this.$refs.faqDetail.searchFaq({
			searchText: obj.text,
		});
		// search keyword init
		this.$refs.faqSearch.searchKeyword = '';
	}

	async mounted() {
		await this.faq();
	}
}
</script>
