<style type="text/css">
  .chartbg{
    padding: 15px;
    margin-bottom: 20px;
    box-shadow: 0 0 16px 1px #ccc!important;
    border-radius: 4px;
  }
  .survey_graph_header{
    font-weight: 700;
    margin-bottom: -5px;
    margin-top: -10px;
    text-align: center;
  }

  .survey_graph {
        width: 100%; height: 450px!important;
  }
 
   @media only screen and (max-width: 550px) {
    .survey_graph{
      width: 100%;
      height: 100% !important;
      margin-bottom: 20px;
    }
  }

  .survey_graph canvas{
    height: 420px !important;
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
    .state-filter .toolbar{
      height: auto !important;
      margin-top: 20px !important;
    }
    .state-filter .export-csv-button{
      margin: 10px;
    }
  }
</style>

<template>
  <div class="container" style="padding: 24px 15px;"> 
     <v-card class="state-filter">
      <v-toolbar class="filter" style="background-color: #fff;">
          <v-select label="State" :items="stateAssembly" item-text="state" item-value="id"  v-model="selectedState" v-on:input="filterDropdowns('state')">  </v-select>

          <v-select label="Parlimentary" :items="filteredParliamentaryConstituencies" item-text="name" item-value="id" v-model="selectedParlimentary" v-on:input="filterDropdowns('PC')" style="margin-left: 10px"></v-select>

          <v-select label="Assembly" :items="filteredAssemblyConstituencies" item-text="name" item-value="id" v-model="selectedAssembly" v-on:input="filterDropdowns('assembly')" style="margin-left: 10px"></v-select>

          <v-select label="Ward" :items="filteredWards" v-model="selectedWard" item-text="name" item-value="id" v-on:input="filterDropdowns('ward')" style="margin-left: 10px"></v-select>

          <v-select label="Booth" :items="filteredBooths" v-model="selectedBooth" item-text="no" item-value="id" v-on:input="filterDropdowns('booth')" style="margin-left: 10px"></v-select>

          <div sm1 class="close-filter" style="color: black;width: 4%">
            <i title="clear filter" class="material-icons" @click="clearFilters()" style="cursor: pointer;">cancel</i>
          </div> 
        </v-toolbar>
      </v-card>
      <v-card class="state-filter">
        <v-toolbar class="filter" style="background-color: #fff;">
            <v-btn round class="btn-success export-csv-button" style="margin-left: 10px" @click="getDataCSV()">Summary of Quantative questions</v-btn>
            <v-btn round class="btn-success export-csv-button" style="margin-left: 10px" @click="getQuestionsAnswersCSV()">Summary of qualitative questions</v-btn>            
            <v-btn round class="btn-success export-csv-button" style="margin-left: 10px" @click="getAllVotersSurveyCSV()">Voters Survey Data</v-btn>
         </v-toolbar>
      </v-card>
    <div class="chartbg survey_graph row">
      <h4 class="survey_graph_header">Questions Survey</h4>
      <div>
        <surveyQustionGraph></surveyQustionGraph>
      </div>
    </div>  
     
  </div>
</template>



