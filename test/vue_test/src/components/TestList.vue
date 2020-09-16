<template>
	<div>
		<label :for="data._id">label {{ this.data._id }}</label>
		<input
			v-model="opt.checked"
			type="checkbox"
			name="data._id"
			:id="data._id"
			:value="data.value"
		/>
		{{ data }}
		<button @click="closeHandler">delete</button>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import _ from 'lodash';
@Component({})
export default class Test extends Vue {
	@Prop({ type: Object, default: () => [] })
	data!: object;
	@Prop({ type: Number })
	index: number;
	@Prop()
	group!: object;

	data() {
		return {
			opt: {
				checked: [],
			},
		};
	}

	@Watch('opt.checked')
	test() {
		const { opt, childEmit } = this;
		childEmit();
	}

	@Watch('group')
	groupHandler() {
		if (this.group.exec) {
			const _t = _.filter(this.group.data, v => {
				return v === this.data.value;
			});
			this.opt.checked.push(_t[0]);
		} else {
			this.opt.checked = [];
		}
	}

	@Emit('check')
	childEmit() {
		return {
			key: this.data._id,
			value: this.opt.checked[0],
			checked: this.opt.checked.length == 0 ? false : true,
		};
	}
	@Emit('close')
	closeHandler() {
		return {
			key: this.index,
		};
	}

	mounted() {}
}
</script>

<style scoped></style>
