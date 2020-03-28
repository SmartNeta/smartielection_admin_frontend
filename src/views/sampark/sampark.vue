
<style type="text/css">
  .chartbg{
    padding: 15px;
    margin-bottom: 20px;
    box-shadow: 0 0 16px 1px #ccc!important;
    border-radius: 4px;
  }
  .chart-header{
    font-weight: 700;
    margin-bottom: -5px;
    margin-top: -10px;
    text-align: center;
  }
  .btn__content {
    height: auto;
  }
  .chart1{
    width: 100%; height: 330px!important; margin-bottom: 20px
  }  
  .chart2{
    width: 100%; height: 310px!important; margin-bottom: 20px;
  }
  .chart3{
    width: 100%; height: 310px!important; margin-bottom: 20px;
  }  
  .chart4{
    width: 100%; height: auto!important; padding: 20px 0px; margin-left: 2% !important; padding-left: 25px; padding-right: 5px;max-height: 250vh;overflow-y: auto;
  }
  .chart4_list{
    padding: 5px 0px;
  }
  .chart5{
    width: 100%; height: 310px!important; margin-bottom: 20px;
  } 
  .chart6{
    width: 100%;height: auto!important;
  }

  .right-charts{
    margin-left: 0.7%;
  }

  @media(max-width: 550px){
    .site-logo {
      position: absolute;
      right: 0;
      margin-left: 0;
      margin-right: 0;
      padding-right: 1.1rem !important;
    }
    .content--wrap .layout {
      display: block;
    }
    .content--wrap .layout .left-charts, .content--wrap .layout .right-charts {
      width: 100%;
      display: block;
    }
    .chart1, .chart2, .chart3, .chart5{
      width: 100%;
      height: 100% !important;
      margin-bottom: 20px;
    }
    .toolbar__title{
      position: absolute;
      letf: 0;
    }
    .chart1 .layout,.chart2 .layout{
      position: relative;
      height: 100% !important;
    }
    .chart1 .layout .sm1,.chart2 .layout .sm1{
      position: absolute;
      right: 0;
      margin-top: -9px;
    }
    .chart1 .layout .sm1 i,.chart2 .layout .sm1 i{
      margin: 0 !important;
    }
    .chart4{
      margin-left: 0% !important;
      margin-bottom: 50px !important;
    }
  }
  .chart1 canvas,.chart2 canvas{
    height: 200px !important;
  }
  .header1-number{
    font-size: 48px; color: RGB(237,150,34); font-weight: bold; 
  }
  .header2-text{
    padding: 10px; color: RGB(0,116,143); font-weight: bold;
  }
  @media only screen and (max-width: 500px) {
    .state-filter .toolbar__content {
      height: auto !important;
      display: block;
      position: relative;
      padding-top: 15px;
    }
    .state-filter .input-group {
      margin-left: 0px !important;
      padding: 18px 20px 0;
    }
    .state-filter .close-filter{
      margin-left: 0;
      color: black;
      position: absolute;
      top: 6px;
      right: 0;
      margin-right: 12px !important;
    }
    .state-filter .close-filter i{
      margin: 0px !important;
    }
    .state-filter label{
      padding: 0 25px;
    }
  }
  .emptyDashboard {
    color: #39B54A !important;
    height: 75vh;
  }
  .emptyDashboard .text_center{
    text-align: center;
    padding-bottom: 10px !important;
  }
  .emptyDashboard .app-card .text_center h2,.emptyDashboard .app-card .text_center h1 {
    color: #00748f;
    font-weight: bold;
  }
