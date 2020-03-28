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
    showChart(data,data1,data3){
        if (this.$data._chart) {
            this.$data._chart.destroy();
          }
        this.renderChart({
            labels: data,
            datasets: [{
              data: data1,
              backgroundColor: data3,
              borderWidth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              hoverBackgroundColor: data3
            }]
          }, this.options)
    }
  },
  mounted () {
    var color=['RGB(237,150,34)', 'RGB(0,116,143)'];
    for(var i=2;i<15;i++){
           color[i] = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
         }
    var data =  window.localStorage.getItem('loginUser');
      data = JSON.parse(data);
      var pieChartData = {
        "state": data.stateAssembly ? data.stateAssembly.state : '',
        withMobile: false
    }
      samparkService.getPieChartByStatePartyPreference(pieChartData).then((res) => {
        var data = res.parties;
        var data1 = res.citizen;
          this.showChart(data,data1,color);
      });


      this.$root.$on('filterChartPartyPrefOnState', (state) => {
        samparkService.getPieChartByStatePartyPreference(state).then((res) => {
            var data = res.parties;
            var data1 = res.citizen;
              this.showChart(data,data1,color);
        });
      });
  }
}
