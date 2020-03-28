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
            labels: ['With Mobile', 'Without Mobile'],
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
          samparkService.getPieChartByState(pieChartData).then((res) => {
         var withMobile= res.withMobile;
         var withoutMobile = res.withoutMobile;
          this.showChart(withMobile,withoutMobile);
      });


    this.$root.$on('chaertMobileOrWithoutMobile', (PieChartData) => {
        samparkService.getPieChartByState(PieChartData).then((res) => {
            var withMobile= res.withMobile;
            var withoutMobile = res.withoutMobile;
             this.showChart(withMobile,withoutMobile);
        });
      });
  }
}
