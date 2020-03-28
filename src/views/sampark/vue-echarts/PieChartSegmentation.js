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
    showChart(result,segmentations){
        if (this.$data._chart) {
            this.$data._chart.destroy();
          }
        this.renderChart({
            labels: segmentations,
            datasets: [{
              data: result,
              backgroundColor: [
                'RGB(237,150,34)',
                'RGB(0,116,143)',
                'RGB(21,11,43)',
                'RGB(45,116,243)'
              ],
              borderWidth: [0, 0, 0, 0],
              hoverBackgroundColor: [
                'RGB(237,150,34)',
                'RGB(0,116,143)',
                'RGB(21,11,43)',
                'RGB(45,116,243)'
              ]
            }]
          }, this.options)
    }
  },
  mounted () {
    var data =  window.localStorage.getItem('loginUser');
    data = JSON.parse(data);

    var pieChartData = {
      "stateId" : data.stateAssembly ? data.stateAssembly.id : null,
      withMobile: false
    }

    samparkService.getPieChartByStateSegmentation(pieChartData).then((res) => {
      var labels = [];
      var result = [];
      for (var i = 0 ; i < res.segmentations.length ; i++) {
        labels.push(res.segmentations[i].label);
        if(res.segmentations[i].segmentation  == "A+"){
          result.push(res.AP);
        }else if (res.segmentations[i].segmentation  == "A"){
          result.push(res.A);
        }else if (res.segmentations[i].segmentation  == "B"){
          result.push(res.A);
        }else if (res.segmentations[i].segmentation  == "C"){
          result.push(res.C);
        }
      }
      this.showChart(result,labels);
    });

    this.$root.$on('filterChartOnSegmentation', (state) => {
      samparkService.getPieChartByStateSegmentation(state).then((res) => {
        var labels = [];
        var result = [];
        for (var i = 0 ; i < res.segmentations.length ; i++) {
          labels.push(res.segmentations[i].label);
          if(res.segmentations[i].segmentation  == "A+"){
            result.push(res.AP);
          }else if (res.segmentations[i].segmentation  == "A"){
            result.push(res.A);
          }else if (res.segmentations[i].segmentation  == "B"){
            result.push(res.A);
          }else if (res.segmentations[i].segmentation  == "C"){
            result.push(res.C);
          }
        }
        this.showChart(result, labels);
      });
    });
  }
}
