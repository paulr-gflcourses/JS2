<template>
    <div>
       <div class="calendar">
        <div class="cal-head">
          <button class="prev-month" @click="prevMonth"> &larr; </button>
          <span class="show-date">{{ showedDate | formatDate}}</span>
           <button class="next-month" @click="nextMonth"> &rarr; </button>


          <p>
           <label for="month">Month</label>
            <select name="" id="month" v-model="month">
            <option value="0">January</option>
             <option  value="1">February</option>
              <option  value="2">March</option>
               <option  value="3">April</option>
                <option value="4">May</option>
                 <option value="5">June</option>
                 <option value="6">July</option>
                 <option value="7">August</option>
                 <option value="8">September</option>
                 <option value="9">October</option>
                 <option value="10">November</option>
                 <option value="11">December</option>

            </select>
            <label for="year">Year</label>
            <input type="number" v-model="year"/>
          </p>
          
        </div>

        

    <table  border="1px"> 
        <tr>
            <td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td><td>Sun</td>
        </tr>

        <tr
         v-for="(week, indexWeek) in daysArray" 
        :key="indexWeek">

        <day-item
            v-for="(date,index) in week" 
            :date="date"
        :key="index"
        v-on:select-day="selectDay">
        </day-item>
        </tr>
    </table>

    </div>

    <div class="task-panel" v-if="dayChecked">

        <div>
          
          <h3>Add task</h3>
          Task name
          <input type="text" ref="taskName" name="" />
          <button @click="saveTask">Save</button>
        </div>
      
      
      <p v-if="!tasks">No tasks for selected day ({{dayChecked | formatDateFull}}).</p>
      <div v-else>
        <h2>Tasks</h2>
        <p>Date - {{dayChecked | formatDateFull}}</p>
        <ol>
          <li v-for="(task,index) in tasks" :key="index">{{task}}
           
          </li>
        </ol>
      </div>
    

    </div>

    

    </div>
</template>


<script>
import calendar from "../calendar/calendar";

import DayItem from "./DayItem";

export default {
  data: function() {
    return {
      tasks: "",
      day: calendar.today.getDate(),
      month: calendar.today.getMonth(),
      year: calendar.today.getFullYear()
    };
  },
  watch: {
    day: function(val) {
      calendar.currentMonthDate.setDate(val);
      this.day = calendar.currentMonthDate.getDate();
    },
    month: function(val) {
      calendar.currentMonthDate.setMonth(val);
      this.month = calendar.currentMonthDate.getMonth();
      this.year = calendar.currentMonthDate.getFullYear();
    },
    year: function(val) {
      calendar.currentMonthDate.setFullYear(val);
      this.year = calendar.currentMonthDate.getFullYear();
    }
  },

  components: {
    DayItem
  },

  computed: {
    showedDate() {
      return calendar.currentMonthDate;
    },
    dayChecked(){
      return calendar.selectedDate;
    },

    daysArray() {
      return calendar.currentMonthDays(this.year, this.month);
    },

    
  },

  filters: {
    formatDate(date) {
      let options = { day: "2-digit", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
    },
    formatDateFull(date) {
      let options = { day: "numeric", month: "long", year: "numeric" };
      return date.toLocaleDateString("en-GB", options);
    }
  },

  methods: {
    selectDay(date, tasks) {
      calendar.selectedDate = date;
      this.day = date.getDate();
      this.month = date.getMonth();
      this.year = date.getFullYear();
      this.tasks =  calendar.getDayTasks(calendar.selectedDate);
    },
    nextMonth() {
      this.month = this.month + 1;
    },
    prevMonth() {
      this.month = this.month - 1;
    },

    saveTask(){
      let taskName = this.$refs.taskName.value;
      let taskList = calendar.getDayTasks(calendar.selectedDate);
      if (taskList){
        taskList.push(taskName);
      }else{
        calendar.tasks.push({
       date: new Date(calendar.selectedDate), 
       task:[taskName]
       });
       this.tasks =  calendar.getDayTasks(calendar.selectedDate);
      
      }
     
      this.$refs.taskName.value="";
      
    },


  }
};
</script>

<style>
.calendar {

  width: 355px;
  margin-left: 40px;
  margin-top: 40px;
  border: 1px solid rgb(40, 40, 70);
  padding: 15px;
  float: left;
}

.task-panel{
  margin-left: 50px;
  margin-top: 50px;
  float: left;
}

.prev-month {
  float: left;
}

.next-month {
  float: right;
}

.show-date {
  border: 1px solid rgb(40, 40, 70);
 background: rgb(228, 226, 231);
  text-align: center;
  margin-left: 26%;
  padding: 5px;
}

td {
  border: 1px solid rgb(157, 157, 224);
  text-align: center;
}

.day {
  background: rgb(189, 179, 207);
  padding: 15px;
  text-align: center;
}

.restDay{
  background: rgb(214, 182, 200);
}

.hasTask {
  background: rgb(206, 189, 172);
}

.notAvaiable {
  background: rgb(228, 226, 231);
  color: rgb(148, 144, 156);
}

.currentDay {
  font-weight: bold;
  border: 4px solid rgb(57, 6, 124);
  color: rgb(30, 8, 75);
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
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>