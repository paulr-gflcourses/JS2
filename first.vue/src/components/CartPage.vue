<template>
    <div>
        <h1>{{ 'Cart Page' | test }}</h1>
        <cart-item 
            v-for="(item, index) in list" 
            :key="index" 
            :id="index"
            @test="test2" 
            v-model="item.count"
            @remove="remove" ></cart-item>
        <div>Total: {{ cartTotal }} $</div>
    </div>
</template>
<script>
import cart from '../store/cart';
import products from '../store/products';
import CartItem from './CartItem';
export default {
    components: {
        CartItem
    },
    computed: {
        list() {
            return this.$store.getters.cart;
        },
        cartTotal() {
            // return cart.total;
            return this.$store.getters.total
        }
    },
    methods: {
        remove(id) {
            if (confirm('Are You serious ?')) {
                cart.remove(id)
            }
        },
        test2(data) {
            alert(data);
        }
    }
}
</script>
