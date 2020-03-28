<style>
  .chart6{
        width: 100%;height: auto!important;
        margin-left: 10px;
        margin-right: 20px;
  }
  @media only screen and (max-width: 824px) {
    .voter-dashboard-filter .toolbar__content {
      height: auto !important;
      display: block;
      position: relative;
      padding-top: 15px;
    }
    .gm-style-iw{
      width: 90% !important;
      max-width: 210px !important;
    }
    .gm-style-iw-d{
      max-width: 190px !important;
    }
    .voter-dashboard-filter .input-group {
      margin-left: 0px !important;
      padding: 18px 20px 0;
    }    
    .voter-dashboard-filter .flex {
      width: 100% !important;
      margin: 0;
      margin-left: 0 !important;
    }
    .voter-dashboard-filter .close-filter{
      margin-left: 0;
      color: black;
      position: absolute;
      top: 6px;
      right: 0;
      text-align: right;
      margin-right: 12px !important;
    }
    .voter-dashboard-filter .close-filter i{
      margin: 0px !important;
    }
    .voter-dashboard-filter label{
      padding: 0 25px;
    }
    svg{
      width: 100%;
    }
    .voter-dashboard-filter .toolbar{
      height: auto !important;
      margin-bottom: 20px !important;
      margin-top: 30px !important;
    }
    .bottomHeight{
      margin-bottom: 10px !important;
    }
  }
  .marker_details{
    font-weight: bolder;
    margin-bottom: 5px !important;
  }
  @media only screen and (max-width: 924px) {
    .fullWidth {
      max-width: 100% !important;
      flex-basis : 100% !important;
      margin-top: 0px !important;
    }
  }

  @media only screen and (max-width: 824px) {
    .fullWidthChart {
      max-width: 100% !important;
      flex-basis : 100% !important;
      margin-top: 0px !important;
    }
  }
