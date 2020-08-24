import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Mixin extends Vue {
	mixFnc() {
		//console.log('mixFnc');
	}
	mounted() {
		//console.log('Mixin');
	}
}
