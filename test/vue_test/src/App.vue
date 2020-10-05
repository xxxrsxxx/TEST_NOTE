<template>
	<div id="app">
		<Landing msg="TypeScript" msg1="Test message" @$emit="emitCheck">
			<template v-slot:type1>
				<p>payload type1 slot</p>
			</template>
			<template #type2="props">
				<p>payload type2 slot{{ props }}</p>
			</template>
			<template v-slot:type3="props">
				<p>type3 {{ props }}</p>
				<button @click="props.fnc()">SlotProps Button</button>
			</template>
			<template slot-scope="props">
				<p>slot-scope</p>
				{{ props }}
			</template>
		</Landing>
		<div>
			<p>{{ _msgFnc }}</p>
			<p>{{ 2000 | currency }}</p>
			<button @click="testController">testController Button</button>
			<button @click="testFnc">testFnc Button</button>
			<input type="file" name="file_01" id="file_01" @change="file.fileValidation($event)" />
			<img v-if="fileOption.fileSrc" :src="fileOption.fileSrc" alt="@" />
		</div>
		<Test></Test>
		<TestValidate></TestValidate>
		<TestObject></TestObject>
		<FilterLogic></FilterLogic>
		<TestQuantity></TestQuantity>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import _ from 'lodash';

import Landing from '@/components/Landing';
import Test from '@/components/Test';
import TestValidate from '@/components/TestValidate';
import TestObject from '@/components/TestObject';
import FilterLogic from '@/components/FilterLogic';
import TestQuantity from '@/components/TestQuantity';

import Mixin from '@/mixin/Mixin';

