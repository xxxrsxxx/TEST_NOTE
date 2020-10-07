<template>
	<div style="margin: 15px 0;">
		<p>TestValidate</p>
		<div style="display: flex;">
			<div v-for="item in values" :key="item.key" style="flex: 1 1 0%;">
				<label :for="item.key"></label>
				<input
					type="checkbox"
					:name="item.key"
					:id="item.key"
					:class="{ isActive: item.isActive }"
					@click="actHandler(item)"
				/>
			</div>
		</div>
		<div style="margin: 15px 0;">
			<button @click="calculate">calculate</button>
		</div>
		<div>
			<ValidationProvider rules="positive|odd" v-slot="{ errors }">
				<input v-model="num.num1" type="number" />
				<span>{{ errors[0] }}</span>
			</ValidationProvider>
		</div>
		<div>
			<ValidationProvider rules="minmax:3,8" v-slot="{ errors }">
				<input v-model="num.num2" type="text" />
				<span>{{ errors[0] }}</span>
			</ValidationProvider>
		</div>
		<div>
			<ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
				<input v-model="text.email" type="text" placeholder="email" />
				<span>{{ errors[0] }}</span>
			</ValidationProvider>
		</div>
		<div>
			<ValidationProvider
				name="field"
				rules="required|min:3|email|max:100"
				:bails="false"
				v-slot="{
					classes,
					errors,
				}"
			>
				<div class="control" :class="classes">
					<input type="text" v-model="text._text" />
					<span>{{ errors[0] }}</span>
				</div>
			</ValidationProvider>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { ValidationProvider, extend, localize } from 'vee-validate';
//import { required, email } from 'vee-validate/dist/rules';
import * as rules from 'vee-validate/dist/rules';
import _ from 'lodash';

Object.keys(rules).forEach(rule => {
	extend(rule, rules[rule]);
});

localize({
	en: {
		messages: {
			required: 'required',
			min: 'this field must have no less than {length} characters',
			max: (_, { length }) => `this field must have no more than ${length} characters`,
		},
	},
});

extend('positive', value => {
	if (value >= 0) return true;
	return 'This field must be a positive number';
});

extend('odd', value => {
	if (value % 2 !== 0) return true;
	return 'This field must be an odd number';
});

extend('minmax', {
	validate(value, { min, max }) {
		let _case = value.length >= min && value.length <= max;
		if (!_case) return 'min and max error';
		return _case;
	},
	params: ['min', 'max'],
});

// extend('email', email);
//
// extend('required', {
// 	...required,
// 	message: 'This field is required',
// });

@Component({
	components: {
		ValidationProvider,
	},
})
export default class TestValidate extends Vue {
	data() {
		return {
			values: [
				{
					key: 0,
					value: 0,
					required: true,
					isActive: false,
					isChild: true,
					child: [{ key: 'child0' }],
				},
				{
					key: 1,
					value: 1,
					required: true,
					isActive: false,
					isChild: true,
					child: [{ key: 'child1' }],
				},
				{ key: 2, value: 2, required: false, isActive: false, isChild: false },
				{ key: 3, value: 3, required: false, isActive: false, isChild: false },
			],
			num: {
				num1: 0,
				num2: 0,
			},
			text: {
				email: '',
				_text: '',
			},
			setObj: {},
		};
	}
	actHandler(obj) {
		console.log('actHandler', obj);
		let checked = !obj.isActive;
		obj.isActive = checked;
		const objHandler = obj => {
			if (!this.setObj[obj.key]) this.setObj[obj.key] = obj.value;
			else delete this.setObj[obj.key];
			console.log('setObj', this.setObj);
		};
		objHandler(obj);
	}
	calculate() {
		let isActive = this.values.filter(x => x.isActive);
		let child = this.values
			.filter(x => x.isChild)
			.map(x => x.child)
			.flat();
		let items = this.values.concat(child);
		let isChild = items.some(x => x.isChild);
		let requiredCheck = items.filter(x => x.required).some(x => !x.isActive);
		console.log(
			'calculate',
			isActive,
			'child',
			child,
			'\narray\n',
			items,
			'\nrequiredCheck\n',
			requiredCheck,
		);
	}
	mounted() {
		console.log('validate Mounted');
	}
}
</script>

<style scoped></style>
