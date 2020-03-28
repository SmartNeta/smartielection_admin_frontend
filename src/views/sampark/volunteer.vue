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
  }  
</style>

<template>
     <v-container fluid grid-list-xl py-0>
       <v-card class="state-filter">
        <v-toolbar class="filter">
            <v-select label="State" :items="stateAssembly" item-text="state" item-value="id" v-model="selectedState" v-on:input="filterDropdowns('state')"></v-select>

            <v-select label="Parlimentary" :items="filteredParliamentaryConstituencies" item-text="name" item-value="id" v-model="selectedParlimentary"   v-on:input="filterDropdowns('PC')" style="margin-left: 10px"></v-select>

            <v-select label="Assembly" :items="filteredAssemblyConstituencies" item-text="name" item-value="id" v-model="selectedAssembly" v-on:input="filterDropdowns('assembly')" style="margin-left: 10px"></v-select>

            <div class="close-filter" style="margin-right: 0px;color: black;">
              <i title="clear filter" class="material-icons" @click="clearFilters()" style="margin: 20px;cursor: pointer;">cancel</i>
            </div>

         </v-toolbar>
      </v-card>
    <div class="app-card">
      <div class="app-card-content">
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search">
          </v-text-field>
        </v-card-title>
        <v-data-table
            v-bind:headers="headers"
            v-bind:items="volunteers"
            v-bind:search="search">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.mobile }}</td>
            <td class="text-xs-center">{{ props.item.firstName }}</td>
            <td class="text-xs-center">{{ props.item.lastName }}</td>
            <td class="text-xs-center">{{ props.item.assemblyConstituency ? props.item.assemblyConstituency.name : '' }}</td>
            <td class="text-xs-center">{{ props.item.status }}</td>
            <td class="text-xs-center">
            <v-btn icon @click="editVolunteer(props.item)" >
              <v-tooltip bottom>
                <v-icon  slot="activator">edit</v-icon>
                <span>Edit</span>
              </v-tooltip>
            </v-btn> 
            <v-btn icon @click="selectVolunteerForApproval(props.item)" >
              <v-tooltip bottom>
                <v-icon  slot="activator">check</v-icon>
                <span>Approve Volunteer</span>
              </v-tooltip>
            </v-btn>             
            <v-btn icon @click="removeVolunteer(props.item)" small>
              <v-tooltip bottom>
                <v-icon slot="activator">close</v-icon>
                <span>Delete</span>
              </v-tooltip>
            </v-btn>
            </td>
          </template>
          <template slot="pageText" slot-scope="{ pageStart, pageStop }">
            From {{ pageStart }} to {{ pageStop }}
          </template>
        </v-data-table>
      </div>
    </div>  

            <v-dialog v-model="editDialogFlag" max-width="650px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Update Volunteer</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="closePop" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>


                  <v-form v-model="selectedVolunteer.valid" ref="form">

                   <v-layout row wrap>
                      <v-flex xs12 sm6>
                           <v-text-field
                            label="First Name "
                            v-model="selectedVolunteer.firstName"
                          ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                           <v-text-field
                            label="Last Name"
                            v-model="selectedVolunteer.lastName"
                          ></v-text-field>
                      </v-flex>
                     </v-layout>
                     <v-layout row wrap>
                      <v-flex xs12 sm6>
                         <v-select
                          label="Gender "
                          v-model="selectedVolunteer.gender"
                          :items="genderTypes"
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm6>
                         <v-text-field
                          label="Mobile"
                          v-model="selectedVolunteer.mobile"
                          type="number"
                          :rules="[v => !!v || 'Mobile is required']"
                          required
                          counter="10"
                        ></v-text-field>
                      </v-flex>
                     </v-layout>
                     <v-layout row wrap>
                      <v-flex xs12 sm6>
                         <v-select 
                                label="Status"
                                v-model="selectedVolunteer.status"
                                :items="volunteerStatus"
                                :rules="[v => !!v || 'Status is required']"
                          ></v-select>
                      </v-flex>                      
                      <v-flex xs12 sm6>
                         <v-select 
                                label="Assembly Constituency"
                                autocomplete
                                v-model="selectedAssemblyId"
                                :items="assemblyConstituenciesData"
                                item-text="name" item-value="id"
                                :rules="[v => !!v || 'Assembly Constituency is required']"
                          ></v-select>
                      </v-flex>
                     </v-layout>
                    <v-btn @click="updateVolunteer" :disabled="!selectedVolunteer.valid" class="btn-primary">update</v-btn>
                    <v-btn @click="closePop" class="btn-secondary">cancel</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>


            <v-dialog v-model="deleteDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Delete Volunteer {{selectedVolunteer.name}} ?</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="deleteDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <p>Please sure selected Volunteer  will be removed permanently</p>
                    <v-btn @click="deleteVolunteer" class="btn-primary">Delete</v-btn>
                    <v-btn @click="deleteDialogFlag = false" class="btn-secondary">Cancel</v-btn>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>

            <v-dialog v-model="approveDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Approve Volunteer {{selectedVolunteer.name}} ?</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="approveDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <p>Please sure selected Volunteer will be approved</p>
                    <v-btn @click="approveVolunteer" class="btn-primary">Approve</v-btn>
                    <v-btn @click="approveDialogFlag = false" class="btn-secondary">Cancel</v-btn>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>

  </v-container>
