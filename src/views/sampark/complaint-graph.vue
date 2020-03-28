<template>
        <canvas height="250" ref="canvas" style="height: 250px!important;width: 100% !important"></canvas>    
</template>

<script>
import { Bar } from 'vue-chartjs'
import * as samparkService from "./service";
export default {
  extends: Bar,
  data: function () {
    return {
      chartResult:{},
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [ {
            gridLines: {
              display: false
            },
            ticks: {
                autoSkip: false
            },
            categoryPercentage: 0.5,
            barPercentage: 0.8
          }]
        }
      }
    }
  },
  methods: {
    displayFirstChart() {
      if (this.$data._chart) {
        this.$data._chart.destroy();
      }
      this.renderChart({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: "Total Complaint's",
            backgroundColor: 'RGB(237,150,34)',
            data: this.chartResult.total
          },
          {
            label: 'Resolved',
            backgroundColor: 'RGB(0,116,143)',
            data:  this.chartResult.resolved
          }
        ]
      },this.options);
    },
  },
  mounted () {

    var data =  window.localStorage.getItem('loginUser');
      data = JSON.parse(data);
       if(data.user.type == 'dept user'){
          samparkService.getComplaintChart(new Date().getFullYear(), data.subDepartment.department.id, data.subDepartment.id, -1).then((res) => {
                this.chartResult = res.data;
                this.displayFirstChart();
          });
       } else {
          samparkService.getComplaintChart(new Date().getFullYear(), 0, 0 , -1).then((res) => {
              this.chartResult = res.data;
              this.displayFirstChart();
        });
       }
    

    this.$root.$on('filterChartOnYear', (year, ward) => {
      samparkService.getComplaintChart(year, 0, 0, ward).then((res) => {
            this.chartResult = res.data;
            this.displayFirstChart();
      });
    });    

    this.$root.$on('filterChartOnYearDept', (year, dept, ward) => {
      samparkService.getComplaintChart(year, dept, 0, ward).then((res) => {
            this.chartResult = res.data;
            this.displayFirstChart();
      });
    });    

    this.$root.$on('filterChartOnYearDeptSubdept', (year, dept, subDept, ward) => {
      samparkService.getComplaintChart(year, dept, subDept, ward).then((res) => {
            this.chartResult = res.data;
            this.displayFirstChart();
      });
    });

  }
}
</script>
