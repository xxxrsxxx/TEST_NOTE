<template>
	<div>
		<label for="data._id">label {{ this.data._id }}</label>
		<input
			v-model="opt.checked"
			type="checkbox"
			name="data._id"
			id="data._id"
			:value="data.value"
		/>
		{{ data }}
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import _ from 'lodash';
@Component({})
export default class Test extends Vue {
	@Prop({ type: Object, default: () => [] })
	data!: object;

	@Prop() all!: object;

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

	@Watch('all')
	groupHandler() {
		if (this.all.exec) {
			const _t = _.filter(this.all.data, v => {
				return v === this.data.value;
			});
			this.opt.checked.push(_t[0]);
		} else {
			this.opt.checked = [];
		}
	}

	@Emit('$emit')
	childEmit() {
		return this.opt.checked;
	}

	mounted() {}
}
</script>

<style scoped></style>
