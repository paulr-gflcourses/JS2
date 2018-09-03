<template>
    <div class="calendar">
        <hr/>
        <div class="cal-head">
          <button class="prev-month" @click="prevMonth"> prev </button>
          <span class="show-date">{{ showedDate | formatDate}}</span>
           <button class="next-month" @click="nextMonth"> next </button>
          <div>
          Year
          <input type="number"/>

          Month
          <select name="" id=""></select>
          </div>

         
        </div>

        

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
      <transition name="fade">
      <ol v-if="tasks">
        <h2>Tasks:</h2>
        <li v-for="(task,index) in tasks" :key="index">{{task}}</li>
      </ol>
      </transition>

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
    }
  },

  filters: {
    formatDate(date) {
      let options = { day: "2-digit", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
    }
  },

  methods: {
    selectDay(date, tasks) {
      calendar.selectedDate = date;
      calendar.currentMonthDate = date;

      this.tasks = tasks;
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
.calendar {
  /*background: rgb(17, 2, 53);*/
  width: 350px;
  margin-left: auto;
  margin-right: auto;
  /* color: #fff;*/
}

.prev-month {
  float: left;
}

.next-month {
  float: right;
}

.show-date {
  border: 1px solid rgb(157, 157, 224);
  text-align: center;
  margin-left: 26%;
}

td {
  border: 1px solid rgb(157, 157, 224);
  text-align: center;
}

.day {
  /*background: rgb(39, 0, 131);*/
  background: rgb(189, 179, 207);
  padding: 15px;
  text-align: center;
}
.day:hover {
  background: rgb(153, 153, 207);
}

.selected.day:hover,
.selected {
  background: rgb(103, 82, 128);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>