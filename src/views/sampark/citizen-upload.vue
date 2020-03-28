<style type="text/css">
  .full_width_buttons {
    margin-top: 20px; 
    text-align: right !important; 
    word-spacing: 15px;
  }
  @media only screen and (max-width: 768px) {
    .full_width_buttons {
      flex-basis: 100% !important;
      max-width: 100% !important;
      margin-top: 0px;
      word-spacing: 0px;
    }
  }
  @media only screen and (max-width: 450px) {
    .btn__content{
      padding: 0 3px !important;
    }
  }
</style>

<template>
    <v-container fluid grid-list-xl py-0>
    <div class="app-card">
      <div class="app-card-content">
          <v-form ref="form">
            <v-layout row wrap>
                <v-flex xs12 sm4>
                  <v-select
                      label="State Assembly" required
                      :items="stateAssemblys"
                      v-model="selectedStateAssembly"
                      v-on:input="refreshData()"
                      item-text="state" item-value="state"
                      :return-object="true"
                      :rules="[v => !!v || 'Item is required']"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm8 class="full_width_buttons">
                        <v-btn class="btn-primary" @click="openCsvUploadPopup()">Upload CSV</v-btn> 
                        <v-btn class="btn-success" @click="refreshData()">Refresh</v-btn> 
                        <v-btn class="btn" @click="downloadTemplate()">
                          <span class="icon-style">
                            <i class="material-icons" style="margin: 5px;margin-left: 0px;">file_download</i>
                          </span>Template
                        </v-btn>
                </v-flex>
            </v-layout>
        </v-form>
      </div>
    </div>

    <div class="app-card">
      <div class="app-card-content">
        <v-data-table
            v-bind:headers="headers"
            v-bind:items="uploadedFiles"
            sort-desc="true"
            v-bind:search="search">
          <template slot="items" slot-scope="props">
            <td width="50%" class="text-xs-left">{{ replaceFileName(props.item.path) }}</td>
            <td class="text-xs-left">{{moment(props.item.createdDate)}}</td>
            <td class="text-xs-left">{{ props.item.status }}</td>
            <td class="text-xs-center">
              <v-btn icon @click="downloadLogFile(props.item)">
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
            <input type="file" class="custom-file-input"  ref="file" v-on:change="handleFileUpload()" id="csv_file" required>
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
            successFlag: false,
            stateAssemblys: [],
            selectedStateAssembly: "",
            csvFile: {},
            uploadedFiles : [],
            search: '',
            pagination: {},
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
                text: 'Status',
                value: 'status',
                sortable: false
              },
              {
                text: 'Download Log File',
                align: 'left',
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
            replaceFileName(file){
              var fileName = file.split(this.selectedStateAssembly.state + '/')[1];
              if(!fileName){
                fileName = file.split(this.selectedStateAssembly.state + '\\')[1];
              }
              return fileName;
            },
            refreshData(){
              if(this.selectedStateAssembly && this.selectedStateAssembly.state){
                samparkService.getCitizenCSVFilesByState(this.selectedStateAssembly.state).then((res) => {
                  this.uploadedFiles = res.data;
                });                
              } else{
                this.showStateValidationMessage();
              }
            },
            downloadLogFile(fileObject){
              samparkService.getCitizenLogFile(fileObject,this);
            },
            submitFile(){
                if(!this.selectedStateAssembly || !this.selectedStateAssembly.state) {
                  this.showStateValidationMessage();
                  return
                }   

                if(this.csvFile == null || this.csvFile == ""){
                    this.showCsvFileSelectError();
                    return false;
                }
                samparkService.saveCsvFile(this.csvFile, this.selectedStateAssembly.state).then(res => {
                    if (res.code == 201) {
                        this.uploadCsvDialog = false;
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
            downloadTemplate(){
              samparkService.getTemplateFile("Voter_Upload_Template",'voter_upload_template.csv');
            }
        },
        beforeMount() {
          var data =  window.localStorage.getItem('loginUser');
          data = JSON.parse(data);
          this.stateAssemblys = data.stateAssembly;
         
          if(!this.stateAssemblys){
              samparkService.getAll('StateAssembly').then((res) => {
                this.stateAssemblys = res.data;
            })
          } else {
             this.selectedStateAssembly = data.stateAssembly;
             this.refreshData();
          }
        },
        notifications: {
            showUploadSuccessMessage: {
                title: 'Voters CSV Uploaded successfully',
                message: '',
                type: 'success',
                timeout: 2500
            },
            showUploadErrorMessage: {
                title: 'Failed to upload',
                message: '',
                type: 'error',
                timeout: 2500
            },
            showStateValidationMessage: {
                title: 'Please select state',
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
            },
            showLogFileError:{
                title: "Log File Not Present",
                message:"",
                type:"error",
                timeout:1500
            }
        }
    }
</script>