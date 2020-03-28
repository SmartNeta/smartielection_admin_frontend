<style>
  .flex, .child-flex > * {
      padding: 0px 10px !important;
  }
    .theme--light .toolbar, .application .theme--light.toolbar {
      color: #FFF;
  }

  @media only screen and (max-width: 500px) {
    .state-filter .toolbar__content {
      height: auto !important;
      display: block;
      position: relative;
      padding-top: 15px;
      background-color: #fff;
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
    .page_bottom{
      margin-bottom: 5.25rem !important;
    }
  }
</style>

<template>
     <v-container fluid grid-list-xl py-0>
       <v-card class="state-filter">
        <v-toolbar class="filter">
            <v-select label="State" :items="stateAssembly" item-text="state" item-value="id"  v-model="selectedState" v-on:input="filterDropdowns('state')"></v-select>

            <v-select label="Parlimentary" :items="filteredParliamentaryConstituencies" item-text="name" item-value="id" v-model="selectedParlimentary" v-on:input="filterDropdowns('PC')" style="margin-left: 10px"></v-select>

            <v-select label="Assembly" :items="filteredAssemblyConstituencies" item-text="name" item-value="id" v-model="selectedAssembly" v-on:input="filterDropdowns('assembly')" style="margin-left: 10px"></v-select>

            <div class="close-filter" style="margin-right: 0px;color: black;">
              <i title="clear filter" class="material-icons" @click="clearFilters()" style="margin: 20px;cursor: pointer;">cancel</i>
            </div>

         </v-toolbar>
      </v-card>



    <div class="app-card page_bottom">
      <v-layout row wrap>
                <v-flex xs12 sm7>

                        <div style="margin: 20px;">
                         <div style="padding-top: 25;">
                            <h6>Header Text</h6>
                          </div>
                          <textarea v-model="notification.header" :rows="2" required placeholder="Enter Header" style="width: 100%;background-color: #fff;border: 1px solid #DDE6F3;"></textarea>
                        </div>

                        <div style="margin: 20px;">
                         <div style="padding-top: 25;">
                            <h6>Body</h6>
                          </div>
                          <textarea v-model="notification.body" :rows="6" required placeholder="Enter Text" style="width: 100%;background-color: #fff;border: 1px solid #DDE6F3;"></textarea>
                        </div>
                        <div style="margin: 20px;">
                         <div style="padding-top: 25;">
                            <h6>Add Link</h6>
                          </div>
                          <textarea v-model="notification.webLink" :rows="1" required placeholder="Add Link" style="width: 100%;background-color: #fff;border: 1px solid #DDE6F3;"></textarea>
                        </div>
                        <div style="margin: 20px;">
                         <div style="padding-top: 25;">
                              <v-btn @click="send" class="btn-primary">send</v-btn>
                          </div>
                        </div>

              </v-flex>
      </v-layout>
    </div>


  </v-container>
</template>


<script>
  import * as samparkService from "./service";
  export default {
    data () {
      return {
        notification:{
          header : "",
          body : "",
          webLink : "",
        },
        stateAssembly: [],  
        filteredParliamentaryConstituencies: [],
        filteredAssemblyConstituencies: [],
        loader: false,
        selectedState: null,
        selectedParlimentary: null,
        selectedDistrict: null,
        selectedAssembly: null,
      }
    },
    methods: {

      filterDropdowns(filterdOn){
      if(filterdOn == "state"){
        this.filteredParliamentaryConstituencies = [];
        this.filteredAssemblyConstituencies = [];
        this.selectedDistrict = null;
        this.selectedParlimentary = null;
        this.selectedAssembly = null;
        samparkService.parliamentaryConstituencyByState(this.selectedState).then(res => {
            this.filteredParliamentaryConstituencies = res.data;
        });
      } else if(filterdOn == "PC") {
        this.filteredAssemblyConstituencies = [];
        this.selectedAssembly = null;
        samparkService.getFilteredData('AssemblyConstituency',this.selectedParlimentary).then(res => {
          this.filteredAssemblyConstituencies = res.data;
        });
      }
    },
    send() {
      if(this.notification.header && this.notification.body) {
        if(this.selectedParlimentary || this.selectedAssembly) {
          this.notification.parliamentaryConstituencyId = this.selectedParlimentary;
          this.notification.assemblyConstituencyId = this.selectedAssembly;
          samparkService.sendVolunteerNotification(this.notification).then((res) => {
            this.notification.header = null;
            this.notification.body = null;
            this.notification.webLink = null;
            this.showSendSuccessMessage();
          })
        } else {
              this.showValidationMessage();
        }
      } else {
          this.showValidationMessage1();
      }
    },
    clearFilters(){
      this.filteredAssemblyConstituencies = [];
      this.selectedParlimentary = null;
      this.selectedAssembly = null;
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
    showSendSuccessMessage: {
      title: 'Notification sent',
      message: '',
      type: 'success',
      timeout: 2500
    },
    showValidationMessage: {
      title: 'Please select Parliamentary Constituency or Assembly Constituency',
      message: '',
      type: 'error',
      timeout: 2500
    },
    showValidationMessage1: {
      title: 'Please enter notification header and body text',
      message: '',
      type: 'error',
      timeout: 2500
    }
  }

}
</script>
