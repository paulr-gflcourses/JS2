<template>
    <div>
        <button @click="nextMonth">next month</button>
    <table  border="1px"> 

        

        <tr>
            <td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td><td>Sun</td>
        </tr>

        <tr
         v-for="(week, indexWeek) in month" 
        :key="indexWeek">

            <day-item
            v-for="(day, indexDay) in week" 
            :day="day"
        :key="indexDay"
        v-on:show-tasks="showTasks"
        >
        </day-item>

        </tr>
    </table>

    <div>
        {{ tasks }}
    </div>

    </div>
</template>
<script>
import calendar from '../store/calendar';

import DayItem from './DayItem';

export default {
    data: function () {
  return {
    tasks: '',
    month: calendar.currentMonth
  }
},
    components: {
        DayItem
    },
    computed: {
        /*month() {
            return calendar.currentMonth;
        },*/
        ar() {
            return calendar.compAr;
        },

    },
    methods: {
         showTasks(){
             this.tasks="Tasks: task1, task2";
    
        },
        nextMonth(){
             calendar.nextMonth()
             this.month = calendar.currentMonth
  
        }
    }
}
</script>

<style>
td{
    border: 1px solid;
}
td:hover{
    background: rgb(75, 75, 231)
}
</style>