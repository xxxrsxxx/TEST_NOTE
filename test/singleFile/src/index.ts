//https://heropy.blog/2020/01/27/typescript/

function add(a: number, b: number) {
	return a + b;
}
const sum: number = add(1, 2);
console.log(sum);

// 문자열만 가지는 배열
let fruits: string[] = ['Apple', 'Banana', 'Mango'];
// Or
let fruits2: Array<string> = ['Apple', 'Banana', 'Mango'];

// 숫자만 가지는 배열
let oneToSeven: number[] = [1, 2, 3, 4, 5, 6, 7];
// Or
let oneToSeven2: Array<number> = [1, 2, 3, 4, 5, 6, 7];

//유니언 타입(다중 타입)의 ‘문자열과 숫자를 동시에 가지는 배열
let array: (string | number)[] = ['Apple', 1, 2, 'Banana', 'Mango', 3];
// Or
let array2: Array<string | number> = ['Apple', 1, 2, 'Banana', 'Mango', 3];

//배열이 가지는 항목의 값을 단언할 수 없다면 any
let someArr: any[] = [0, 1, {}, [], 'str', false];

// 읽기전용 타입
let arrA: readonly number[] = [1, 2, 3, 4];
let arrB: ReadonlyArray<number> = [0, 9, 8, 7];

// Tuple
let user: [number, string, boolean] = [1234, 'HEROPY', true];
let users: [number, string, boolean][];
// Or
// let users: Array<[number, string, boolean]>;

users = [
	[1, 'Neo', true],
	[2, 'Evan', false],
	[3, 'Lewis', true],
];
//인터페이스(Interface)나 커스텀 타입(Type)을 사용
interface IUser {
	name: string;
	age: number;
	isValid: boolean;
}
let userArr: IUser[] = [
	{
		name: 'Neo',
		age: 85,
		isValid: true,
	},
	{
		name: 'Lewis',
		age: 52,
		isValid: false,
	},
	{
		name: 'Evan',
		age: 36,
		isValid: true,
	},
];

// 속성에 ?를 사용하면 선택적 속성으로 정의
// 필수가 아닌 속성으로 정의
interface IUser {
	name: string;
	age: number;
	isAdult?: boolean; // Optional property
}

// `isAdult`를 초기화하지 않아도 에러가 발생하지 않습니다.
let user: IUser = {
	name: 'Neo',
	age: 123,
};

//2개 이상의 타입을 허용하는 경우, 이를 유니언
let union: string | number;
union = 'Hello type!';
union = 123;

//& (ampersand)를 사용해 2개 이상의 타입을 조합하는 경우, 이를 인터섹션(Intersection)
interface IUser {
	name: string;
	age: number;
}
interface IValidation {
	isValid: boolean;
}
const heropy: IUser = {
	name: 'Heropy',
	age: 36,
	isValid: true,
};
const neo: IUser & IValidation = {
	name: 'Neo',
	age: 85,
	isValid: true,
};
// function
// myFunc는 2개의 숫자 타입 인수를 가지고, 숫자 타입을 반환하는 함수.
let myFunc: (arg1: number, arg2: number) => number;
myFunc = function (x, y) {
	return x + y;
};

// 인수가 없고, 반환도 없는 경우.
let yourFunc: () => void;
yourFunc = function () {
	console.log('Hello world~');
};

// 타입 가드
// val의 타입을 매번 보장하기 위해 타입 단언을 여러 번 사용하게 되는 경우
// 이 경우 타입 가드를 제공하면 타입스크립트가 추론 가능한 특정 범위(scope)에서 타입을 보장
function isNumber(val: string | number): val is number {
	return typeof val === 'number';
}

function someFunc(val: string | number) {
	if (isNumber(val)) {
		val.toFixed(2);
		isNaN(val);
	} else {
		val.split('');
		val.toUpperCase();
		val.length;
	}
}
