<style>
  .chart6{
        height: auto!important;
        margin-left: 10px;
        margin-right: 20px;
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
</style>
<template id="fooBar">
     <v-layout style="display: inherit; margin: 10px;"> 
        <v-card class="state-filter"> 
            <v-toolbar class="filter" style="background-color: #fff;">
                <v-select label="State" :items="stateAssembly" :return-object="true" item-text="state" item-value="id"  v-model="selectedState" v-on:input="filterDropdowns('state')" required>  </v-select>
          
                <v-select label="Parlimentary" :items="filteredParliamentaryConstituencies" item-text="name" item-value="id" v-model="selectedParlimentary" v-on:input="filterDropdowns('PC')" style="margin-left: 10px" required></v-select>

                <v-select label="Assembly" :items="filteredAssemblyConstituencies" :return-object="true" item-text="name" item-value="id" v-model="selectedAssembly" v-on:input="filterDropdowns('assembly')" style="margin-left: 10px" required></v-select>

                <v-select label="Ward" :items="filteredWards" :return-object="true" v-model="selectedWard" item-text="name" item-value="id" v-on:input="filterDropdowns('ward')" style="margin-left: 10px"></v-select>

                <v-select label="Booth" :items="filteredBooth" :return-object="true" v-model="selectedBooth" item-text="no" item-value="id" v-on:input="filterDropdowns('booth')" style="margin-left: 10px"></v-select>

                <div class="close-filter" style="margin-right: 0px;color: black;">
                  <i title="clear filter" class="material-icons" @click="clearFilters()" style="margin: 20px;cursor: pointer;">cancel</i>
                </div>
             </v-toolbar>
          </v-card>

          <div class="app-card">
            <div class="app-card-content">
              <v-layout row wrap >    
                <v-flex xs12 sm3>
                    <v-btn :disabled="CSVButFlag" class="btn-primary" @click="csvExport()">Export To CSV</v-btn>
                </v-flex>
              </v-layout>
                 <v-data-table
                    v-bind:total-items="pagination.totalItems"
                    v-bind:pagination.sync="pagination"                 
                    v-bind:headers="headers"
                    v-bind:items="housPerMem"
                    >
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.address }}</td>
                    <td class="text-xs-center">{{ props.item.count }}</td>
                  </template>
                  <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                    From {{ pageStart }} to {{ pageStop }}
                  </template>
                </v-data-table>
              </div>
            </div>
        </v-layout> 
</template> 

