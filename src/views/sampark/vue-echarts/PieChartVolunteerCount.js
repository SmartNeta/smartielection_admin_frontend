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
            labels: ['Active', 'Inactive'],
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
      samparkService.getPieChartVolunteerBystate( data.stateAssembly ? data.stateAssembly.id : -1).then((res) => {
        var ActiveVolunteer= res.ActiveVolunteer;
        var InactiveVolunteer = res.InactiveVolunteer;
          this.showChart(ActiveVolunteer,InactiveVolunteer);
      });
  
      this.$root.$on('getPieChartVolunteerBystate', (state) => {
        samparkService.getPieChartVolunteerBystate(state).then((res) => {
            var ActiveVolunteer= res.ActiveVolunteer;
           var InactiveVolunteer = res.InactiveVolunteer;
            this.showChart(ActiveVolunteer,InactiveVolunteer);
        });
      });
  
      this.$root.$on('getPieChartVolunteerByAssembky', (assembly) => {
        samparkService.getPieChartVolunteerByAssembky(assembly).then((res) => {
              var ActiveVolunteer= res.ActiveVolunteer;
           var InactiveVolunteer = res.InactiveVolunteer;
            this.showChart(ActiveVolunteer,InactiveVolunteer);
        });
      });  
  }
}
