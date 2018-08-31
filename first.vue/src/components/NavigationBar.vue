<template>
    <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/cart">Cart ({{ cartItemsCount }})</router-link></li>
    </ul>
</template>
<script>
import cart from '../store/cart';
import {mapGetters} from 'vuex';
export default {
    name: 'NavigationBar',
    computed: {
        /* cartItemsCount() {
            return cart.totalItems;
        } */
        ...mapGetters({cartItemsCount: 'totalItems'})
        //...mapGetters(['totalItems'])
    }
}
</script>
<style scoped>
    ul {
        display: flex;
    }

    ul li {
        flex: 1;
    }
</style>

