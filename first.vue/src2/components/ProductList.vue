<template>
<ul>
<li v-for="(product, index) in products">{{ product.title }}</li>
</ul>
</template>
<script>
import products from '../store/products';
import BuyBtn from './BuyBtn';
export default {
    computed:{
        products(){
            return products.list;
        }
    }
}

</script>