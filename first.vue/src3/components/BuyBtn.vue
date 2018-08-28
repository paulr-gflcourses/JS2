<template>
    <button @click="buy">Buy</button>
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
            cart.add(this.id)

        }
    }
}
</script>