</style>
<template id="fooBar">
<v-container fluid grid-list-xl py-0>
     <v-layout style="display: inherit; margin: 10px;"> 
        <v-card class="voter-dashboard-filter"> 
            <v-toolbar class="filter" style="background-color: #fff;">
                <v-select label="State" :items="stateAssembly" :return-object="true" item-text="state" item-value="id"  v-model="selectedState" v-on:input="filterCitizen('state'), getSegementaions(selectedState) ">  </v-select>
                
                <v-select label="Parlimentary" :items="filteredParliamentaryConstituencies" item-text="name" item-value="id" v-model="selectedParlimentary"   v-on:input="filterCitizen('PC')" style="margin-left: 10px"></v-select>

                <v-select label="Assembly" :items="filteredAssemblyConstituencies" :return-object="true" item-text="name" item-value="id" v-model="selectedAssembly" v-on:input="filterCitizen('assembly')" style="margin-left: 10px"></v-select>

                <v-select label="Ward" :items="filteredWards" :return-object="true" v-model="selectedWard" item-text="name" item-value="id" v-on:input="filterCitizen('ward')" style="margin-left: 10px"></v-select>

                <v-select label="Booth" :items="filteredBooth" :return-object="true" v-model="selectedBooth" item-text="no" item-value="id" v-on:input="filterCitizen('booth')" style="margin-left: 10px"></v-select>

                <div class="close-filter" style="margin-right: 0px;color: black;">
                  <i title="clear filter" class="material-icons" @click="clearFilters()" style="margin: 20px;cursor: pointer;">cancel</i>
                </div>

             </v-toolbar>
          </v-card>
           <v-card class="voter-dashboard-filter"> 
            <v-toolbar class="filter" style="background-color: #fff;">
              <v-flex style="width: 10% ; padding-left: 0px; padding-right: 3px;">
                <v-select label="Gender" :items="genderFilter" item-text="" item-value=""  v-model="selectedGender" v-on:input="addFilter()"></v-select>
              </v-flex>
              <v-flex style="width: 12% ; padding-left: 3px; padding-right: 3px;">
                <v-select label="Age" :items="ageGroup" item-text="" item-value="" v-model="selectedAge" v-on:input="addFilter()"></v-select>
              </v-flex>
              <v-flex style="width: 14% ; padding-left: 3px; padding-right: 3px;">
                <v-select label="Segmentation" :items="segmentation" v-model="slectedSegmentation" item-text="label" item-value="segmentation" v-on:input="addFilter()"></v-select>
              </v-flex>
              <v-flex style="width: 16% ; padding-left: 3px; padding-right: 3px;">
                <v-select label="Party Preference" :items="partys" :return-object="true" v-model="selectedParty" item-text="code" item-value="code" v-on:input="addFilter()"></v-select>
              </v-flex>
              <v-flex style="width: 13% ; padding-left: 3px; padding-right: 3px;">
                <v-select label="Voted" :items="votedList" v-model="selectedVoted" item-text="" item-value="" v-on:input="addFilter()"></v-select>
              </v-flex>
              <v-flex style="width: 15% ; padding-left: 3px; padding-right: 3px;">
                <v-checkbox  label="With Mobile"  v-model="withMobile" color="success"  @change="addFilter()"  hide-details></v-checkbox>
              </v-flex>
              <v-flex style="width: 3% ; padding-left: 3px !important; padding-right: 3px !important; color: black;" class="close-filter" >
                <i title="clear filter" class="material-icons" @click="clearFilter()" style="margin: 20px 0px;cursor: pointer;">cancel</i>
              </v-flex>
              <v-flex style="width: 14% ; padding-left: 3px; text-align: right; margin-right: 0;" >
                <v-btn round class="btn-primary bottomHeight" @click="openDialogFlag = true">Send Mail</v-btn>
              </v-flex>
             </v-toolbar>
          </v-card>
          <div>
            <v-layout row wrap>
              <v-flex xs12 sm6 md6 fullWidthChart>
                <div class="app-card">
                  <div class="app-card-title">
                    <h3>Voters With Mobile Vs without Mobile</h3>
                  </div>
                  <div class="app-card-content overflow-hidden">
                    <pie-chart :width="370" :height="246"></pie-chart>
                  </div>
                </div>
              </v-flex>
              <v-flex xs12 sm6 md6 fullWidthChart>
                  <div class="app-card">
                    <div class="app-card-title">
                      <h3>Segmentation</h3>
                    </div>
                    <div class="app-card-content overflow-hidden">
                      <pie-chart-segmentation id="pie-seg" :width="370" :height="246"></pie-chart-segmentation>
                    </div>
                  </div>
              </v-flex>
              <v-flex xs12 sm6 md6 fullWidthChart>
                <div class="app-card">
                  <div class="app-card-title">
                    <h3>Active volunteer vs Inactive volunteer </h3>
                  </div>
                  <div class="app-card-content overflow-hidden">
                    <pie-chart-volunteer-count :width="370" :height="246"></pie-chart-volunteer-count>
                  </div>
                </div>
              </v-flex>
              <v-flex xs12 sm6 md6 fullWidthChart>
                  <div class="app-card">
                    <div class="app-card-title">
                      <h3>Party preference</h3>
                    </div>
                    <div class="app-card-content overflow-hidden">
                      <pie-chart-party-preference :width="370" :height="246"></pie-chart-party-preference>
                    </div>
                  </div>
                </v-flex>
              <v-flex xs12 sm6 md6 fullWidthChart>
                <div class="app-card">
                  <div class="app-card-title">
                    <h3>Voters Male Vs Female</h3>
                  </div>
                  <div class="app-card-content overflow-hidden">
                    <pie-chart-male-female :width="370" :height="246"></pie-chart-male-female>
                  </div>
                </div>
              </v-flex>
              <v-flex xs12 sm6 md6 fullWidthChart>
                  <div class="app-card">
                      <div class="app-card-title">
                        <h3>Age Of Voters</h3>
                      </div>
                      <div class="app-card-content">
                        <bubble-chart id='bubble' :width="370" :height="246"></bubble-chart>
                      </div>
                    </div>  
                </v-flex>
            </v-layout>
          </div>
          <div style="margin-bottom: 50px; margin-top: 20px;">
              <div class="app-card">
                <div class="app-card-title">
                  <v-layout row wrap fullWidth>
                    <v-flex xs12 sm5 md5 style="margin-top: 20px;">
                      <h3>Location Of Voters on GIS Map</h3>
                    </v-flex>
                    <v-flex xs12 sm4 md4 fullWidth>
                        <v-text-field label="Volunteer Mobile" v-model="volunteerMobile" :rules="[v => !!v || 'Volunteer Mobile is required']" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm3 md3 fullWidth style="margin-top: 15px;">
                      <v-btn round class="btn-primary" :disabled="!volunteerMobile" @click="getVotersGoogleMapData(volunteerMobile)">Search</v-btn>
                      <v-btn round class="btn-success" @click="getVotersGoogleMapData(null)" style="margin-left: 10px;">Clear</v-btn>
                    </v-flex>
                  </v-layout>
                  <hr/>
                  <div>
                    <svg width="24%" height="60">
                      <path fill="green" stroke="white" stroke-width='5' fill-opacity="0.7" stroke-opacity="0.8" d='M32 2a20 20 0 0 0-20 20c0 18 20 39 20 39s20-21 20-39A20 20 0 0 0 32 2z' />
                      <text x="60" y="30" font-size="15" fill="green" >
                            Responded
                      </text>
                    </svg>
                    <svg width="24%" height="60">
                      <path fill="#00748f" stroke="white" stroke-width='5' fill-opacity="0.7"  stroke-opacity="0.8" d='M32 2a20 20 0 0 0-20 20c0 18 20 39 20 39s20-21 20-39A20 20 0 0 0 32 2z' />
                      <text x="60" y="30" font-size="15" fill="#00748f" >
                            Not At Home
                      </text>
                    </svg>
                    <svg width="24%" height="60">
                      <path fill="#ed9622" stroke="white" stroke-width='5' fill-opacity="0.7" stroke-opacity="0.8" d='M32 2a20 20 0 0 0-20 20c0 18 20 39 20 39s20-21 20-39A20 20 0 0 0 32 2z' />
                      <text x="60" y="30" font-size="15" fill="#ed9622" >
                            Call Back
                      </text>
                    </svg>
                    <svg width="24%" height="60">
                      <path fill="red" stroke="white" stroke-width='5' fill-opacity="0.7" stroke-opacity="0.8" d='M32 2a20 20 0 0 0-20 20c0 18 20 39 20 39s20-21 20-39A20 20 0 0 0 32 2z' />
                      <text x="60" y="30" font-size="15" fill="red" >
                            Refused
                      </text>
                    </svg>
                  </div>
                  <hr/>
                </div>

                <div class="app-card-content">
                  <gmap-map  ref="copyCardArea" id="copyCardArea" :center="startLocation" :zoom="14" style="width: 100%; height: 550px">
                    <gmap-info-window :options="infoOptions" :position="infoPosition" :opened="infoOpened" @closeclick="infoOpened=false">
                      <p class="marker_details"><b>Voter Id:</b> {{voter_id}}</p>
                      <p class="marker_details"><b>First Name:</b> {{voter_name}}</p>
                      <p class="marker_details"><b>Family Name:</b> {{voter_family_name}}</p>
                      <p class="marker_details"><b>Gender:</b> {{voter_gender}}</p>
                      <p class="marker_details"><b>Age:</b> {{voter_age}}</p> 
                      <p class="marker_details"><b>Address:</b> {{voter_address}}</p>                 
                      <p class="marker_details"><b>Serial Number:</b> {{voter_sr_no}}</p> 
                      <p class="marker_details"><b>Booth Number:</b> {{voter_booth_number}}</p>
                      <p class="marker_details"><b>Polling Booth:</b> {{voter_booth_number}}</p>
                      <p class="marker_details" style="text-transform:capitalize;"><b>Status:</b> {{responded_status}}</p>
                    </gmap-info-window>
                    <gmap-marker :icon="{path: d='M32 2a20 20 0 0 0-20 20c0 18 20 39 20 39s20-21 20-39A20 20 0 0 0 32 2z',fillColor: getMarkerColor(item), fillOpacity: .7, strokeWeight: 3, scale: 0.7, strokeOpacity: 1, strokeColor: '#ffffff'}" v-for="(item, key) in coordinates" :key="key" :position="getPosition(item)" :clickable="true" @click="toggleInfo(item, key)" />
                  </gmap-map>
                </div>
              </div>
          </div>

        </v-layout> 
         <v-dialog v-model="openDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Send Mail</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="ClosePopup" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                  <v-form v-model="emailForm.valid" ref="form">
                    <v-card-text>
                      <v-text-field style="margin-bottom: 25px;"
                        label="Email Id "
                        v-model="emailId"
                        :rules="emailRules"
                        required
                      ></v-text-field>
                      <v-btn :disabled="!emailForm.valid" @click="sendMail()" class="btn-primary">send<v-icon dark right>mail</v-icon></v-btn>
                      <v-btn @click="ClosePopup()" class="btn-secondary">cancel</v-btn>
                    </v-card-text>
                  </v-form>
              </v-card>
            </v-dialog>
        </v-container>
