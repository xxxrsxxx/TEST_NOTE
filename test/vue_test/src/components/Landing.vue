<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<button @click="childEmit">Child Button</button>
		<slot name="type1"></slot>
		<slot name="type2" :string="string"></slot>
		<slot name="type3" :string="string" :fnc="childSlotFnc"></slot>
		<slot :string="string"> </slot>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Mixins } from 'vue-property-decorator';
import Mixin from '@/mixin/Mixin';
@Component
export default class HelloWorld extends Mixins(Mixin) {
	@Prop() private msg!: string;
	@Prop({ default: 'default message' }) private readonly msg1!: string;
	private string: object = {};
	data() {
		return {
			string: {
				first: 'first',
				last: 'last',
			},
			testObj: {
				value: false,
			},
		};
	}
	@Emit('$emit')
	childEmit() {
		//console.log('_child Emit');
	}

	childSlotFnc() {
		//console.log('childSlotFnc');
	}

	get reFormat() {
		return this.testObj;
	}

	mounted() {
		//console.log('child', this);
		const t = this.reFormat;
		t.value = true;
		console.log('testObj', t, this.testObj);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