<script>
import { Bar } from 'vue-chartjs'
import * as samparkService from "./service";
import * as papaparse from "./papaparse";
export default {
  extends: Bar,
  watch: {
    pagination: {
      async handler () {
        if(this.filterState && this.id){
          if(this.pagination.page == null){
            this.pagination.page = 1;
          }
          samparkService.noOfPersonsPerHouse(this.id, this.filterState, this.pagination.page, this.pagination.rowsPerPage).then((res) => {
              if(this.pagination.rowsPerPage > 0){
                  this.housPerMem = res.data.content;
                  this.pagination.totalItems = res.data.totalElements;
                  // if(this.housPerMem && this.housPerMem.length > 0){
                  //   this.csvData = this.housPerMem.map(item => ({
                  //                   House_Number: item.houseNo ? item.houseNo : null ,
                  //                   Address: item.address ? item.address : null, 
                  //                   Total_Persons_Count : item.count ? item.count  : 0
                  //                 }));
                  //   } else {
                  //     this.csvData = null;
                  //   }
              } else {
                  this.wards = res.data;
              }
          })
        }
      },
      deep: true
    }
  },  
  data: function () {
    return {
      stateAssembly: [],
        file: null,
        show: true,
      filteredStateAssembly: [],
      filteredParliamentaryConstituencies: [],
      filteredDistricts: [],
      filteredAssemblyConstituencies: [],
      filteredWards: [],
      PieChartData: {},
      filteredBooth: [],
      filterState: '',
      selectedState: {},
      selectedParlimentary: {},
      selectedDistrict: {},
      selectedAssembly: {},
      selectedWard: {},
      slectedSegmentation: '',
      selectedBooth: {},
      CSVButFlag : true,
      pagination: {
          page: 1,
          rowsPerPage: 5,
          totalItems: 0,
      },
        headers: [
          {
            text: 'Address',
            align: 'left',
            sortable: false,
            value: 'address',
            width: '60%'
          },
          {
            text: 'Number Of Persons',
            align: 'center',
            sortable: false,
            value: 'count',
            width: '20%'
          }
        ],
        housPerMem: []
    }
  },
  methods: {
    filterDropdowns(filterdOn){
      this.filterState = filterdOn;
      if(filterdOn == "state"){
        this.CSVButFlag = true;
        this.housPerMem = [];
        this.filterState = null;
        this.filteredParliamentaryConstituencies = [];
        this.filteredDistricts = [];
        this.filteredAssemblyConstituencies = [];
        this.filteredWards = [];
        this.filteredBooth = [];
        this.id = this.selectedState.id;
        samparkService.parliamentaryConstituencyByState(this.selectedState.id).then(res => {
          this.filteredParliamentaryConstituencies = res.data;
        });
      } else if(filterdOn == "PC"){
        this.filterState = null;
        this.CSVButFlag = true;
        this.filteredAssemblyConstituencies = [];
        this.filteredWards = [];
        this.selectedAssembly = null;
        this.selectedWard = null;
        this.id = this.selectedParlimentary;
        samparkService.getFilteredData('AssemblyConstituency',this.selectedParlimentary).then(res => {
          this.filteredAssemblyConstituencies = res.data;
        });
      } else if(filterdOn == "assembly"){
        this.CSVButFlag = false;
        this.housPerMem = [];
        this.filteredWards = [];
        this.filteredBooth = [];
        this.selectedWard = {}; 
        this.id = this.selectedAssembly.id;
        samparkService.getFilteredData('Ward',this.selectedAssembly.id).then(res => {
          this.filteredWards = res.data;
        });  
      } else if(filterdOn == "ward"){
        this.CSVButFlag = false;
        this.housPerMem = [];
        this.filteredBooth = [];
        this.id = this.selectedWard.id;
        samparkService.getFilteredData('Booth',this.selectedWard.id).then(res => {
          this.filteredBooth = res.data;
        });
      } else if(filterdOn == "booth"){
        this.CSVButFlag = false;
        this.id = this.selectedBooth.id;
        // samparkService.boothByCitizenCount(this.selectedBooth.id).then(res => {
        //   this.housPerMem = res.data;
        //   if(this.housPerMem && this.housPerMem.length > 0){
        //     this.csvData = this.housPerMem.map(item => ({
        //                     House_Number: item.houseNo ? item.houseNo : null ,
        //                     Address: item.address ? item.address : null, 
        //                     Total_Persons_Count : item.count ? item.count  : 0
        //                   }));
        //     }else{
        //       this.csvData = null;
        //     }
        // });
      }
      this.pagination = {
        rowsPerPage: 5
      }      
    },
    csvExport() {
      this.CSVButFlag = true;
      samparkService.noOfPersonsPerHouseCSV(this.id, this.filterState).then(res => {
        var arrData  = res.data.content ; //.map(item => ({
                       // Address: item[1]  ? item[1]  : null, 
                        //Total_Persons_Count : item[0]  ? item[0] : 0
        //}));
        this.CSVButFlag = false;
        if(arrData && arrData.length > 0){
          let csvContent = papaparse.unparse(arrData);
          let csvFile = new Blob([csvContent], {type: "text/csv"});
          let downloadLink;
          downloadLink = document.createElement("a");
          var today = new Date().toJSON().slice(0,10).replace(/-/g,'/');
          downloadLink.download = "No Of Persons/House- "+ today  +".csv";
          downloadLink.href = window.URL.createObjectURL(csvFile);
          downloadLink.style.display = "none";
          document.body.appendChild(downloadLink);
          downloadLink.click();
        }else{
          this.showNoDataToExportCSV();
        }
      });
    },
    clearFilters(){
      this.selectedWard = {};
      this.selectedAssembly = {};
      this.selectedParlimentary = {};
      this.selectedBooth = {};
      this.filteredAssemblyConstituencies = [];
      this.filteredWards = [];
      this.filteredBooth = [];
      this.housPerMem = [];
      // this.filterState = "state";
      this.filterState = null;
      this.CSVButFlag = true;
      this.id = this.selectedState.id;
      this.pagination = {
        rowsPerPage: 5
      }
    }
  },
  mounted () {

  },
  beforeMount() {
    var data =  window.localStorage.getItem('loginUser');
    data = JSON.parse(data);
    this.stateAssembly = data.stateAssembly;
    this.filterState = null;
    if(!this.stateAssembly){
        this.withMobile = false;
        samparkService.getAll('StateAssembly').then((res) => {
          this.stateAssembly = res.data;
      })
    } else {

      this.selectedState = this.stateAssembly;
      this.filterDropdowns('state');
    }
  },
  notifications: {
    showMinDateError: {
      title: "Start Date must be less than End Date.",
      message: "",
      type: "error",
      timeout: 2500
    },
    showNoDataToExportCSV: {
      title: "No data available to Export CSV.",
      message: "",
      type: "error",
      timeout: 2500
    }
  }
}

</script>
