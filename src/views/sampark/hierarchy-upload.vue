<style type="text/css">
  @media only screen and (max-width: 1024px) {
    .full_width_100 {
      flex-basis: 100% !important;
      max-width: 100% !important;
    }
    .btnTopMargin {
      margin-top: 0px !important; 
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
                  <v-select label="State Assembly" required :items="stateAssemblys" v-model="selectedStateAssembly" item-text="state" item-value="state" :return-object="true" :rules="[v => !!v || 'Item is required']"></v-select>
                </v-flex>
                <v-flex xs12 sm5>
                    <div>
                        <file-select required v-model="csvFile"></file-select>
                    </div>
                </v-flex>
                <v-flex xs12 sm3 class="full_width_100 btnTopMargin" style="margin-top: 12px;">
                    <div>
                      <v-btn @click="uploadCsvFile" :disabled="uploadingFlag" class="btn-primary">Upload</v-btn>
                      <v-btn class="btn" @click="downloadTemplate()" style="margin-left: 5px;">
                        <span class="icon-style">
                          <i class="material-icons" style="margin: 5px 0px 0px 0px;">file_download</i>
                        </span>Template
                      </v-btn>
                    </div>
                </v-flex>
            </v-layout>
        </v-form>
      </div>
    </div>

    <div class="app-card" v-if="uploadingFlag">
      <div class="app-card-title">
        <h3>Uploading hierarchy, please wait... </h3>
        <v-progress-linear :indeterminate="true" color="green"></v-progress-linear>
      </div>
    </div>


    <div class="app-card" v-if="successFlag">
      <div class="app-card-title">
        <h3>Result</h3>
      </div>
      <div class="app-card-content">
        <v-layout row wrap>
          <v-flex xs12 md6>
            <v-card>
              <v-toolbar class="success" dark>
                <v-toolbar-side-icon></v-toolbar-side-icon>
                <v-card-title>Success</v-card-title>
              </v-toolbar>
                <template v-for="item in successList">
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="item"></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
            </v-card>
          </v-flex>
          <v-flex xs12 md6>
            <v-card>
              <v-toolbar class="bg-primary" dark>
                <v-toolbar-side-icon></v-toolbar-side-icon>
                <v-card-title>Failed</v-card-title>
              </v-toolbar>
              <v-list>
                <template v-for="item in failedList">
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="item"></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
    </div>


  </v-container>
</template>

<script>
  import * as samparkService from "./service";
  import FileSelect from './FileSelectExcel.vue'

  export default {
    components: {
      FileSelect
    },
    data () {
      return {
          uploadCsvDialog: false,
          uploadingFlag: false,
          successFlag: false,
          stateAssemblys: [],
          selectedStateAssembly: "",
          csvFile: {},
          successList: [],
          failedList: [],
      }
    },
    methods: {
      uploadCsvFile() {
        if(!this.selectedStateAssembly.id) {
          this.showStateValidationMessage();
          return
        }
        if(!this.csvFile.name || !this.csvFile.name.endsWith('.xlsx')) {
          this.showFileValidationMessage();
          return
        }
        this.uploadingFlag = true;
        samparkService.uploadHierarchyCsvFile(this.csvFile, this.selectedStateAssembly.id).then((res)=>{
          this.uploadingFlag = false
          if (res.code == 201) {
            this.successFlag = true;
            this.successList = res.data.success;
            this.failedList = res.data.failed;
            this.showUploadSuccessMessage();
          } else {
            this.showUploadErrorMessage();
          }
        })
      },
      downloadTemplate(){
        samparkService.getTemplateFile("Hierarchy_Upload_Template",'Samparka_Hierarchy_upload_template.xlsx');
      }      
    },
    beforeMount() {
      samparkService.getAll('StateAssembly').then((res) => {
          this.stateAssemblys = res.data;
      })

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
      showFileValidationMessage: {
        title: 'Please select excel(.xlsx) file',
        message: '',
        type: 'error',
        timeout: 2500
      },
    }
  }
</script>