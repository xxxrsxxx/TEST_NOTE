<template>
	<div>
		<p>TestQuantity</p>
		<ul>
			<li v-for="product in products">
				<input type="number" name="num" id="num" v-model.number="product.quantity" />
				{{ product.quantity }} {{ product.name }}
				<span v-if="product.quantity === 0">-out of stock</span>
				<button @click="product.quantity += 1">add</button>
				<button
					@click="
						() => {
							if (product.quantity > 0) product.quantity -= 1;
						}
					"
				>
					remove
				</button>
			</li>
		</ul>
		<p>Total {{ totalProducts }}</p>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import _ from 'lodash';
@Component({})
export default class Test extends Vue {
	products: object[] = [];

	data() {
		return {
			products: [],
		};
	}

	created() {
		this.products = [
			{ id: 0, quantity: 1, name: 'product0' },
			{ id: 1, quantity: 2, name: 'product1' },
			{ id: 2, quantity: 5, name: 'product2' },
			{ id: 3, quantity: 2, name: 'product3' },
		];
	}
	get totalProducts() {
		return this.products.reduce((sum, product) => {
			return sum + product.quantity;
		}, 0);
	}

	mounted() {}
}
</script>

<style scoped></style>
