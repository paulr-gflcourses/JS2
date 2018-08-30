import Vue from 'vue';

export default new Vue({

    data() {
        return {
            date: new Date()
        }
    },


    computed: {
        currentMonth: function(){
          let d = this.date;
          let year = d.getFullYear();
          let month = d.getMonth();
          let day = d.getDate();
          let dayOfWeek = this.getLocalDay(d);
          let nDays = new Date(year, month, 0).getDate();
          let firstDayOfWeek = this.getLocalDay(new Date(year, month, 1));
          let lastDayOfWeek = this.getLocalDay(new Date(year, month, nDays));
          let days = [];
          let weeks = []
          for(let i=0; i<firstDayOfWeek; i++){
              days.push(0);
          }
                for(let i=0; i<nDays; i++){
              days.push(i+1);
          }
          for(let i=lastDayOfWeek; i<6; i++){
              days.push(0);
          }
          let nWeeks = Math.ceil(days.length/7);
          for(let i=0; i<nWeeks; i++){
                  weeks.push(days.slice(i*7,i*7+7));
          }
          return weeks;
        },

        compAr(){
            return  [[1,2,3],[4,5,6,7],[8,9,10]];
        }
      },
      methods:{
          getLocalDay: function(date) {
          var day = date.getDay();
    
          if (day == 0) { // день 0 становится 7
            day = 7;
          }
          return day-1;
            },

        nextMonth(){
            this.date.setMonth(this.date.getMonth+1);
        }

        
      }
    });