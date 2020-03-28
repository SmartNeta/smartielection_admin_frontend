<template>
      <canvas ref="canvas" height="420" style="height: 420px!important; width: 100% !important"></canvas>
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
                      },
                      scaleLabel: {
                          display: true,
                          labelString: 'Total Number Of Citizens'
                      }
              }],
              xAxes: [{
                      barPercentage: 0.8,
                      stacked: false,
                      beginAtZero: true,
                      scaleLabel: {
                          display: true,
                          labelString: 'Questions'
                      },
                      ticks: {
                          stepSize: 1,
                          min: 0,
                          autoSkip: false,
                          maxRotation : 180,
                          minRotation:0,
                          beginAtZero: true,
                          callback: function(value, index, values) {
                            return value.length < 35 ? value : value.substring(0, 35) + '...'; ;
                            //return value;
                          }
                      }
                }]
            }
          }
        }
      },

      methods: {
        dsiplaySurveyQuestionChart() {
            if (this.$data._chart) {
              this.$data._chart.destroy();
            }
            this.renderChart({
              labels: this.chartResult.totalQuestions || [],
              datasets: [
                {
                  label: "Total Number of Responded Citizens to Questions.",
                  backgroundColor: 'RGB(237,150,34)',
                  data: this.chartResult.citizenCount  || []
                }
              ]
            },this.options);
        }
      },
      mounted () {
          this.$root.$on('getQuestionAnswerChart', (id, filterBy) => {
              this.chartResult = {};
              samparkService.getQuestionSurveyChart(id, filterBy).then((res) => {
                this.chartResult = res.data;
                this.dsiplaySurveyQuestionChart();
              });
          });

          this.$root.$on('clearSurveyChart',(data) =>{
            this.chartResult = {};
            this.dsiplaySurveyQuestionChart();
          });

          this.dsiplaySurveyQuestionChart();
      },
      beforeMount() {
        var data =  window.localStorage.getItem('loginUser');
        data = JSON.parse(data);
        if(data.stateAssembly && data.stateAssembly.id) {
          this.chartResult = {};
          samparkService.getQuestionSurveyChart(data.stateAssembly.id, 'state').then((res) => {
            this.chartResult = res.data;
            this.dsiplaySurveyQuestionChart();
          });          
        }
      }
  }
</script>