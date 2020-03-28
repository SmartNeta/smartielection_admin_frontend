// Bubble Chart
import { Bubble } from 'vue-chartjs'
import * as samparkService from "../service";

export default {
  extends: Bubble,
  data: function () {
    return {
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: false
            }
          }],
          xAxes: [ {
            gridLines: {
              display: false
            },
            categoryPercentage: 0.5,
            barPercentage: 0.8
          },
        ]
        }
      }
    }
  },
  methods: {
    showScatterdGraph(data,data3){
      if (this.$data._chart) {
        this.$data._chart.destroy();
      }
      this.renderChart({
        datasets: [
          {
            label: 'Age 18-35',
            backgroundColor: 'RGB(237,150,34)',
            data: [data[0],data[1],data[2],data[3]]
          },
          {
            label: 'Age 36-55',
            backgroundColor: 'RGB(27,150,3)',
            data: [data[4],data[5],data[6],data[7]]
          },
          {
            label: 'Age 56-100',
            backgroundColor: 'RGB(237,10,34)',
            data: data3
          }
        ]
     }, this.options)
    }
  },
  mounted () {
    var user =  window.localStorage.getItem('loginUser');
    user = JSON.parse(user);

    var pieChartData = {
      state: user.stateAssembly ? user.stateAssembly.state : '',
      withMobile: false
  }
    samparkService.getScatterChartByState(pieChartData).then((res) => {
     var data = res;
     var data3=[];
      var i = 0;
      while(data[i+8]!=null){
        data3[i] = data[i+8];
        i+=1;
      }
      this.showScatterdGraph(data,data3);
  });

  this.$root.$on('ScatterdOnState', (state) => {
    samparkService.getScatterChartByState(state).then((res) => {
      var data = res;
      var data3=[];
      var i = 0;
      while(data[i+8]!=null){
        data3[i] = data[i+8];
        i+=1;
      }
      this.showScatterdGraph(data,data3);
    });
  });
  }
}