</template> 

<script>
import VueNotifications from 'vue-notifications'
import htmlToImage from 'html-to-image';
import { Bar } from 'vue-chartjs'
import * as samparkService from "./service";
import complaintGraph from './complaint-graph.vue'
import PieChart from './vue-echarts/PieChart'
import PieChartVolunteerCount from './vue-echarts/PieChartVolunteerCount'
import PieChartMaleFemale from './vue-echarts/PieChartMaleFemale'
import PieChartSegmentation from './vue-echarts/PieChartSegmentation'
import PieChartPartyPreference from './vue-echarts/PieChartPartyPreference'
import BubbleChart from './vue-echarts/BubbleChart'
export default {
  components: {
    PieChart,
    PieChartMaleFemale,
    BubbleChart,
    PieChartVolunteerCount,
    PieChartPartyPreference,
    PieChartSegmentation
  },
  extends: Bar,
  data: function () {
    return {
      volunteerSearchButton : true,
      volunteerMobile : null,
      infoPosition: null,
      voter_name: null,
      voter_id : null,
      voter_name : null,
      voter_family_name : null,
      voter_gender : null,
      voter_age : null,
      voter_sr_no : null,
      voter_booth_number : null,
      voter_address : null,
      responded_status: null,
      infoOpened: false,
      infoCurrentKey: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -15
        }
      },
      startLocation: {lat : 12.9253926, lng: 77.5727919},
      coordinates: {},
      stateAssembly: [],  
      emailId: '',
      emailForm : {},
      openDialogFlag: false,
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
      partys: {},
      selectedParty: {},
      selectedState: {},
      selectedDistrict: {},
      selectedAssembly: {},
      selectedParlimentary: {},
      selectedWard: {},
      slectedSegmentation: '',
      selectedBooth: {},
      withMobile: false,
      selectedGender: '',
      emailRules: [ 
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      genderFilter: ['Male','Female'],
      ageGroup: ['18-35','36-55','Greater Than 55'],
      segmentation: [],
      votedList : ['All','Voted','Not Voted'],
      selectedVoted : 'All',
      selectedAge : '',
      pagination: {},
      headers: [
        {
          text: 'House Number',
          align: 'center',
          sortable: false,
          value: 'houseNo',
          width: '20%'
        },
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
      ]
    }
  },
  methods: {
    getPosition: function(marker) {
      return {
        lat: marker.lat,
        lng: marker.lng
      }
    },
    toggleInfo: function(marker, key) {
      this.infoPosition = this.getPosition(marker)
      this.voter_id = marker.voter_id;
      this.voter_name = marker.voter_name;
      this.voter_family_name = marker.family_name;
      this.voter_gender = marker.gender;
      this.voter_age = marker.age;
      this.voter_sr_no = marker.sr_no;
      this.voter_booth_number = marker.booth_number;
      this.voter_address = marker.address;
      this.responded_status = marker.responded_status;

      if (this.infoCurrentKey == key) {
        this.infoOpened = !this.infoOpened
      } else {
        this.infoOpened = true
        this.infoCurrentKey = key
      }
    },
    getMarkerColor(marker){
      if(marker.responded_status == 'refused'){
        return 'red';
      }else if(marker.responded_status == 'responded'){
        return 'green';
      }else if(marker.responded_status == 'call back'){
        return '#ed9622';
      }else if(marker.responded_status == 'not at home'){
        return '#00748f';
      }else{
        return '#150b2b';
      }
    },
    filterCitizen(filterdOn){
      if(filterdOn == "state"){
          this.filteredParliamentaryConstituencies = [];
          this.filteredDistricts = [];
          this.filteredAssemblyConstituencies = [];
          this.filteredWards = [];
          this.filteredBooth = [];
          this.PieChartData = {
            state: this.selectedState.state,
            stateId: this.selectedState.id,
            withMobile: this.withMobile,
            Gender: this.selectedGender,
            segmentation: this.slectedSegmentation,
            ageGroup: this.selectedAge,
            partyCode: this.selectedParty.code,
            voted : this.selectedVoted,
            volunteerMobile : null
          }
          this.filterState = "state";
          this.$root.$emit('chaertMobileOrWithoutMobile',this.PieChartData);
          this.$root.$emit('filterChartOnSegmentation',this.PieChartData);
          this.$root.$emit('filterChartOnStateMaleFemale',this.PieChartData);
          this.$root.$emit('getPieChartVolunteerBystate',this.selectedState.id);
          this.$root.$emit('ScatterdOnState',this.PieChartData);
          this.$root.$emit('filterChartPartyPrefOnState',this.PieChartData);

          samparkService.parliamentaryConstituencyByState(this.selectedState.id).then(res => {
            this.filteredParliamentaryConstituencies = res.data;
          });
      } else if(filterdOn == "PC"){
        this.filteredAssemblyConstituencies = [];
        this.filteredWards = [];
        this.selectedAssembly = null;
        this.selectedWard = null;
        samparkService.getFilteredData('AssemblyConstituency',this.selectedParlimentary).then(res => {
          this.filteredAssemblyConstituencies = res.data;
        });
      } else if(filterdOn == "assembly"){
          this.PieChartData = {
            state: this.selectedState.state,
            stateId: this.selectedState.id,
            assembly: this.selectedAssembly.no,
            assmblyId: this.selectedAssembly.id,
            Gender: this.selectedGender,
            withMobile: this.withMobile,
            segmentation: this.slectedSegmentation,
            ageGroup: this.selectedAge,
            partyCode: this.selectedParty.code,
            voted : this.selectedVoted,
            volunteerMobile : null
          }
          this.filterState = "assembly";
          this.filteredWards = [];
          this.filteredBooth = [];
          this.selectedWard = {}; 
          this.$root.$emit('chaertMobileOrWithoutMobile',this.PieChartData);
          this.$root.$emit('filterChartOnSegmentation',this.PieChartData);
          this.$root.$emit('filterChartOnStateMaleFemale',this.PieChartData);
           this.$root.$emit('getPieChartVolunteerByAssembky',this.selectedAssembly.id);
          this.$root.$emit('filterChartPartyPrefOnState',this.PieChartData);
          this.$root.$emit('ScatterdOnState',this.PieChartData);
          samparkService.getFilteredData('Ward',this.selectedAssembly.id).then(res => {
            this.filteredWards = res.data;
          });
      } else if(filterdOn == "ward"){
          this.filteredBooth = [];
          this.filterState = "ward";
          this.PieChartData = {
            state: this.selectedState.state,
            stateId: this.selectedState.id,
            assembly: this.selectedAssembly.no,
            wardId: this.selectedWard.id,
            assmblyId: this.selectedAssembly.id,
            ward: this.selectedWard.no,
            Gender: this.selectedGender,
            withMobile: this.withMobile,
            segmentation: this.slectedSegmentation,
            ageGroup: this.selectedAge,
            partyCode: this.selectedParty.code,
            voted : this.selectedVoted,
            volunteerMobile : null
          }
          this.$root.$emit('chaertMobileOrWithoutMobile',this.PieChartData);
          this.$root.$emit('filterChartOnSegmentation',this.PieChartData);
          this.$root.$emit('filterChartOnStateMaleFemale',this.PieChartData);
          this.$root.$emit('filterChartPartyPrefOnState',this.PieChartData);
          this.$root.$emit('ScatterdOnState',this.PieChartData);
          samparkService.getFilteredData('Booth',this.selectedWard.id).then(res => {
            this.filteredBooth = res.data;
          });
      } else if(filterdOn == "booth"){
          this.filterState = "booth";
          this.PieChartData = {
            state: this.selectedState.state,
            stateId: this.selectedState.id,
            assembly: this.selectedAssembly.no,
            ward: this.selectedWard.no,
            wardId: this.selectedWard.id,
            booth: this.selectedBooth.id,
            Gender: this.selectedGender,
            assmblyId: this.selectedAssembly.id,
            withMobile: this.withMobile,
            segmentation: this.slectedSegmentation,
            ageGroup: this.selectedAge,
            partyCode: this.selectedParty.code,
            voted : this.selectedVoted,
            volunteerMobile : null
          }
          this.$root.$emit('chaertMobileOrWithoutMobile',this.PieChartData);
          this.$root.$emit('filterChartOnSegmentation',this.PieChartData);
          this.$root.$emit('filterChartPartyPrefOnState',this.PieChartData);
          this.$root.$emit('filterChartOnStateMaleFemale',this.PieChartData);
          this.$root.$emit('ScatterdOnState',this.PieChartData);
      }
      this.getVotersGoogleMapData();
    },
    getVotersGoogleMapData(data){
      this.PieChartData.volunteerMobile = data;
      this.volunteerMobile = data;
      samparkService.getVotersGoogleMapData(this.PieChartData).then(res => {
        if(res.length > 0){
          this.startLocation.lat = res[0].lat;
          this.startLocation.lng = res[0].lng;
        }else{
          this.volunteerSearchError();
        }
        this.coordinates = res;
      });
    },
    sendMail(){
      if(this.emailId!=null && this.emailId != ""){
          this.printDiv();
          this.openDialogFlag = false;
      } else {
        this.showEnterEmailId();
      }
    },
    ClosePopup(){
        this.openDialogFlag = false;
        this.emailId = '';
    },
    printMap(data) {
      htmlToImage.toPng(document.getElementById('copyCardArea')).then(function (dataUrl) {
        data.image6 = dataUrl.split(",")[1]; 
        samparkService.sendMailChart(data).then((res) => {
          if (res.code == 201) {
            VueNotifications.success({ title: 'success', message: 'Email Send successfully'});
          } else {
            VueNotifications.error({ title: 'error', message: 'Failed to Send Email'});
          }
          // this.emailId = '';
        });
      });
    },
    printDiv(){
        let canvas=[];
        for(var i=0; i<6; i++){
          canvas[i] = document.getElementsByClassName("chartjs-render-monitor")[i].toDataURL('image/png');
        }
        var image = [];
        for(var i=0; i < canvas.length ; i++){
          image[i] = canvas[i].split(",")[1];
        }
        var data = {
          "emailId" : this.emailId,
          "image0":image[0],
          "image1":image[1],
          "image2":image[2],
          "image3":image[3],
          "image4":image[4],
          "image5":image[5],
          "image6": "",
        }
        this.printMap(data);
    },
    addFilter(){
      this.filterCitizen(this.filterState);
    },
    clearFilter(){
      this.selectedParty = '';
      this.withMobile = false;
      this.slectedSegmentation = '';
      this.selectedAge = '';
      this.selectedGender = '';
      this.selectedVoted = 'All';
      this.filterCitizen(this.filterState);
    },
    clearFilters(){
      this.selectedWard = {};
      this.selectedAssembly = {};
      this.selectedParlimentary = {};
      this.selectedBooth = {};
      this.filteredWards = [];
      this.filteredBooth = [];
      this.filterCitizen('state');
    },
    getSegementaions(stateId){
      this.segmentation = [];
      stateId = stateId && stateId.id ? stateId.id : stateId;
      samparkService.getSegmentationsList(stateId).then((res) => {
        this.segmentation = res;
      })
    }
  },
  mounted () {
    var data =  window.localStorage.getItem('loginUser');
    data = JSON.parse(data);
    this.stateAssembly = data.stateAssembly;
    this.filterState = "state";
    if(!this.stateAssembly){
        this.withMobile = false;
        samparkService.getAll('StateAssembly').then((res) => {
          this.stateAssembly = res.data;
      })
      samparkService.getAll('Party').then((res) => {
        this.partys = res.data;
      })
    } else {
        this.selectedState = this.stateAssembly;
        this.filterCitizen('state');
        this.getSegementaions(this.stateAssembly.id);
        samparkService.partyByState(this.stateAssembly.id).then((res) => {
          this.partys = res.data;
        })
    }
  },
  notifications: {
    showMinDateError: {
      title: "Start Date must be less than End Date.",
      message: "",
      type: "error",
      timeout: 2500
    },    
    volunteerSearchError: {
      title: "GIS not mapped.",
      message: "",
      type: "error",
      timeout: 2500
    },
    showNoDataToExportCSV: {
      title: "No data available to Export CSV.",
      message: "",
      type: "error",
      timeout: 2500
    },
     showEnterEmailId: {
      title: "Pleas Enter Email Id",
      message: "",
      type: "error",
      timeout: 2500
    },
    showEmailSendsucess: {
      title: "Email Send successfully",
      message: "",
      type: "success",
      timeout: 2500
    },showEmailSendError: {
      title: "Failed to Send Email",
      message: "",
      type: "error",
      timeout: 2500
    }
  }
}
</script>