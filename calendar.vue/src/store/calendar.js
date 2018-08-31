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
          task: ['one task', 'two task']
        },
        {
          date: new Date(2018, 7, 4),
          task: ['one task']
        },
        {
          date: new Date(2018, 7, 8),
          task: ['one task', 'two task', 'three task']
        },
    ]

    }
  },


  computed: {
    currentMonthDays() {
      let d = this.currentMonthDate;
      let year = d.getFullYear();
      let month = d.getMonth();
      let day = d.getDate();
      let dayOfWeek = this.getLocalDay(d);
      let nDays = new Date(year, month, 0).getDate();
      let firstDayOfWeek = this.getLocalDay(new Date(year, month, 1));
      let lastDayOfWeek = this.getLocalDay(new Date(year, month, nDays));
      let days = [];
      let weeks = []
      for (let i = 0; i < firstDayOfWeek; i++) {
        days.push(0);
      }
      for (let i = 0; i < nDays; i++) {
        days.push(i + 1);
      }
      for (let i = lastDayOfWeek; i < 6; i++) {
        days.push(0);
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
    }

  }
});