</style>
<template>
  <div class="container" style="padding: 24px 15px;"> 
    <v-card class="state-filter" v-if="isNotDepartmentUser && flag_DASHBOARD_FILTER">
      <v-toolbar class="filter" style="background-color: #fff;">
        <v-select label="State" :items="stateAssembly" item-text="state" item-value="id"  v-model="selectedState" v-on:input="filterDropdowns('state')">  </v-select>
        
        <v-select label="Parlimentary" :items="filteredParliamentaryConstituencies" item-text="name" item-value="id" v-model="selectedParlimentary" v-on:input="filterDropdowns('PC')" style="margin-left: 10px"></v-select>

        <v-select label="Assembly" :items="filteredAssemblyConstituencies" item-text="name" item-value="id" v-model="selectedAssembly" v-on:input="filterDropdowns('assembly')" style="margin-left: 10px"></v-select>

        <v-select label="Ward" :items="filteredWards" v-model="selectedWard" item-text="name" item-value="id" v-on:input="filterDropdowns('ward')" style="margin-left: 10px"></v-select>

        <v-flex sm1 class="close-filter" style="margin-left: 15px;color: black;">
          <i title="clear filter" class="material-icons" @click="beforeMethod()" style="margin: 20px;cursor: pointer;">cancel</i>
        </v-flex> 

      </v-toolbar>
    </v-card>

    <v-layout row>
      <div class="xs12 left-charts" v-bind:class="flag_COMPLAINTS_SUMMARY ? 'sm8' : 'sm12'">
        <v-layout row wrap>
          <div class="chartbg chart1 row" v-if="flagCOMPLAINT_MONTH">
            <h4 class="chart-header">Total Number Of Complaints Reported vs Total Resolved By Month</h4>
            <v-layout row wrap style="height: 60px; margin-top: -5px;">
              <v-flex sm2 style="padding: 0px 5px;">
                <v-select
                  label="Year" autocomplete 
                  :items="totalYears"
                  onKeyPress="if(this.value.length > 3) return false; "
                  onkeydown="javascript: return event.keyCode == 69 ? false : true"
                  type="number"
                  v-model="selectedYear"
                  v-on:input="filterFirstChart('year')"
                ></v-select>
              </v-flex>
              <v-flex sm5 style="padding: 0px 5px;">
                <v-select
                  label="Department" autocomplete 
                  :items="departments"
                  v-model="deptId"
                  item-text="name" item-value="id"
                  v-on:input="filterFirstChart('dept'), getFilteredSubDept()"
                ></v-select>
              </v-flex>
              <v-flex sm4 style="padding: 0px 5px;">
                <v-select
                  label="Sub Department" autocomplete 
                  :items="subDepartments"
                  v-model="subDeptId"
                  item-text="name" item-value="id"
                  v-on:input="filterFirstChart('subDept')"
                ></v-select>                    
              </v-flex>
              <v-flex sm1 style="padding: 0px 5px;">
                  <i title="clear filter" class="material-icons" @click="clearFilter()" style="margin: 20px;cursor: pointer;">cancel</i>
              </v-flex>          
            </v-layout>
            <div>
              <complaintGraph></complaintGraph>
            </div>
          </div>  
        </v-layout>

        <v-layout v-if="flagCOMPLAINT_DEPARTMENT">  
          <div class="chartbg chart2 row">
            <h4 class="chart-header">Number Of Complaints Reported vs Resolved By Department</h4>
            <v-layout row wrap style="height: 75px; margin-top: 15px;">
              <v-flex sm5>
                <v-select
                  label="Department" autocomplete 
                  :items="departments"
                  v-model="selectedDeptId"
                  item-text="name" item-value="id"
                  v-on:input="getFilteredGraph()"
                ></v-select>
              </v-flex>
              <v-flex sm3>
                <v-dialog
                  ref="datePickerOne"
                  persistent
                  v-model="datePickerOne"
                  lazy
                  full-width
                  width="290px"
                  :return-value.sync="startDate">  
                  <v-text-field
                    slot="activator"
                    label="Start Date"
                    v-model="startDate"
                    prepend-icon="event">
                  </v-text-field>
                  <v-date-picker v-model="startDate" scrollable :max="endDate" >
                    <v-spacer></v-spacer>
                    <v-btn flat class="btn-danger" @click="datePickerOne = false">Cancel</v-btn>
                    <v-btn flat class="btn-primary" @click="$refs.datePickerOne.save(startDate) , getFilteredGraphOnDate()">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex sm3>
                <v-dialog
                  ref="datePickerTwo"
                  persistent
                  v-model="datePickerTwo"
                  lazy
                  full-width
                  width="290px"
                  :return-value.sync="endDate">  
                    <v-text-field slot="activator" label="End Date" v-model="endDate" prepend-icon="event"></v-text-field>
                      <v-date-picker v-model="endDate" scrollable :min="startDate">
                        <v-spacer></v-spacer>
                        <v-btn flat class="btn-danger" @click="datePickerTwo = false">Cancel</v-btn>
                        <v-btn flat class="btn-primary" @click="$refs.datePickerTwo.save(endDate), getFilteredGraphOnDate()">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
              </v-flex>
              <v-flex sm1>
                <i title="clear date filter" class="material-icons" @click="clearDate()" style="margin: 20px;cursor: pointer;">cancel</i>
              </v-flex>
            </v-layout>
            <div>
              <canvas ref="canvas"></canvas>
            </div>
          </div> 
        </v-layout> 
        <v-layout> 
          <div class="chartbg chart3" v-if="flag_AGE_OF_REPORTED_COMPLAINTS_UNRESOLVED">
            <h4 class="chart-header">Age of Reported Complaints Unresolved</h4>
            <v-layout row style="margin-top: 12%" class="text-xs-center">
              <v-flex xs12 sm6>
                <h2 class="header2-text"><h1 class="header1-number">{{totalUnresolved}}</h1><br/> Unresolved Complaint </h2>
              </v-flex>
              <v-flex xs12 sm6>
                <h2 class="header2-text"><h1 class="header1-number">{{avgDays}}</h1><br/> Days Average Age</h2>
              </v-flex>
            </v-layout>
          </div>
        </v-layout>
        <v-layout v-if="flagUSES_BY_WEBUSERS">
          <div class="chartbg chart5">
              <h4 class="chart-header">Usage by WebUsers, Citizens, and Volunteers</h4>
              <v-layout row style="margin-top: 12%" class="text-xs-center">
                <v-flex xs12 sm4>
                  <h2 class="header2-text"><h1 class="header1-number">{{totalUser}}</h1><br/>Total WebUsers</h2>
                </v-flex>
                <v-flex xs12 sm4>
                  <h2 class="header2-text"><h1 class="header1-number">{{totalCitizen}}</h1><br/>Total Citizens</h2>
                </v-flex>
                <v-flex xs12 sm4>
                  <h2 class="header2-text"><h1 class="header1-number">{{totalVolunteer}}</h1><br/>Total Volunteers</h2>
                </v-flex>
              </v-layout>
          </div>
        </v-layout>

        <v-layout v-if="flagUSES_BY_WEBUSERS"> 
          <div class="chartbg chart5">
              <h4 class="chart-header">Usage by WebUsers, Citizens, and Volunteers</h4>
              <v-layout row style="margin-top: 12%" class="text-xs-center">
                <v-flex xs12 sm4>
                  <h2 class="header2-text"><h1 class="header1-number">{{totalActiveUser}}</h1><br/>Last 7 Day's Active WebUsers</h2>
                </v-flex>
                <v-flex xs12 sm4>
                  <h2 class="header2-text"><h1 class="header1-number">{{totalActiveCitizen}}</h1><br/> Last 7 Day's Active Citizens</h2>
                </v-flex>
                <v-flex xs12 sm4>
                  <h2 class="header2-text"><h1 class="header1-number">{{totalActiveVolunteer}}</h1><br/> Last 7 Day's Active Volunteers</h2>
                </v-flex>
              </v-layout>
          </div>
        </v-layout>
      </div>

      <div class="xs12 sm4 right-charts" v-if="flag_COMPLAINTS_SUMMARY">
        <div class="chartbg row">
          <h3 class="chart-header">Complaint's Summary</h3> 
          <v-layout row wrap>
            <v-flex sm6>
              <v-select
                label="Department" autocomplete 
                :items="departments"
                v-model="deptIdSummary"
                item-text="name" item-value="id"
                v-on:input="getComplaintSummaryReport(), getFilteredSubDeptSummary()"
              ></v-select>
            </v-flex>
            <v-flex sm6>
              <v-select
                label="Sub Department" autocomplete 
                :items="subDepartmentsSummary"
                v-model="subDeptIdSummary"
                item-text="name" item-value="id"
                v-on:input="getComplaintSummaryReport()"
              ></v-select>
            </v-flex>
          </v-layout>
          <div class="chart4">
            <div>
              <ul>
                <li class="chart4_list" v-for="item in complaintsData.todaysCreatedComplaints">
                  New Complaint : {{item[0] ? item[0] : ''}}  {{ item[1] ? ' - ' + item[1] : ''}}
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li class="chart4_list" v-for="item in complaintsData.todaysDueComplaints">
                  Due Complaint : {{item[0] ? item[0] : ''}}  {{ item[1] ? ' - ' + item[1] : ''}}
                </li>
              </ul>
            </div>        
            <div>
              <ul>
                <li class="chart4_list" v-for="item in complaintsData.pendingComplaints">
                  Delayed Complaint : {{item[0] ? item[0] : ''}}  {{ item[1] ? ' - ' + item[1] : ''}}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </v-layout>
    <div v-if="isEmptyDashboard" class="mt-2 emptyDashboard">
      <v-flex xs12 sm12 md12 style="height: 100%">
        <div class="app-card" style="height: 100%">
          <div class="app-card-title text_center mt-5">
            <h1>Welcome To Smart Neta</h1>
          </div>
          <div class="app-card-content text_center pt-0">
            <h2>“Intellect & Technology”</h2>
          </div>
        </div>
      </v-flex>
    </div>

  </div>
