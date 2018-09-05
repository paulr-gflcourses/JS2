import Vue from 'vue';

export default new Vue({

  data() {
    return {
      currentMonthDate: new Date(),
      today: new Date(),
      selectedDate: '',
      tasks: [],

      defaultTasks: [
        {
          date: new Date(2018, 0, 2),
          task: ['one task for 8', 'two task for 8', 'three task for 8']
        },
        {
          date: new Date(2018, 1, 3),
          task: ['one task for 8', 'two task for 8', 'three task for 8']
        },
        {
          date: new Date(2018, 2, 4),
          task: ['one task for 8', 'two task for 8', 'three task for 8']
        },
        {
          date: new Date(2018, 3, 5),
          task: ['one task for 8', 'two task for 8', 'three task for 8']
        },

        {
          date: new Date(2018, 8, 2),
          task: ['2 - to do one task', '2 - to do two task']
        },
        {
          date: new Date(2018, 8, 4),
          task: ['one task...']
        },
        {
          date: new Date(2018, 8, 8),
          task: ['one task for 8', 'two task for 8', 'three task for 8']
        },
        
    ]

    }
  },


  created(){
    let localTasks = JSON.parse(localStorage.getItem('tasks') || JSON.stringify(this.defaultTasks));
    localTasks.forEach(element => {
      element.date = new Date(element.date)
    });
    this.tasks = localTasks || this.defaultTasks;
  },

  watch: {
    tasks: {
      handler: function (tasks) {
        localStorage.setItem('tasks', JSON.stringify(this.tasks || []));
      },
      deep: true
  }
},

  methods: {

    currentMonthDays(yearDate, monthDate) {
      let d = new Date(yearDate, monthDate, 1);

      let year = d.getFullYear();
      let month = d.getMonth();

      let nDays = new Date(year, month +1, 0).getDate();
      let firstDayOfWeek = this.getLocalDay(new Date(year, month, 1));
      let lastDayOfWeek = this.getLocalDay(new Date(year, month, nDays));
      let days = [];
      let weeks = []


      for (let i = 1-firstDayOfWeek; i < nDays+(6-lastDayOfWeek) +1; i++) {
        days.push(new Date(yearDate, monthDate, i));
      }

      let nWeeks = Math.ceil(days.length / 7);
      for (let i = 0; i < nWeeks; i++) {
        weeks.push(days.slice(i * 7, i * 7 + 7));
      }
      return weeks;
    },

    getLocalDay: function (date) {
      var day = date.getDay();
      if (day == 0) { 
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
    }

  }
});
