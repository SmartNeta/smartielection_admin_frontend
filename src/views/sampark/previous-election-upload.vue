<style type="text/css">
   @media only screen and (max-width: 699px) {
    .state-filter-election-uplaod .toolbar__content {
      height: auto !important;
      display: block;
      position: relative;
      padding-top: 15px;
      background-color: #fff;
    }
    .state-filter-election-uplaod .input-group {
      margin-left: 0px !important;
      padding: 18px 20px 0;
    }
    .state-filter-election-uplaod .close-filter{
      margin-left: 0;
      color: black;
      position: absolute;
      top: 6px;
      right: 0;
      margin-right: 12px !important;
    }
    .state-filter-election-uplaod .close-filter i{
      margin: 0px !important;
    }
    .state-filter-election-uplaod label{
      padding: 0 25px;
    }
    .buttonGrp{
      margin-bottom: 20px !important;
      width: 40% !important;
    }
  }
</style>

<template>
    <v-container fluid grid-list-xl py-0>
     <v-card class="state-filter-election-uplaod">
      <v-toolbar class="filter">
          <v-select label="State" :items="stateAssembly" item-text="state" item-value="id"  v-model="selectedState" v-on:input="filterDropdowns('state')"></v-select>
          
          <v-select label="Parlimentary" :items="filteredParliamentaryConstituencies" item-text="name" item-value="id" v-model="selectedParlimentary" v-on:input="filterDropdowns('PC')" style="margin-left: 10px"></v-select>

          <v-select label="Assembly" :items="filteredAssemblyConstituencies" item-text="name" item-value="id" v-model="selectedAssembly" v-on:input="filterDropdowns('assembly')" style="margin-left: 10px"></v-select>

          <v-select label="Ward" :items="filteredWards" v-model="selectedWard" item-text="name" item-value="id" v-on:input="filterDropdowns('ward')" style="margin-left: 10px"></v-select>

          <div class="close-filter" style="margin-right: 0px;color: black;">
            <i title="clear filter" class="material-icons" @click="clearFilters()" style="margin: 20px;cursor: pointer;">cancel</i>
          </div>

          <v-btn style="width: 10%; margin-left: 10px; text-align: right !important;" class="btn-primary buttonGrp" :disabled="CSVButFlag" @click="openCsvUploadPopup()">Upload CSV</v-btn>

          <v-btn style="width: 12%; margin-left: 10px; text-align: right !important;" class="btn buttonGrp" @click="downloadTemplate()">
            <span class="icon-style">
              <i class="material-icons" style="margin: 8px 0px 0px 0px; margin-left: 0px;">file_download</i>
            </span>Template
          </v-btn>
      </v-toolbar>
    </v-card>

    <div class="app-card">
      <div class="app-card-content">
        <v-data-table
            v-bind:headers="headers"
            v-bind:items="uploadedFiles"
            sort-desc="true"
            v-bind:search="search">
          <template slot="items" slot-scope="props">
            <td width="50%" class="text-xs-left">{{ props.item.fileName }}</td>
            <td class="text-xs-left">{{moment(props.item.createdDate)}}</td>
            <td class="text-xs-center">
              <v-btn icon @click="downloadCSVFile(props.item)">
                <v-tooltip bottom><v-icon slot="activator">file_download</v-icon><span>Download Log File</span></v-tooltip>
              </v-btn>
            </td>
          </template>
          <template slot="pageText" slot-scope="{ pageStart, pageStop }">
            From {{ pageStart }} to {{ pageStop }}
          </template>
        </v-data-table>
      </div>
    </div>

    <v-dialog v-model="uploadCsvDialog" max-width="600px">
      <v-card>
        <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
          <v-toolbar-title>Upload CSV File</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click.native="uploadCsvDialog = false" dark>
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text style='margin-top: 25px;'>
          <div class="custom-file">
            <input type="file" class="custom-file-input" ref="file" v-on:change="handleFileUpload()" id="csv_file" required>
            <label class="custom-file-label selected-fileName" for="csv_file"> {{csvFile != null && csvFile.name ? csvFile.name : "Choose file..."}} </label>
          </div>
        </v-card-text>
        <v-card-text>
          <div class="row">
              <v-btn @click="submitFile" class="btn-primary">submit</v-btn>
              <v-btn @click.native="uploadCsvDialog = false" class="btn btn-secondary">close</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
    import * as samparkService from "./service";
    import moment from 'moment'
    export default {
        data () {
          return {
            uploadCsvDialog : false,
            CSVButFlag : true,
            selectedState : null,
            selectedParlimentary : null,
            selectedAssembly : null,
            selectedWard : null,
            stateAssembly: [],
            filteredWards: [],
            filteredParliamentaryConstituencies: [],
            filteredAssemblyConstituencies : [],
            csvFile: {},
            uploadedFiles : [],
            search: '',
            headers: [
              {
                text: 'File Name',
                value: 'name',
                sortable: false,
              },
              {
                text: 'Upladed Date',
                value: 'time',
                sortable: false,
              },
              {
                text: 'Download CSV File',
                align: 'center',
                sortable: false,
                value: 'actions'
              }
            ]
          }
        },
        methods: {
          moment(date){
            return moment(date).format('MM/DD/YYYY hh:mm:ss');
          },

          downloadCSVFile(fileObject){
            samparkService.downloadPreviousElectionFile(fileObject);
          },
          submitFile(){
              if(!this.selectedAssembly) {
                this.showAssemblyValidationMessage();
                return;
              }
              if(this.csvFile == null || this.csvFile == ""){
                  this.showCsvFileSelectError();
                  return false;
              }
              var saveBasedOn = this.selectedWard ? "Ward" : "AssemblyConstituency";
              var id =  this.selectedWard ?  this.selectedWard : this.selectedAssembly;
              samparkService.savePreviousElectionData(this.csvFile, id, saveBasedOn).then(res => {
                  if (res.code == 201) {
                      this.uploadCsvDialog = false;
                      this.uploadedFiles = res.data;
                      this.showUploadSuccessMessage();
                  } else {
                    this.showUploadErrorMessage();
                  }
              });
          },

          openCsvUploadPopup(){
              this.uploadCsvDialog = true;
              this.csvFile = "";
              document.getElementById("csv_file").value = "";
          },

          handleFileUpload(){
              this.csvFile = this.$refs.file.files[0];
              if(this.csvFile){
                  if (!(/\.(csv)$/i.test( this.csvFile.name ))) {
                      this.showFileValidationMessage();
                      this.csvFile = null;
                      return false;
                  }
              }
          },

          filterDropdowns(filterdOn){
            this.csvData = null;
            this.CSVButFlag = true;
            if(filterdOn == "state"){
              this.filteredParliamentaryConstituencies = [];
              this.filteredAssemblyConstituencies = [];
              this.filteredWards = [];
              this.selectedWard = null;
              this.selectedAssembly = null;
              this.selectedParlimentary = null;
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
              this.selectedWard = null;
              this.CSVButFlag = false;
              samparkService.getPreviousUploadsByAssembly(this.selectedAssembly).then(res => {
                this.uploadedFiles = res;
              });
              samparkService.getFilteredData('Ward',this.selectedAssembly).then(res => {
                this.filteredWards = res.data;
              });  
            } else if(filterdOn == "ward"){
              this.CSVButFlag = false;
              samparkService.getPreviousUploadsByWard(this.selectedWard).then(res => {
                this.uploadedFiles = res;
              });
            }
          },
          downloadTemplate() {
            samparkService.getTemplateFile("Previous_Election_Data_Template",'previous_election_data_upload_template.csv');
          },
          clearFilters() {
            this.filteredAssemblyConstituencies = [];
            this.filteredWards = [];
            this.selectedWard = null;
            this.selectedAssembly = null;
            this.selectedParlimentary = null;
            this.uploadedFiles = [];
            this.CSVButFlag = true;
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
            showUploadSuccessMessage: {
                title: 'Upload success',
                message: '',
                type: 'success',
                timeout: 5000
            },
            showUploadErrorMessage: {
                title: 'Failed to upload',
                message: '',
                type: 'error',
                timeout: 10000
            },
            showStateValidationMessage: {
                title: 'Please select state',
                message: '',
                type: 'error',
                timeout: 2500
            },
            showWardValidationMessage: {
                title: 'Please select Ward',
                message: '',
                type: 'error',
                timeout: 2500
            },
            showAssemblyValidationMessage: {
                title: 'Please Select Assembly Constituency',
                message: '',
                type: 'error',
                timeout: 2500
            },            
            showFileValidationMessage: {
                title: 'Please select excel(.csv) file',
                message: '',
                type: 'error',
                timeout: 2500
            },
            showCsvFileSelectError:{
                title: "Please select CSV file to uplaod",
                message:"",
                type:"error",
                timeout:2500
            }
        }
    }
</script>