</template> 

<script>
import { Bar } from 'vue-chartjs'
import * as samparkService from "./service";
import * as papaparse from "./papaparse";
import complaintGraph from './complaint-graph.vue'
export default {
  components: {
    complaintGraph
  },
  extends: Bar,
  data: function () {
    return {
      selectedId : -1,
      filterBy : "",
      isNotDepartmentUser : true,
      chartResult:[],
      departments:[],
      userType: false,
      datePickerOne: false,
      datePickerTwo: false,
      flagCOMPLAINT_SUMMARY: false,
      selectedDeptId: null,
      selectedWardId: -1,
      deptId: null,
      deptIdSummary: -1,
      subDeptIdSummary: -1,
      subDeptId: null,
      startDate: null,
      endDate: null,
      stateAssembly: [],  
      filteredStateAssembly: [],
      filteredParliamentaryConstituencies: [],
      filteredDistricts: [],
      filteredAssemblyConstituencies: [],
      filteredWards: [],
      filteredBooth: [],
      selectedState: null,
      selectedParlimentary: {},
      selectedDistrict: {},
      selectedAssembly: {},
      selectedWard: '',
      selectedBooth: '',
      totalUnresolved:0,
      totalVolunteer: 0,
      totalActiveVolunteer: 0,
      totalUser: 0,
      totalActiveUser: 0,
      totalCitizen: 0,
      totalActiveCitizen: 0,
      totalYears:[],
      subDepartments:[],
      subDepartmentsSummary:[],
      complaintsData:[],
      selectedYear: null,
      flagCOMPLAINT_MONTH : null,
      flagCOMPLAINT_DEPARTMENT : null,
      flagUSES_BY_WEBUSERS : null,
      flag_AGE_OF_REPORTED_COMPLAINTS_UNRESOLVED : null,
      flag_COMPLAINTS_SUMMARY : null,
      flag_DASHBOARD_FILTER : null,
      isEmptyDashboard : false,
      avgDays:0,
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
          }],
        }
      }
    } 
  },
  methods: {
    displaySecondChart(){
      if (this.$data._chart) {
        this.$data._chart.destroy();
      }
      this.renderChart({
        labels: this.chartResult.labels,
        datasets: [
          {
            label: 'Complaint',
            backgroundColor: 'RGB(237,150,34)',
            data: this.chartResult.total
          },
          {
            label: 'Resolved',
            backgroundColor: 'RGB(0,116,143)',
            data: this.chartResult.resolved
          }
        ]
      },this.options);
    },
    filterDropdowns(filterdOn){
      this.filterBy = filterdOn;
      if(filterdOn == "state"){
        this. housPerMem= [],
        this.filteredParliamentaryConstituencies = [];
        this.filteredDistricts = [];
        this.filteredAssemblyConstituencies = [];
        this.filteredWards = [];
        this.filteredBooth = [];
        this. housPerMem= [],
        this.selectedParlimentary = null;
        this.selectedId = this.selectedState;
        samparkService.parliamentaryConstituencyByState(this.selectedState).then(res => {
          this.filteredParliamentaryConstituencies = res.data;
        });
      } else if(filterdOn == "PC"){
          this.filteredWards = [];
          this.filteredAssemblyConstituencies = [];
          this.selectedAssembly = null;
          this.selectedWard = null;
          this.selectedId = this.selectedParlimentary;
          samparkService.getFilteredData('AssemblyConstituency', this.selectedParlimentary).then(res => {
            this.filteredAssemblyConstituencies = res.data;
          });
      } else if(filterdOn == "assembly"){
        this. housPerMem= [],
        this.filteredWards = [];
        this.filteredBooth = [];
        this.selectedWard = null; 
        this.selectedId = this.selectedAssembly;
         samparkService.getFilteredData('Ward', this.selectedAssembly).then(res => {
          this.filteredWards = res.data;
        });  
      } else if(filterdOn == "ward") {
        this.selectedWardId = this.selectedWard;
        this.selectedId = this.selectedWard;
        this.getFilteredGraph();
        this.filterFirstChart();
      }
      this.getUserData();
      this.getComplaintsAverage();
      this.getComplaintSummaryReport();      
    },
    getFilteredGraph(){
      this.selectedDeptId = this.selectedDeptId ? this.selectedDeptId : -1;
      if(this.startDate && this.endDate){
        this.getFilteredGraphOnDate();
      } else {
        samparkService.getComplaintChartByDepartment(this.selectedDeptId, this.selectedWardId).then((res) => {
          this.chartResult = res.data;
          if(this.flagCOMPLAINT_DEPARTMENT) {
            this.displaySecondChart();
          }
        });
      }
    },
    getUserData(){
      if(this.selectedId && this.filterBy) {
        samparkService.getUserLoginDetail(this.selectedId, this.filterBy).then((res) => {
          this.totalActiveUser = res.data.TotalActiveUser;
          this.totalActiveVolunteer = res.data.TotalActiveVolunteer;
          this.totalUser = res.data.TotalUser;
          this.totalVolunteer = res.data.TotalVolunteer;
          this.totalCitizen = res.data.TotalCitizen;
          this.totalActiveCitizen = res.data.TotalActiveCitizen;
        });
      }
     },
    getComplaintsAverage() {
      if(this.selectedId && this.filterBy) {
        samparkService.getComplaintsAverage(this.selectedId , this.filterBy).then((res) => {
          this.convertMiliToDays(res.data.totalAverageDays);
          this.totalUnresolved = res.data.totalUnresolvedComplaints;
        });
      }
    },
    getFilteredGraphOnDate(){
      if(this.startDate && this.endDate && new Date(this.startDate) <= new Date(this.endDate) && this.flagCOMPLAINT_DEPARTMENT){
        var filterStartDate  = this.startDate + 'T00:00:00';
        var filterEndDate  = this.endDate + 'T23:59:59';
        samparkService.getComplaintChartByDepartmentBydates(this.selectedDeptId, this.selectedWardId, new Date(filterStartDate),new Date(filterEndDate)).then((res) => {
          this.chartResult = res.data;
          this.displaySecondChart();
        });
      }else{
        if(this.startDate && this.endDate){
          this.showMinDateError();
        }
      }
    },
    convertMiliToDays(ms){
      var d, h, m, s;
      s = Math.ceil(ms / 1000);
      m = Math.ceil(s / 60);
      h = Math.ceil(m / 60);
      this.avgDays = Math.ceil(h / 24);
    },
    clearDate(){
      this.startDate = null;
      this.endDate = null;
      this.selectedDeptId = null;
      this.getFilteredGraph();
    },
    clearFilter(){
      if(this.userType){
            this.selectedYear = new Date().getFullYear();
            this.$root.$emit('filterChartOnYearDeptSubdept', this.selectedYear, this.deptId, this.subDeptId, this.selectedWardId);
      } else {
          this.deptId = null;
          this.subDeptId = null;
          this.subDepartments = [];
          this.selectedYear = new Date().getFullYear();
          this.$root.$emit('filterChartOnYear', this.selectedYear, this.selectedWardId );
      }
    },
    filterFirstChart(type){
      if(type == 'subDept'){
        if(this.deptId && this.selectedYear && this.subDeptId){
          this.$root.$emit('filterChartOnYearDeptSubdept', this.selectedYear, this.deptId, this.subDeptId, this.selectedWardId);
        }
      } else if(type == 'dept'){
        if(this.deptId && this.selectedYear){
          this.subDeptId = null;
          this.subDepartments = null;
          this.$root.$emit('filterChartOnYearDept', this.selectedYear, this.deptId, this.selectedWardId);
        }
      } else {
        if(this.deptId && this.selectedYear && this.subDeptId){
          this.$root.$emit('filterChartOnYearDeptSubdept', this.selectedYear, this.deptId, this.subDeptId, this.selectedWardId);
        }else if(this.deptId && this.selectedYear){
          this.$root.$emit('filterChartOnYearDept', this.selectedYear, this.deptId, this.selectedWardId);
        }else{
          this.$root.$emit('filterChartOnYear', this.selectedYear, this.selectedWardId);
        }
      }
    },
    getComplaintSummaryReport(){
      if(this.selectedId && this.filterBy) {
        samparkService.getComplaintsHistory(this.deptIdSummary, this.subDeptIdSummary ,this.selectedId, this.filterBy).then((res) => {
          this.complaintsData = res.data;
        });
      }
    },
    getFilteredSubDept(){
      samparkService.getFilteredSubDepartment(this.deptId).then((res) => {
        this.subDepartments = res.data;
      });
    },
    getFilteredSubDeptSummary(){
      samparkService.getFilteredSubDepartment(this.deptIdSummary).then((res) => {
        this.subDepartmentsSummary = res.data;
        this.subDeptIdSummary = -1;
      });
    },
    beforeMethod(){
      this.selectedWardId = -1;
      this.selectedWard = null;
      this.selectedAssembly = null;
      this.selectedParlimentary = null;
      this.filteredAssemblyConstituencies = [];
      this.filteredWards = [];
      this.getFilteredGraphOnDate();
      this.getUserData();
      this.getComplaintsAverage();
      this.getFilteredGraph();
      this.getComplaintSummaryReport();
     }
  },
  mounted () {
    this.permissions =  window.localStorage.getItem('permissions').split(',');

    Array.prototype.contains = function(obj) {
      var i = this.length;
      while (i--)
         if (this[i] == obj)
          return true;
        return false;
    }

    this.flagCOMPLAINT_MONTH = this.permissions.contains("RESOLVED_MONTH_COMPLAINT");
    this.flagCOMPLAINT_DEPARTMENT = this.permissions.contains("RESOLVED_DEPARTMENT_COMPLAINT");
    this.flagUSES_BY_WEBUSERS = this.permissions.contains("USES_BY_WEBUSERS_VOLUNTEERS_AND_CITIZENS");

    this.flag_COMPLAINTS_SUMMARY = this.permissions.contains("COMPLAINTS_SUMMARY");
    this.flag_AGE_OF_REPORTED_COMPLAINTS_UNRESOLVED = this.permissions.contains("AGE_OF_REPORTED_COMPLAINTS_UNRESOLVED");
    this.flag_DASHBOARD_FILTER = this.permissions.contains("DASHBOARD_FILTER");

    if(this.flagCOMPLAINT_MONTH || this.flagCOMPLAINT_DEPARTMENT || this.flagUSES_BY_WEBUSERS || this.flag_COMPLAINTS_SUMMARY || this.flag_AGE_OF_REPORTED_COMPLAINTS_UNRESOLVED || this.flag_DASHBOARD_FILTER) {
      this.isEmptyDashboard = false;
    } else {
      this.isEmptyDashboard = true;
    }
      var data =  window.localStorage.getItem('loginUser');
      data = JSON.parse(data);

      this.stateAssembly = data.stateAssembly;
     
       if(data.user.type == 'dept user'){
        this.userType = true;
        this.isNotDepartmentUser = false;

        this.filterBy = data.ward && data.ward.id ? 'ward' : null;
        this.selectedId = data.ward && data.ward.id ? data.ward.id : null;

        this.selectedId = !this.selectedId && data.assemblyConstituency && data.assemblyConstituency.id ? data.assemblyConstituency.id : this.selectedId;
        this.filterBy = !this.filterBy && data.assemblyConstituency && data.assemblyConstituency.id ? 'assembly' : this.filterBy;

        this.selectedId = !this.selectedId && data.stateAssembly && data.stateAssembly.id ? data.stateAssembly.id : this.selectedId;
        this.filterBy = !this.filterBy && data.stateAssembly && data.stateAssembly.id ? 'state' : this.filterBy;

        this.departments = data.subDepartment.department;
        this.selectedDeptId = this.departments.id;
        this.deptId = this.departments.id;
        this.subDepartments = data.subDepartment;
        this.subDeptId = this.subDepartments.id;
        this.subDepartmentsSummary = this.subDepartments;
        this.deptIdSummary = this.departments.id;
        this.subDeptIdSummary = this.subDepartments.id;
        this.selectedYear = new Date().getFullYear();
        this.getFilteredGraph();
        this.getComplaintSummaryReport();
        this.getComplaintsAverage();
        // this.getUserData();
        this.filterFirstChart('year');
    } else {
      samparkService.getAll('Department').then((res) => {
          this.departments = res.data;
          // this.selectedDeptId = this.departments.length > 0 ? this.departments[0].id : null;
          this.getFilteredGraph();
          this.getComplaintsAverage();
          this.getUserData();
          this.getComplaintSummaryReport();
      }); 
    }

    if(!this.stateAssembly){
        samparkService.getAll('StateAssembly').then((res) => {
          this.stateAssembly = res.data;
      })
    } else {
      this.selectedState = this.stateAssembly.id;
      if(data.user.type != 'dept user') {
        this.filterDropdowns('state');
      }
      
    } 

    this.totalYears = [];
    this.selectedYear = new Date().getFullYear();
    for (var i = 2018; i< 2050 ; i++) {
      this.totalYears.push(i);
    }
  },
  notifications: {
    showMinDateError: {
      title: "Start Date must be less than End Date.",
      message: "",
      type: "error",
      timeout: 2500
    }
  }
}

</script>