// 컴퍼넌트 메서드 선언 가능
@Component({
	components: {
		Landing,
		Test,
		TestValidate,
		TestObject,
		TestQuantity,
		FilterLogic,
	},
	filters: {
		currency(value) {
			let num = new Number(value);
			return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
		},
	},
	mixins: [Mixin],
})
export default class App extends Vue {
	private n: number = 1;
	private str: string = 'str';
	private array: object[] = [];
	private fileOption: object = {};
	data() {
		return {
			n: 1,
			str: 'str',
			array: [
				{
					_id: 1,
					content: 'content',
				},
			],
			lodashData: [
				{ user: 'xr', age: 10 },
				{ user: 'xxr', age: 20 },
				{ user: 'xxxr', age: 10 },
			],
			operationData: {
				duplicate: [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 3 }, { x: 1 }],
				num: [1, 2, 3, 4],
				dummy: [
					{ title: 'xx1', price: 20, author: 'x1', rank: 1 },
					{ title: 'xx2', price: 25, author: 'x2', rank: 2 },
					{ title: 'xx3', price: 35, author: 'x3', rank: 3 },
					{ title: 'xx4', price: 15, author: 'x4', rank: 4 },
				],
			},
			fileOption: {
				file: [],
				fileSrc: '',
				maxFileSize: 524880,
			},
		};
	}
	created() {
		let { array } = this;
	}
	// 약간 computed 같은 개념 같
	get _msgFnc(): string {
		//console.log('_msgFnc Type Script');
		return '_msgFnc';
	}
	@Watch('str')
	testFnc() {
		//console.log('Watch Test Fnc');
	}
	testController() {
		this.str = this.str == '' ? 'string' : '';
	}
	emitCheck() {
		//console.log('emit check');
	}
	typeFnc(n: number, t: string): string {
		return `${t}:${n}`;
	}
	checkVoid(): void {
		//console.log('not return values');
	}

	_lodashOperation(): object {
		// https://lodash.com/docs/4.17.15#chunk
		// https://eastflag.co.kr/frontend/javascript/lodash-quiz/

		let { lodashData, operationData: opdata } = this;
		const init = () => {
			let _age = _.map(obj => {
				return obj.age;
			});
			// 중복 제거
			let _x = _.uniqBy(opdata.duplicate, 'x');
			let _f1 = _.filter(opdata.duplicate, ['x', 1]);
			let _f2 = _.filter(opdata.duplicate, o => {
				if (o.x !== 1) return;
				return o;
			});

			let _f3 = _.filter(opdata.num, n => {
				return n % 2 == 0;
			});
			// 데이터 변형 발생
			// let _rm = _.remove(opdata.num, n => {
			// 	return n % 2 == 0;
			// });
			let _rm = 0;
			// 최대값 해당 추출
			let _max = _.maxBy(lodashData, 'age');

			// chaining logic
			let chain = _.chain(opdata.dummy)
				.sortBy('title')
				.map((item, index) => {
					let _str = '';
					_str = `${index}, ${item.title}`;
					return _str;
				})
				.value();

			console.log('data validation', opdata.duplicate, opdata.num);
			let idxOf = _.indexOf([1, 2, 3, 4], 2);
			let find = _.find(opdata.dummy, o => {
				return o.rank > 1;
			});
			let chunk = _.chunk(opdata.dummy, 2);

			// console.log(
			// 	'_t',
			// 	_age,
			// 	_x,
			// 	_f1,
			// 	'_f2',
			// 	_f2,
			// 	'f3',
			// 	_f3,
			// 	'\n_rm',
			// 	_rm,
			// 	'\n_max',
			// 	_max,
			// 	'\nchain',
			// 	chain,
			// 	'\nidxOf',
			// 	idxOf,
			// 	'\nfind',
			// 	find,
			// 	'\nchunk',
			// 	chunk,
			// );
		};
		return {
			init,
		};
	}
	get file() {
		return this._file();
	}
	_file() {
		const fileValidation = async event => {
			let { file: OptFile, fileSrc: optFileSrc, maxFileSize } = this.fileOption;
			const { target } = event;
			const _file = target.files[0];
			if (_file.size > maxFileSize) {
				console.log('5MB 초과');
				return;
			}
			this.fileOption.file = [_file];
			this.fileOption.fileSrc = await getFileUrl(_file);

			getFileUrl(_file).then(res => {
				console.log('result', res);
			});
		};
		const getFileUrl = file => {
			return new Promise(resolve => {
				let reader = new FileReader();
				reader.onload = e => {
					resolve(e.target.result);
					//https://heropy.blog/2019/02/28/blob/ 이미지 조각내기
					const blob = new Blob([e.target.result], { type: file.type });
					const url = URL.createObjectURL(blob);
					console.log('???', blob, url, 'file', file);
				};
				reader.readAsDataURL(file);
			});
		};
		const exec = () => {
			console.log('POST API');
			console.log('RESPONSE STORE UPDATE OR EMIT');
		};

		return {
			fileValidation,
			exec,
		};
	}
	note() {
		let values: string[];
		values = ['test1'];
		(values ?? (values = [])).push('test2'); // values null or undefined

		let _type = 'string';
		let _or = _type || [];

		//console.log('_type', _or);

		interface config {
			_id: number;
			key?: number;
			value: any;
			str: string;
			readonly page: number;
		}
		const init = (o: config) => {
			console.log('note', o);
		};

		let _obj = {
			_id: 10,
			value: 100,
			str: 'string',
			page: 1,
		};

		init(_obj);

		interface Func {
			(source: string, subString: string): boolean;
		}
		let init2: Func;
		init2 = (source: string, subString: string) => {
			let result = source == subString ? true : false;
			return result;
		};
		//console.log('note my', init2('hello', 'hello'));

		interface item {
			id: number;
			name: string;
		}
		let _item: item = {
			id: 1,
			name: 'test',
		};
		let _exp: item[] | [] = []; // union 두개 이상 타입 가질때 | 선언
		_exp = [{ id: 0, name: 'test0' }];
		//console.log('exp-------', _exp, _item);
	}
	get computedTest() {
		console.log('before computed');
		return o => {
			const _array = [1, 2, 3, 4, 5];
			const even = element => element % 2 === 0;
			let _some = _array.some(even);
		};
	}
	mounted() {
		const anchor = document.querySelector('.container');
		this.checkVoid();
		//console.log(this.typeFnc(1, 'String'));
		//console.log('mounted', this);
		const l = this._lodashOperation();
		l.init();
		this.file.exec();
		this.note();
		this.computedTest([{ key: 1, value: 'computed' }]);
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
