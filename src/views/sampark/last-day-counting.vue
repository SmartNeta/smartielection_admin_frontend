<style type="text/css">
 
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
    .state-filter .toolbar{
      height: auto !important;
      /*height: 320px;*/
      margin-top: 20px !important;
    }
    .state-filter .close-filter i{
      margin: 0px !important;
    }
    .state-filter label{
      padding: 0 25px;
    }
  }

  .text_center, .view_button{
    text-align: center;
    padding-bottom: 10px !important;
  }
  .app-card .text_center h2 {
    color: #00748f;
    font-weight: bold;
  }
  .report_block_counting{
    height: 205px;
  }
  
  #progressBarOverview {
    position: fixed;
    top: 40%;
    min-width: 75%;
    left: 60%;
    transform: translate(-50%, -50%);
  }

  .paddingLeft{
      padding-left: 10px;
  }

  #dashboardViewOverview{
    margin-bottom: 0px;
  }
  @media only screen and (max-width: 600px) {
    #progressBarOverview {
      left: 50%;
    }
    .paddingLeft{
      padding-left: 0px;
    }
    #dashboardViewOverview{
      margin-bottom: 35px;
    }
  }

  @media only screen and (max-width: 824px) {
    #progressBarOverview {
      left: 50%;
    }
  }
  
</style>

<template>
  <div class="container" style="padding: 24px 15px;"> 
    <div id="dashboardViewOverview">
     <v-card class="state-filter">
      <v-toolbar class="filter" style="background-color: #fff;">

          <v-select label="State" :items="stateAssembly" item-text="state" item-value="id"  v-model="selectedState" v-on:input="filterDropdowns('state')"></v-select>
          
          <v-select label="Parlimentary" :items="filteredParliamentaryConstituencies" item-text="name" item-value="id" v-model="selectedParlimentary"v-on:input="filterDropdowns('PC')" style="margin-left: 10px"></v-select>

          <v-select label="Assembly" :items="filteredAssemblyConstituencies" item-text="name" item-value="id" v-model="selectedAssembly" v-on:input="filterDropdowns('assembly')" style="margin-left: 10px"></v-select>

          <v-select label="Ward" :items="filteredWards" v-model="selectedWard" item-text="name" item-value="id" style="margin-left: 10px"></v-select>

          <div class="close-filter" style="margin-right: 0px;color: black;">
            <i title="clear filter" class="material-icons" @click="clearFilters()" style="margin: 20px;cursor: pointer;">cancel</i>
          </div>

      </v-toolbar>
    </v-card>  

    <div class="app-card-content" style="margin-top: 15px;">

        <v-layout row wrap>
          <v-flex xs12 sm6 md6>
            <div class="app-card report_block_counting">
              <div class="app-card-title text_center">
                <h2>State Report</h2>
              </div>
              <div class="app-card-content view_button overflow-hidden">
                  <v-btn class="btn-primary" @click="getOverviewByState()">View Report</v-btn>
              </div>
            </div>
          </v-flex>
          <v-flex xs12 sm6 md6 class="paddingLeft">
              <div class="app-card report_block_counting">
                <div class="app-card-title text_center">
                  <h2>Parliamentary Constituency Report</h2>
                </div>
                <div class="app-card-content view_button overflow-hidden">
                  <v-btn class="btn-primary" @click="getOverviewByParlimentory()">View Report</v-btn>
                </div>
              </div>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12 sm6 md6>
            <div class="app-card report_block_counting">
              <div class="app-card-title text_center">
                <h2>Assembly Constituency Report</h2>
              </div>
              <div class="app-card-content view_button overflow-hidden">
                <v-btn class="btn-primary" @click="getOverviewByAssembly()">View Report</v-btn>
              </div>
            </div>
          </v-flex>
          <v-flex xs12 sm6 md6 class="paddingLeft">
              <div class="app-card report_block_counting">
                <div class="app-card-title text_center">
                  <h2>Ward Report</h2>
                </div>
                <div class="app-card-content view_button overflow-hidden">
                  <v-btn class="btn-primary" @click="getOverviewByWard()">View Report</v-btn>
                </div>
              </div>
            </v-flex>
        </v-layout>
      </div>
    </div>

    <div id="reportViewOverview" class="app-card-content" style="display: none;">
      <v-layout row wrap style="margin-bottom: 20px;">
        <v-flex xs12 sm6 md6>
          <h1>{{reportName}}</h1>
        </v-flex>
        <v-flex xs12 sm6 md6 style="text-align: right;">
            <a id="downloadPDFOverview" href="#" type="application/pdf">
              <v-btn class="btn-success">
                <span class="icon-style">
                        <i class="material-icons" style="margin: 5px;margin-left: 0px;">file_download</i>
                </span>PDF
              </v-btn>
            </a>
            <a id="downloadExcelOverview" href="#" style="margin-left: 10px;">
              <v-btn class="btn-primary">
                <span class="icon-style">
                        <i class="material-icons" style="margin: 5px;margin-left: 0px;">file_download</i>
                </span>Excel
              </v-btn>
            </a>
            <v-btn class="btn" @click="backToHome()" style="margin-left: 10px; padding-left: 0;">
              <span class="icon-style">
                <i class="material-icons" style="margin: 5px;margin-left: 0px;">arrow_back</i>
              </span>Back
            </v-btn>
        </v-flex>
      </v-layout>
     <!-- <iframe id="myFrameOverview" src="" width="100%" height="450px" type="application/pdf"> If you are unable to view file, you can download from above download button.</iframe> -->
     <object id="myFrameOverview" data="" type="application/pdf" width="100%" height="450px">If you are unable to view file, you can download pdf/excel from above download buttons.</object>
   </div>

  <div id="progressBarOverview" style="display: none;">
    <v-layout row wrap>
      <v-flex xs12 md12>
        <div class="">
          <div class="app-card-title" style="text-align: center;">
            <h2 style="font-weight: bold;">{{reportName}}</h2>
          </div>
          <div class="app-card-content">
            <div class="mb-3" style="text-align: center;">
              <p>Please wait..</p>
            </div>
            <v-progress-linear :indeterminate="true" color="green"></v-progress-linear>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>

  </div>
