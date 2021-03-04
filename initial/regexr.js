class _reg {
	constructor() {
		this.op();
	}
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
			'hello@daum.net\n' +
			'hello@daum.co.kr\n' +
			'\n' +
			'https://www.youtu.be/-ZClicWm0zM\n' +
			'https://youtu.be/-ZClicWm0zM\n' +
			'youtu.be/-ZClicWm0zM';

		let url = 'http://xxx.domain.com?test';

		const regYtId = /(?:https?:\/\/)?(?:www\.)?youtu.be\/([a-zA-Z0-9-]{11})/gm;
		const regParams = /(?:com\?)[a-z]+/gm;
		const confirm = _string.match(regYtId);
		const confirm2 = url.match(regParams);

		console.log('========', confirm);
		console.log('========', confirm2);
	};
}

const reg = new _reg();
