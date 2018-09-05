<template>

    <td class="day" 
    v-bind:class="{ 
      restDay: isRestDay,
      currentDay: isCurrentDay, 
     hasTask: isTaskExists, 
     notAvaiable: isNotAvaiable, 
     selected: isDaySelected}"  
    v-on:click="$emit('select-day', date, tasks)"> 

      {{ date | formatDate }} 

    </td>

</template>

<script>
import calendar from "../calendar/calendar";

export default {
  props: ["date"],

  data() {
    return {};
  },

  computed: {
    tasks() {
      return calendar.getDayTasks(this.date);
    },

    isRestDay() {
      let dayOfWeek = calendar.getLocalDay(this.date);
      if (dayOfWeek === 5 || dayOfWeek === 6) {
        return true;
      }
      return false;
    },

    isCurrentDay() {
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
      return !calendar.isEqualsMonth(this.date, calendar.currentMonthDate);
    }
  },
  methods: {},
  filters: {
    formatDate(date) {
      return date.getDate();
    }
  }
};
</script>

<style>
</style>