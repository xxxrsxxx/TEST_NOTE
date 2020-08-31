<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<button @click="childEmit">Child Button</button>
		<slot name="type1"></slot>
		<slot name="type2"></slot>
		<slot name="type3" :content="string" :fnc="childSlotFnc"></slot>
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
		};
	}
	@Emit('$emit')
	childEmit() {
		//console.log('_child Emit');
	}

	childSlotFnc() {
		//console.log('childSlotFnc');
	}
	mounted() {
		//console.log('child', this);
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
