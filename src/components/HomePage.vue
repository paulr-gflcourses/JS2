<template>
    <div>
        <h1>Hello Vue!!</h1>
        <product-list></product-list>
        <calendar-item></calendar-item>
    </div>
</template>
<script>
import ProductList from './ProductList';
import CalendarItem from './CalendarItem';
export default {
    components: {
        ProductList,
        CalendarItem
    }
}
</script>
<style>

</style>