</template>

<script>
  import * as samparkService from "./service";
  import moment from 'moment'
  export default {
    data () {
      return {
        stateAssembly: [],  
        filteredStateAssembly: [],
        filteredParliamentaryConstituencies: [],
        filteredDistricts: [],
        filteredAssemblyConstituencies: [],
        filteredWards: [],
        filteredBooths: [],
        selectedState: null,
        selectedParlimentary: null,
        selectedAssembly: null,
        selectedWard: null,
        selectedBooth: null,
        reportName : "Overview"
      }
    },
     methods: {
      filterDropdowns(filterdOn){
        this.csvData = null;
        if(filterdOn == "state"){
          this.filteredParliamentaryConstituencies = [];
          this.filteredDistricts = [];
          this.filteredAssemblyConstituencies = [];
          this.filteredWards = [];
          this.filteredBooths = [];
          this.selectedWard = null;
          this.selectedAssembly = null;
          this.selectedBooth = null;
          samparkService.parliamentaryConstituencyByState(this.selectedState).then(res => {
            this.filteredParliamentaryConstituencies = res.data;
          });
        } else if(filterdOn == "PC"){
            this.filteredWards = [];
            this.selectedAssembly = null;
            this.selectedWard = null;
            samparkService.getFilteredData('AssemblyConstituency',this.selectedParlimentary).then(res => {
              this.filteredAssemblyConstituencies = res.data;
            });
        } else if(filterdOn == "assembly"){
          this.filteredWards = [];
          this.filteredBooths = [];
          this.selectedWard = null;
          this.selectedBooth = null;
          samparkService.getFilteredData('Ward',this.selectedAssembly).then(res => {
            this.filteredWards = res.data;
          });  
        } else if(filterdOn == "ward"){
          this.filteredBooths = [];
          this.selectedBooth = null;
          samparkService.getFilteredData('Booth',this.selectedWard).then(res => {
            this.filteredBooths = res.data;
          });
        }
      },
      clearFilters(){
        $("#reportViewOverview").hide();
        $("#dashboardViewOverview").show();
        this.selectedWard = null;
        this.selectedAssembly = null;
        this.selectedParlimentary = null;
        this.selectedBooth = null;
        this.filteredWards = [];
        this.filteredBooths = [];
        this.filteredAssemblyConstituencies = [];
      },
      getOverviewByState(){
        if(!this.selectedState){
          this.showStateErrorMessage();
          return false;
        }
        this.reportName = "State Report";
        $("#dashboardViewOverview").hide();
        var fileName ="Last-Day-Counting-State_" + moment(new Date()).format('MM/DD/YYYY-hh:mm:ss');
        samparkService.lastDayCountingBy('/getOverviewByState', this.selectedState, fileName);
      },
      getOverviewByParlimentory(){
        if(!this.selectedParlimentary){
          this.showPCErrorMessage();
          return false;
        }
        this.reportName = "Parliamentary Constituency Report";
        $("#dashboardViewOverview").hide();
        var fileName ="Last-Day-Counting-Parliamentary-Constituency_" + moment(new Date()).format('MM/DD/YYYY-hh:mm:ss');
        samparkService.lastDayCountingBy('/getOverviewByParlimentory', this.selectedParlimentary, fileName);
      },
      getOverviewByAssembly(){
        if(!this.selectedAssembly){
          this.showACErrorMessage();
          return false;
        }
        this.reportName = "Assembly Constituency Report";
        $("#dashboardViewOverview").hide();
        var fileName ="Last-Day-Counting-Assembly-Constituency_" + moment(new Date()).format('MM/DD/YYYY-hh:mm:ss');
        samparkService.lastDayCountingBy('/getOverviewByAssembly', this.selectedAssembly, fileName);
      },
      getOverviewByWard(){
      if(!this.selectedWard){
          this.showWardErrorMessage();
          return false;
        }
        this.reportName = "Ward Report";
        $("#dashboardViewOverview").hide();
        var fileName ="Last-Day-Counting-Ward_" + moment(new Date()).format('MM/DD/YYYY-hh:mm:ss');
        samparkService.lastDayCountingBy('/getOverviewByWard', this.selectedWard, fileName);
      },
      backToHome(){
        $("#progressBarOverview").hide();
        $("#reportViewOverview").hide();
        $("#dashboardViewOverview").show();
      }
    },
    beforeMount() {
      var data =  window.localStorage.getItem('loginUser');
      data = JSON.parse(data);
      this.stateAssembly = data.stateAssembly;

      if(!this.stateAssembly){
          samparkService.getAll('StateAssembly').then((res) => {
            this.stateAssembly = res.data;
        })
      } else {
        this.selectedState = this.stateAssembly.id;
        this.filterDropdowns('state');
      }
    },
     notifications: {
      showStateErrorMessage: {
        title: 'Please select State.',
        message: '',
        type: 'error',
        timeout: 2500
      },      
      showPCErrorMessage: {
        title: 'Please select Parliamentary Constituency.',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showACErrorMessage: {
        title: 'Please select Assembly Constituency.',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showWardErrorMessage: {
        title: 'Please select Ward.',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showBoothErrorMessage: {
        title: 'Please select Booth.',
        message: '',
        type: 'error',
        timeout: 2500
      }
    }

  }
</script>
