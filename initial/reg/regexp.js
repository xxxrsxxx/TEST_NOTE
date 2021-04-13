/**
 * @dsc Test Url https://regexr.com/5mhou
 */
class _reg {
	constructor() {
		const { init } = this;
		init();
	}
	init = () => {
		this.op();
	};
	op = () => {
		const _string =
			'Hi there, Nice to meet you. And Hello there and hi.\n' +
			'I love grey(gray) color not a gry, graay and graaay.\n' +
			'Ya ya YaYaYa Ya\n' +
			'\n' +
			'abcdefghijklmnopqrstuvwxyz\n' +
			'ABSCEFGHIJKLMNOPQRSTUVWZYZ\n' +
			'1234567890\n' +
			'\n' +
			'.[]{}()\\^$|?*+\n' +
			'\n' +
			'010-898-0893\n' +
			'010-405-3412\n' +
			'02-878-8888\n' +
			'\n' +
			'dream.coder.ellie@gmail.com\n' +
			'http://xxx.domain.com?test\n' +
			'hello@daum.net\n' +
			'hello@daum.co.kr\n' +
			'\n' +
			'https://www.youtu.be/-ZClicWm0zM\n' +
			'https://youtu.be/-ZClicWm0zM\n' +
			'youtu.be/-ZClicWm0zM';

		const regYtId = /(?:https?:\/\/)?(?:www\.)?youtu.be\/([a-zA-Z0-9-]{11})/gm;
		const regParams = /(?:com\?)([a-z]+)/gm;
		const stringCatch = /(gr[aeo]y)|(gra?y)/gm;
		const phoneNumCatch = /\d{2,3}[-.]\d{3}[-.]\d{4}/gm;
		const selectDotNum = /(\d+(?!\.))/;

		const confirm = _string.match(regYtId);
		const confirm2 = _string.match(regParams);
		const confirm3 = _string.match(stringCatch);

		console.log('========', confirm);
		console.log('========', confirm2);
		console.log('========', confirm3);
	};
	_methods = {
		objOp: value => {
			// value {"number":{"num":10}}
			const strObj = JSON.stringify(value);
			// keyword 추출
			const keyTrim = strObj.replace(/\"|\'/gm, '');
			const keyReg = /(?:^\{)([a-zA-Z]+)/;
			const key = keyTrim.match(keyReg);
			// 키워드 값 가공
			const obj = strObj.replace(/(^\{\"[a-zA-Z]+\"\:)|(\}$)/gm, '');
			const _data = JSON.parse(obj);

			// $_.forEach(_data, (_value, _key) => {
			// 	value[key[1]][_key] = _value;
			// });
			//
			// return value;
		},
	};
}

const reg = new _reg();
