<template>
    <div>
        <hr/>
        <p>Month:</p>
        <p>{{ showedDate | formatDate}}</p>
        <p>
        <button @click="prevMonth">prev month</button>
        <button @click="nextMonth">next month</button>
        </p>
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
       
        v-on:select-day="selectDay"
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
import calendar from "../store/calendar";

import DayItem from "./DayItem";

export default {
  data: function() {
    return {
      tasks: "",
      month: calendar.currentMonthDays
    };
  },
  components: {
    DayItem
  },

  computed: {
    showedDate() {
      return calendar.currentMonthDate;
    },


  },

  filters: {
    formatDate(date) {
      let options = { day: "2-digit", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
    }
  },

  methods: {
    selectDay(date) {
      calendar.selectedDate = date;
      calendar.currentMonthDate = date;
      this.tasks = "Tasks: task1, task2 "+date;

    },
    nextMonth() {
      calendar.currentMonthDate = new Date(calendar.currentMonthDate);
      calendar.currentMonthDate.setMonth(
        calendar.currentMonthDate.getMonth() + 1
      );
      this.month = calendar.currentMonthDays;
    },
    prevMonth() {
      calendar.currentMonthDate = new Date(calendar.currentMonthDate);
      calendar.currentMonthDate.setMonth(
        calendar.currentMonthDate.getMonth() - 1
      );
      this.month = calendar.currentMonthDays;
    }
  }
};
</script>

<style>
td {
  border: 1px solid;
}
.day:hover {
  background: rgb(157, 157, 224);
}

.selected.day:hover,
.selected{
    background: red;
}



</style>