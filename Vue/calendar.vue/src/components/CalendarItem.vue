<template>
    <div class="calendar">
        <hr/>
        <div class="cal-head">
          <button class="prev-month" @click="prevMonth"> prev </button>
          <span class="show-date">{{ showedDate | formatDate}}</span>
           <button class="next-month" @click="nextMonth"> next </button>
          <div>

            Month
            <select name="" id="" v-model="month">
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
          Year
          <input type="number" v-model="year"/>

          
          
          </div>

         
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



    <div>

      
      


        <div v-if="isDaySelected">
          <h3>Add task</h3>
          Task name
          <input type="text" ref="taskName" name="" />
          <button @click="saveTask">Save</button>
        </div>
      
      <ol v-if="tasks">
        <h2>Tasks:</h2>
        <li v-for="(task,index) in tasks" :key="index">{{task}}</li>
      </ol>

    

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
      //daysArray: calendar.currentMonthDays,
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
    /* day: {
      get: function() {
        return calendar.currentMonthDate.getDate();
      },

      set: function(newValue) {
        calendar.currentMonthDate.setDate(newValue);
      }
    },
    month: {
       get: function() {
        return calendar.currentMonthDate.getMonth();
      },

      set: function(newValue) {
        calendar.currentMonthDate.setMonth(newValue);
      }
    },
    year: {
       get: function() {
        return calendar.currentMonthDate.getFullYear();
      },

      set: function(newValue) {
        calendar.currentMonthDate.setFullYear(newValue);
      }
    },*/
 
    showedDate() {
      return calendar.currentMonthDate;
    },

    daysArray() {
      return calendar.currentMonthDays(this.year, this.month);
    },

    isDaySelected(){
      return calendar.selectedDate;
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

      //this.tasks=[taskName]
      
      }
      this.$refs.taskName.value="";
      
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