</template>




<script>
  import * as samparkService from "./service";
  export default {
    data () {
      return {
      	filterListOn : '',
        selectedVolunteer: { valid: true},
        selectedAssemblyId : null,
        stateAssembly: [],  
        filteredStateAssembly: [],
        filteredParliamentaryConstituencies: [],
        filteredDistricts: [],
        filteredAssemblyConstituencies: [],
        filteredWards: [],
        citizenDynamicFileds: [],
        addButFlag: true,
        selectedState: {},
        selectedParlimentary: {},
        selectedAssembly: {},
        selectedWard: '',    
        approveDialogFlag : false,
        dialog: false,
        deleteDialogFlag: false,
        editDialogFlag: false,
        datePickerone: false,
        datePicker: false,
        volunteerStatus: ["Active", "Blocked", "Unapproved", "Loggedin", "Loggedout"],
        genderTypes: ["Male", "Female", "Other"],
        search: '',
        assemblyConstituenciesData : [],
        headers: [
          {
            text: 'Mobile Number',
            value: 'mobile',
            sortable: false,
            class: 'text-xs-center',
            width: '11.5'
          },
          {
            text: 'First name',
            value: 'firstName',
            sortable: false,
            class: 'text-xs-center',
            width: '11.5'
          },
          {
            text: 'Last name',
            value: 'lastName',
            sortable: false,
            class: 'text-xs-center',
            width: '11.5'
          },          
          {
            text: 'Assembly Constituency',
            value: 'assemblyConstituency.name',
            sortable: false,
            class: 'text-xs-center',
            width: '11.5'
          },
          {
            text: 'Status',
            value: 'status',
            sortable: false,
            class: 'text-xs-center',
            width: '11.5'
          },
          {
            text: 'Actions',
            align: 'center',
            sortable: false,
            class: 'text-xs-center',
            value: 'actions',
            width: '19.5'
          }
        ],
        volunteers: []
      }
    },
    methods: {
      closePop(){
        this.selectedVolunteer = { valid: true},
        this.editDialogFlag = false
      },
      removeVolunteer(volunteer) {
        this.selectedVolunteer = volunteer;
        this.deleteDialogFlag = true;
      },

      deleteVolunteer() {
        samparkService.deleteVolunteerById(this.selectedVolunteer.id).then((res) => {
          if (res.code == 201) {
            this.getVolunteersList();
            this.deleteDialogFlag = false;
            this.showDeleteSuccessMessage();
          } else {
            this.showDeleteErrorMessage();
          }
        })
      },

      editVolunteer(volunteer) {
        if(volunteer.status == "Deleted"){
          this.deleteVolunteerError();
          return false;
        }
        this.selectedAssemblyId = volunteer.assemblyConstituency.id;
        this.selectedVolunteer = volunteer;
        this.editDialogFlag = true;
      },

      updateVolunteer() {
        this.selectedVolunteer.assemblyConstituency = {
          id : this.selectedAssemblyId
        }
        samparkService.saveVolunteer(this.selectedVolunteer).then((res) => {
          if (res.code == 201) {
            this.getVolunteersList();
            this.showUpdateSuccessMessage();
            this.closePop();
          } else if(res.code == 134){
            this.showUpdateErrorMessage1();
          } else if(res.code == 133){
            this.showUpdateErrorMessage2();
          } else {
            this.showUpdateErrorMessage();
          }
        })
      },

      filterDropdowns(filterdOn){
        this.filterListOn = filterdOn;
        this.volunteers = [];
        if(filterdOn == "state"){
          this.filteredParliamentaryConstituencies = [];
          this.filteredDistricts = [];
          this.filteredAssemblyConstituencies = [];
          this.selectedParlimentary = null;
          this.selectedAssembly = null;
          samparkService.parliamentaryConstituencyByState(this.selectedState).then(res => {
            this.filteredParliamentaryConstituencies = res.data;
          });
          this.assemblyConstituencyByState();
        } else if(filterdOn == "PC"){
          this.filteredAssemblyConstituencies = [];
          this.selectedAssembly = null;
          samparkService.getFilteredData('AssemblyConstituency',this.selectedParlimentary).then(res => {
            this.filteredAssemblyConstituencies = res.data;
            this.assemblyConstituenciesData = res.data;
          });
        }
        this.getVolunteersList();
      },
      clear() {
        this.newVolunteer = {
          valid: false,
          firstName: "",
          lastName: "",
          gender: "",
          mobile: "",
          address: "",
        };
      },

      selectVolunteerForApproval(volunteer) {
        if(volunteer.status != 'Unapproved'){
          this.alreadyApprovedError();
          return false;
        }
        this.selectedVolunteer = volunteer;
        this.approveDialogFlag = true;
      },
      approveVolunteer(){
        samparkService.approveVolunteer(this.selectedVolunteer).then(res => {
            if(res){
              this.selectedVolunteer.status = 'Approved';  
              this.approveDialogFlag = false;
              this.volunteerApprovedSuccess();
            }else{
               this.approveDialogFlag = false;
               this.volunteerApprovedFaild();
            }
        });
      },
      clearFilters(){
        this.filteredAssemblyConstituencies = [];
        this.selectedParlimentary = null;
        this.selectedAssembly = null;
        this.volunteers = [];
        this.filterListOn = "state";
        this.getVolunteersList();
        this.assemblyConstituencyByState();
      },
      getVolunteersList(){
        if(this.filterListOn == "state"){
          samparkService.getVolunteersData(this.selectedState, "State").then(res => {
            this.volunteers = res.data.Volunteers;
          });
        }else if(this.filterListOn == "PC"){
          samparkService.getVolunteersData(this.selectedParlimentary, "ParliamentaryConstituency").then(res => {
            if(res.data && res.data.Volunteers){
              this.volunteers = res.data.Volunteers;
            }
          });
        } else {
          samparkService.getVolunteersData(this.selectedAssembly, "AssemblyConstituency").then(res => {
            this.volunteers = res.data.Volunteers;
          });          
        }
      },
      assemblyConstituencyByState(){
          samparkService.assemblyConstituencyByState(this.selectedState).then(res => {
            this.assemblyConstituenciesData = res.data;
          });
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
      alreadyApprovedError:{
        title: 'Volunteer already approved.',
        message: '',
        type: 'error',
        timeout: 2500
      },
      deleteVolunteerError:{
        title: 'You Can\'t update deleted Volunteer.',
        message: '',
        type: 'error',
        timeout: 2500
      },
      volunteerApprovedSuccess:{
        title: 'Volunteer approved successfully.',
        message: '',
        type: 'success',
        timeout: 2500
      },
      volunteerApprovedFaild:{
        title: 'Volunteer approved failed.',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showSaveSuccessMessage: {
        title: 'Volunteer saved',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showUpdateSuccessMessage: {
        title: 'Volunteer updated successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showUpdateErrorMessage: {
        title: 'Failed to updated Volunteer',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showUpdateErrorMessage1: {
        title: 'Another Volunteer already Registered to this Ward',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showUpdateErrorMessage2: {
        title: 'Mobile no. already Registered for another Ward',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showDeleteSuccessMessage: {
        title: 'Volunteer deleted successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showDeleteErrorMessage: {
        title: 'Failed to delete Volunteer',
        message: '',
        type: 'error',
        timeout: 2500
      }
    }
  }
</script>
