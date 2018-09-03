import Vue from 'vue';

export default new Vue({

  data() {
    return {
      currentMonthDate: new Date(),
      today: new Date(),
      selectedDate: '',


      tasks: [
        {
          date: new Date(2018, 7, 2),
          task: ['2 - to do one task', '2 - to do two task']
        },
        {
          date: new Date(2018, 7, 4),
          task: ['one task...']
        },
        {
          date: new Date(2018, 7, 8),
          task: ['one task for 8', 'two task for 8', 'three task for 8']
        },
    ]

    }
  },


  computed: {
    currentMonthDays() {
      let d = this.currentMonthDate;
      let year = d.getFullYear();
      let month = d.getMonth();

      let nDays = new Date(year, month +1, 0).getDate();
      let firstDayOfWeek = this.getLocalDay(new Date(year, month, 1));
      let lastDayOfWeek = this.getLocalDay(new Date(year, month, nDays));
      let days = [];
      let weeks = []


      for (let i = 1-firstDayOfWeek; i < nDays+(6-lastDayOfWeek) +1; i++) {
        days.push(i);
      }
 

      let nWeeks = Math.ceil(days.length / 7);
      for (let i = 0; i < nWeeks; i++) {
        weeks.push(days.slice(i * 7, i * 7 + 7));
      }
      return weeks;
    },

    
  },
  methods: {
    getLocalDay: function (date) {
      var day = date.getDay();

      if (day == 0) { // день 0 становится 7
        day = 7;
      }
      return day - 1;
    },

    isEqualsDays(date1, date2){
        if (date1 && date2){
        return ((date1.getDate() === date2.getDate()) 
           &&(date1.getMonth() === date2.getMonth())
           &&(date1.getFullYear() === date2.getFullYear()))
        }else{
            return false
        }
    },
    isEqualsMonth(date1, date2){
      if (date1 && date2){
        return ((date1.getMonth() === date2.getMonth())
           &&(date1.getFullYear() === date2.getFullYear()))
        }else{
            return false
        }
    },

    getDayTasks(date){
      let tasks = this.tasks.filter((day) => this.isEqualsDays(day.date, date));
      if (tasks.length>0){
        return tasks[0].task;
      }
      return false;

     /* return ['task for'+date, 'task2 for'+date];*/
    }

  }
});
