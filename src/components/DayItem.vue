<template>
    <td class="day"  v-on:click="$emit('show-tasks')"> 
       {{day | deleteZeros}}
    </td>
</template>

<script>


export default {
    props: ['day'],
    computed: {
        
    },
    methods: {
       

    },
    filters:{
        deleteZeros: function(day){
            if (day===0){
                return "";
            }else{
                return day;
            }
        }
    }
}
</script>

