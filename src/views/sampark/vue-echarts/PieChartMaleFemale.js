// Pie chart
import { Pie } from 'vue-chartjs'
import * as samparkService from "../service";

export default {
  extends: Pie,
  data () {
    return {
      options: {
        legend: {
          display: true
        }
      }
    }
  },
  methods: {
    showChart(data,data1){
        if (this.$data._chart) {
            this.$data._chart.destroy();
          }
        this.renderChart({
            labels: ['Male', 'Female'],
            datasets: [{
              data: [data,data1],
              backgroundColor: [
                'RGB(237,150,34)',
                'RGB(0,116,143)'
              ],
              borderWidth: [0, 0],
              hoverBackgroundColor: [
                'RGB(237,150,34)',
                'RGB(0,116,143)'
              ]
            }]
          }, this.options)
    }
  },
  mounted () {
    var data =  window.localStorage.getItem('loginUser');
      data = JSON.parse(data);
      var pieChartData = {
        "state": data.stateAssembly ? data.stateAssembly.state : '',
        withMobile: false
    }
      samparkService.getPieChartByStateMaleFemale(pieChartData).then((res) => {
        var male= res.male;
        var female = res.female;
          this.showChart(male,female);
      });


      this.$root.$on('filterChartOnStateMaleFemale', (state) => {
        samparkService.getPieChartByStateMaleFemale(state).then((res) => {
              var male= res.male;
              var female = res.female;
              this.showChart(male,female);
        });
      }); 
  
      this.$root.$on('filterChartOnWardMaleFemale', (ward) => {
        samparkService.getPieChartByStateMaleFemale(ward).then((res) => {
              var male= res.male;
              var female = res.female;
              this.showChart(male,female);
        });
      });     
  
       this.$root.$on('getTotalCitizenMaleFemaleByBooth', (booth) => {
        samparkService.getTotalCitizenMaleFemaleByBooth(booth).then((res) => {
              var male= res.male;
              var female = res.female;
              this.showChart(male,female);
        });
      });
  }
}