<script>
  import * as samparkService from "./service";
  import * as papaparse from "./papaparse";
  import surveyQustionGraph from './survey-question-graph.vue'
  export default {
    components: {
      surveyQustionGraph
    },
    data () {
      return {
        stateAssembly: [],  
        filteredStateAssembly: [],
        filteredParliamentaryConstituencies: [],
        filteredDistricts: [],
        filteredAssemblyConstituencies: [],
        filteredWards: [],
        filteredBooths: [],
        selectedState: {},
        selectedParlimentary: {},
        selectedDistrict: {},
        selectedAssembly: {},
        selectedWard: '',
        selectedBooth: '',
        filedType: '',
        selectedId: null,
        isSuperAdmin : false
      }
    },
     methods: {
      filterDropdowns(filterdOn){
        this.csvData = null;
        this.filedType = filterdOn;
        if(filterdOn == "state"){
          this.filteredParliamentaryConstituencies = [];
          this.filteredDistricts = [];
          this.filteredAssemblyConstituencies = [];
          this.filteredWards = [];
          this.filteredBooths = [];
          this.selectedWard = null;
          this.selectedAssembly = null;
          this.selectedBooth = null;
          this.selectedId = this.selectedState;
          samparkService.parliamentaryConstituencyByState(this.selectedState).then(res => {
            this.filteredParliamentaryConstituencies = res.data;
          });
        } else if(filterdOn == "PC"){
          this.filteredAssemblyConstituencies = [];
          this.filteredWards = [];
          this.selectedAssembly = null;
          this.selectedWard = null;
          this.selectedId = this.selectedParlimentary;
          samparkService.getFilteredData('AssemblyConstituency',this.selectedParlimentary).then(res => {
            this.filteredAssemblyConstituencies = res.data;
          });
        } else if(filterdOn == "assembly"){
          this.filteredWards = [];
          this.filteredBooths = [];
          this.selectedWard = null;
          this.selectedBooth = null;
          this.selectedId = this.selectedAssembly;
          samparkService.getFilteredData('Ward',this.selectedAssembly).then(res => {
            this.filteredWards = res.data;
          });  
        } else if(filterdOn == "ward"){
          this.filteredBooths = [];
          this.selectedBooth = null;
          this.selectedId = this.selectedWard;
          samparkService.getFilteredData('Booth',this.selectedWard).then(res => {
            this.filteredBooths = res.data;
          });
        } else if(filterdOn == "booth"){
          this.selectedId = this.selectedBooth;
        }
        if(this.selectedId && this.filedType) {
          this.$root.$emit('getQuestionAnswerChart', this.selectedId, this.filedType);
        }
      },
      clearFilters(){
        this.selectedParlimentary = null;
        this.selectedAssembly = null;
        this.selectedWard = null;
        this.selectedBooth = null;
        this.filteredAssemblyConstituencies = [];
        this.filteredWards = [];
        this.filteredBooths = [];
        this.filedType = 'state';
        if(this.isSuperAdmin) {
          this.selectedId = null;
          this.selectedState = {};
          this.filteredParliamentaryConstituencies = [];
          this.$root.$emit('clearSurveyChart', null);
        } else {
          this.selectedId = this.selectedState;
          this.$root.$emit('getQuestionAnswerChart', this.selectedId, this.filedType);
        }
      },
      getDataCSV(){
           samparkService.getSurveyQuestionsCSV(this.filedType, this.selectedId , "ExportAllQuestions").then(res => {
             this.csvExport(res, "Summary-of-Quantative-Questions-");
          });
      },
      getQuestionsAnswersCSV(){
           samparkService.getSurveyQuestionsCSV(this.filedType, this.selectedId, "ExportOnlyInputTypeQuestions").then(res => {
             this.csvExport(res,"Summary-of-Qualitative-Questions-");
          });
      },
      getAllVotersSurveyCSV(){
           samparkService.getSurveyQuestionsCSV(this.filedType, this.selectedId, "ExportVotersSurveyData").then(res => {
             this.csvExport(res,"Voters-Survey-Data-");
          });
      },
      csvExport(arrData,fileName) {
      if(arrData && arrData.length > 0){
        let csvContent = papaparse.unparse(arrData);
        let csvFile = new Blob([csvContent], {type: "text/csv"});
        let downloadLink;
        downloadLink = document.createElement("a");
        var today = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        downloadLink.download = fileName + today  +".csv";
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }else{
        this.showNoDataToExportCSV();
      }
    }
    },
    beforeMount() {
      // this.$root.$emit('clearSurveyChart', null);
      var data =  window.localStorage.getItem('loginUser');
      data = JSON.parse(data);
      this.stateAssembly = data.stateAssembly;
      if(!this.stateAssembly){
          this.isSuperAdmin = true;
          samparkService.getAll('StateAssembly').then((res) => {
            this.stateAssembly = res.data;
        })
      } else {
        this.selectedState = this.stateAssembly.id;
        this.filterDropdowns('state');
      }
    },
     notifications: {
      showNoDataToExportCSV: {
        title: 'Survey Data Not Found',
        message: '',
        type: 'error',
        timeout: 2500
      },
    }

  }
</script>
