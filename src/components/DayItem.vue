<template>
    <td class="day" v-bind:class="{ currentDay: isCurrentDay, selected: isDaySelected}"  v-on:click="$emit('select-day',date)"> 
       {{day | deleteZeros}}
    </td>
</template>

<script>
import calendar from '../store/calendar';

export default {
    props: ['day'],

    data(){
        return {
          
            
        }
    },

    computed: {

        date(){
           let d = new Date(calendar.currentMonthDate);
           d.setDate(this.day);
           return d;
       },

       tasks(){
        
       },

       isCurrentDay(){
           //return (calendar.today == this.date)
           return calendar.isEqualsDays(calendar.today, this.date)
       },
       calendarCurrentDay(){
           return calendar.today
       },


       isDaySelected(){
        return calendar.isEqualsDays(this.date, calendar.selectedDate) || false;
    }
        
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

<style>

.currentDay{
    font-weight: bold;
    border: 3px solid;
    color: rgb(30, 8, 75);
}



</style>