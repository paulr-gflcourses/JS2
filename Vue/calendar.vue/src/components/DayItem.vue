<template>
    <transition name="fade">
    <td class="day" 
    v-bind:class="{ currentDay: isCurrentDay, 
    selected: isDaySelected, hasTask: isTaskExists, notAvaiable: isNotAvaiable}"  
    v-on:click="$emit('select-day', date, tasks)"> 
      <!-- {{day | deleteZeros}} -->
      {{ date | formatDate }} 

     <!-- {{day}} -->
    </td>
    </transition>
</template>

<script>
import calendar from "../store/calendar";

export default {
  props: ["date"],

  data() {
    return {};
  },

  computed: {
    /*date() {
      let d = new Date(calendar.currentMonthDate);
      d.setDate(this.day);
      return d;
    },*/

    tasks() {
      return calendar.getDayTasks(this.date);
    },

    isCurrentDay() {
      //return (calendar.today == this.date)
      return calendar.isEqualsDays(calendar.today, this.date);
    },
    calendarCurrentDay() {
      return calendar.today;
    },

    isDaySelected() {
      return calendar.isEqualsDays(this.date, calendar.selectedDate);
    },

    isTaskExists() {
      if (this.tasks) {
        return true;
      }
      return false;
    },

    isNotAvaiable() {
        return (! calendar.isEqualsMonth(this.date,calendar.currentMonthDate))
      //return this.day == "0";
    }
  },
  methods: {},
  filters: {
    formatDate(date){
      return date.getDate()
        //return date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();
    }
  }
};
</script>

<style>
.currentDay {
  font-weight: bold;
  border: 4px solid rgb(57, 6, 124);
  color: rgb(30, 8, 75);
}

.hasTask {
  background: rgb(206, 189, 172);
}

.notAvaiable {
  background: rgb(228, 226, 231);
  color: rgb(148, 144, 156);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>