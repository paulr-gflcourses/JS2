<template>
    <button @click="buy"><slot>Buy</slot></button>
</template>
<script>
import cart from '../store/cart';
export default {
    props: {
        id: {
            type: Number,
            default: 0
        }
    },
    methods: {
        buy() {
            cart.add(this.id);
        }
    }
}
</script>

