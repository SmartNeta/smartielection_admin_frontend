
<style type="text/css">
    table.v-table tbody td {
       padding: 0 10px !important
    }
    .flex, .child-flex > * {
      padding: 5px 10px !important;
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
    .buttonGrp{
      margin-bottom: 20px !important;
      width: 40% !important;
    }
  }
</style>

<template>

    <v-container fluid grid-list-xl py-0>
       <v-card class="state-filter">
        <v-toolbar class="filter">
            <v-select label="State" :items="stateAssembly" item-text="state" item-value="id" v-model="selectedState" v-on:input="filterCitizen('state')" required></v-select>

            <v-select label="Parlimentary" :items="filteredParliamentaryConstituencies" item-text="name" item-value="id" v-model="selectedParlimentary" required v-on:input="filterCitizen('PC')" style="margin-left: 10px"></v-select>

            <v-select label="Assembly" :items="filteredAssemblyConstituencies" item-text="name" item-value="id" v-model="selectedAssembly" v-on:input="filterCitizen('assembly')" style="margin-left: 10px" required></v-select>

            <v-select label="Ward" :items="filteredWards" v-model="selectedWard" item-text="name" item-value="id" v-on:input="filterCitizen('ward')" style="margin-left: 10px"></v-select>

            <div class="close-filter" style="margin-right: 0px;color: black;">
              <i title="clear filter" class="material-icons" @click="clearFilters()" style="margin: 20px;cursor: pointer;">cancel</i>
            </div>

         </v-toolbar>
      </v-card>
    <div class="app-card">
      <div class="app-card-content">
        <v-card-title>
        <v-btn class="btn-primary" :disabled="addButFlag" @click.stop="addnewC">Add New</v-btn>
        <v-btn class="btn-primary" :disabled="CSVButFlag" @click.stop="exportVoters" style="margin-left: 10px;">{{buttonLabel}}</v-btn>
         <div style="padding: 10px;"></div>
          <v-spacer></v-spacer>
<!--           <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search">
          </v-text-field> -->
          <v-btn class="btn-success" :disabled="!selectedWard" @click.stop="searchPopup = true">Advance Search</v-btn>
        </v-card-title>
        <v-data-table
            v-bind:total-items="pagination.totalItems"
            v-bind:pagination.sync="pagination"
            v-bind:headers="headers"
            v-bind:items="Citizens"
            >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.srno }}</td>
            <td class="text-xs-left">{{ props.item.voterId }}</td>
            <td class="text-xs-left">{{ props.item.firstName }}</td>
            <td class="text-xs-left">{{ props.item.familyName }}</td>
            <td class="text-xs-left">{{ props.item.gender }}</td>
            <td class="text-xs-left">{{ props.item.age }}</td>
            <td class="text-xs-left">{{ props.item.mobile }}</td>
            <td class="text-xs-left">{{ props.item.acHash }}</td>
            <td class="text-xs-left">{{ props.item.booth.name }}</td>
            <td class="text-xs-center" width="40px">
              <v-btn icon @click="editCitizen(props.item)" ><v-tooltip bottom><v-icon  slot="activator">edit</v-icon>  <span>Edit</span>
                    </v-tooltip></v-btn>
              <v-btn icon @click="removeCitizen(props.item)" small><v-tooltip bottom><v-icon slot="activator">close</v-icon><span>Delete</span>
                    </v-tooltip></v-btn>
            </td>
          </template>
          <template slot="pageText" slot-scope="{ pageStart, pageStop }">
            From {{ pageStart }} to {{ pageStop }}
          </template>
        </v-data-table>
      </div>
    </div>  
            <v-dialog v-model="dialog" max-width="650px">
                <v-toolbar style="flex: 0 0 ;" class="bg-primary">
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="closeSavePop" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                      <v-tabs 
                          color="bg-primary"
                          dark
                          v-model="active"
                          slider-color="yellow"
                        >
                        <v-tab
                          key="1"
                          href="#tab-1"
                          ripple>
                           Add new Citizen
                        </v-tab>
                        <v-tab
                          key="2"
                          href="#tab-2"
                          ripple>
                           Citizen Dynamic Fields
                        </v-tab>
                         <v-tab-item
                            key="1"
                            id="tab-1"
                          >
                        <v-card>
                           <v-card-text>
                                <v-form v-model="newCitizen.valid" ref="form">
                                <v-layout row wrap>
                                    <v-flex xs12 sm6>
                                        <v-text-field
                                          label="Voter Id "
                                          v-model="newCitizen.voterId"
                                          :rules="[v => !!v || 'Voter Id is required']"
                                          required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                        <v-text-field
                                          label="Sr. Number  "
                                          v-model="newCitizen.srno"
                                        ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                  <v-layout row wrap>
                                    <v-flex xs12 sm6>
                                        <v-text-field
                                          label="First Name "
                                          v-model="newCitizen.firstName"
                                          :rules="[v => !!v || 'First Name is required']"
                                          required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        label="Father/Hasband Name "
                                        v-model="newCitizen.familyName"
                                        :rules="[v => !!v || 'Father/Hasband Name is required']"
                                        required
                                      ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                  <v-layout row wrap>
                                      <v-flex xs12 sm6>
                                      <v-select
                                        label="Gender "
                                        v-model="newCitizen.gender"
                                        :items="genderTypes"
                                        :rules="[v => !!v || 'Gender is required']"
                                        required
                                      ></v-select>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        label="Age "
                                        v-model="newCitizen.age"
                                        type="number"
                                        :rules="[v => !!v || 'Age is required']"
                                        required
                                      ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                  <v-layout row wrap>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        label="Mobile"
                                        v-model="newCitizen.mobile"
                                        type="number"
                                        :counter="10"
                                      ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        label="AC#"
                                        v-model="newCitizen.acHash"
                                      ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                  <v-layout row wrap>
                                    <v-flex xs12 sm12>
                                      <v-text-field
                                        label="Address "
                                        v-model="newCitizen.address"
                                        :rules="[v => !!v || 'Address is required']"
                                        required
                                      ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                  <v-layout row wrap>
                                    <v-flex xs12 sm6>
                                      <v-select
                                        label="Booth " autocomplete  required
                                        :items="booths"
                                        v-model="newCitizen.booth"
                                        item-text="name" item-value="name"
                                        :return-object="true"
                                        :rules="[v => !!v || 'Ward is required']"
                                        required
                                      ></v-select>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                    </v-flex>
                                  </v-layout>
                                  <v-layout row wrap>
                                    <v-flex xs12 sm6>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                        <v-btn @click="next"  :disabled="!newCitizen.valid" class="btn-primary">Next</v-btn>
                                       <v-btn @click="closeSavePop" class="btn-secondary">cancel</v-btn>
                                    </v-flex>
                                  </v-layout>
                                   </v-form>
                            </v-card-text>
                          </v-card>
                      </v-tab-item>
                        <v-tab-item
                            key="2"
                            id="tab-2"
                          >
                        <v-card>
                          <v-card-text v-if="citizenDynamicFileds.length > 0">
                                <v-form v-model="newCitizen.valid" ref="form">
                                    <v-layout row wrap>
                                    <v-flex xs12 sm6>
                                      <v-text-field 
                                        :label="citizenDynamicFileds[0].label"
                                        v-model="newCitizen.cust1"
                                      ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        :label="citizenDynamicFileds[1].label"
                                        v-model="newCitizen.cust2"
                                      ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                  <v-layout row wrap>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        :label="citizenDynamicFileds[2].label"
                                        v-model="newCitizen.cust3"
                                      ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        :label="citizenDynamicFileds[3].label"
                                        v-model="newCitizen.cust4"
                                      ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                  <v-layout row wrap>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        :label="citizenDynamicFileds[4].label"
                                        v-model="newCitizen.cust5"
                                      ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        :label="citizenDynamicFileds[5].label"
                                        v-model="newCitizen.cust6"
                                      ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                  <v-layout row wrap>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        :label="citizenDynamicFileds[6].label"
                                        v-model="newCitizen.cust7"
                                      ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        :label="citizenDynamicFileds[7].label"
                                        v-model="newCitizen.cust8"
                                      ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                  <v-layout row wrap>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        :label="citizenDynamicFileds[8].label"
                                        v-model="newCitizen.cust9"
                                      ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        :label="citizenDynamicFileds[9].label"
                                        v-model="newCitizen.cust10"
                                      ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                  <v-layout row wrap>
                                    <v-flex xs12 sm6>
                                      <v-btn @click="saveNewCitizen" :disabled="!newCitizen.valid" class="btn-primary">submit</v-btn>
                                      <v-btn @click="clear" class="btn-secondary">clear</v-btn>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                    </v-flex>
                                  </v-layout>
                       </v-form>   
                   </v-card-text>
                 </v-card>
               </v-tab-item>
             </v-tabs>
            </v-dialog>

            <v-dialog v-model="editDialogFlag" max-width="650px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="closePop" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-tabs 
                    color="bg-primary"
                    dark
                    v-model="active"
                    slider-color="yellow"
                  >
                  <v-tab
                    key="1"
                    href="#tab-1"
                    ripple>
                      Update Citizen
                  </v-tab>
                  <v-tab
                    key="2"
                    href="#tab-2"
                    ripple>
                      Citizen Dynamic Fields
                  </v-tab>
                    <v-tab-item
                      key="1"
                      id="tab-1"
                    >
                <v-card-text>
                <v-form v-model="selectedCitizen.valid" ref="form">
                   <v-layout row wrap>
                      <v-flex xs12 sm6>
                           <v-text-field
                            label="Voter Id "
                            v-model="selectedCitizen.voterId"
                            :rules="[v => !!v || 'Voter Id is required']"
                            required
                           ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                           <v-text-field
                            label="Sr. Number "
                            v-model="selectedCitizen.srno"
                          ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                       <v-flex xs12 sm6>
                           <v-text-field
                            label="First Name "
                            v-model="selectedCitizen.firstName"
                            :rules="[v => !!v || 'First Name is required']"
                            required
                          ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                         <v-text-field
                          label="Father/Hasband Name "
                          v-model="selectedCitizen.familyName"
                          :rules="[v => !!v || 'Family Name is required']"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                       <v-flex xs12 sm6>
                        <v-select
                          label="Gender "
                          v-model="selectedCitizen.gender"
                          :items="genderTypes"
                          :rules="[v => !!v || 'Gender is required']"
                          required
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field
                          label="Age "
                          v-model="selectedCitizen.age"
                          type="number"
                          :rules="[v => !!v || 'Age is required']"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                       <v-flex xs12 sm6>
                         <v-text-field
                          label="Mobile"
                          v-model="selectedCitizen.mobile"
                          type="number"
                          :counter="10"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                         <v-text-field
                          label="AC#"
                          v-model="selectedCitizen.acHash"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 sm12>
                         <v-text-field
                          label="Address "
                          v-model="selectedCitizen.address"
                          :rules="[v => !!v || 'Address is required']"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 sm6>
                         <v-select
                          label="Booth " autocomplete  required
                          :items="booths"
                          v-model="selectedCitizen.booth"
                          item-text="name" item-value="name"
                          :return-object="true"
                          :rules="[v => !!v || 'Ward is required']"
                          required
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm6>    
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 sm6>
                      </v-flex>
                          <v-flex xs12 sm6>
                              <v-btn @click="next" :disabled="!selectedCitizen.valid" class="btn-primary">Next</v-btn>
                              <v-btn @click="closePop" class="btn-secondary">cancel</v-btn>
                          </v-flex>
                     </v-layout>
                    </v-form>
                    </v-card-text>
                   </v-tab-item>
                  <v-tab-item
                            key="2"
                            id="tab-2"
                          >
                        <v-card-text v-if="citizenDynamicFileds.length > 0">
                          <v-form v-model="selectedCitizen.valid" ref="form">
                                    <v-layout row wrap>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        :label="citizenDynamicFileds[0].label"
                                        v-model="selectedCitizen.cust1"
                                      ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        :label="citizenDynamicFileds[1].label"
                                        v-model="selectedCitizen.cust2"
                                      ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                  <v-layout row wrap>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        :label="citizenDynamicFileds[2].label"
                                        v-model="selectedCitizen.cust3"
                                      ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        :label="citizenDynamicFileds[3].label"
                                        v-model="selectedCitizen.cust4"
                                      ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                  <v-layout row wrap>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        :label="citizenDynamicFileds[4].label"
                                        v-model="selectedCitizen.cust5"
                                      ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        :label="citizenDynamicFileds[5].label"
                                        v-model="selectedCitizen.cust6"
                                      ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                  <v-layout row wrap>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        :label="citizenDynamicFileds[6].label"
                                        v-model="selectedCitizen.cust7"
                                      ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        :label="citizenDynamicFileds[7].label"
                                        v-model="selectedCitizen.cust8"
                                      ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                  <v-layout row wrap>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        :label="citizenDynamicFileds[8].label"
                                        v-model="selectedCitizen.cust9"
                                      ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                      <v-text-field
                                        :label="citizenDynamicFileds[9].label"
                                        v-model="selectedCitizen.cust10"
                                      ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                
                              <v-layout row wrap>
                                <v-flex xs12 sm6>
                                  <v-btn @click="updateCitizen" :disabled="!selectedCitizen.valid" class="btn-primary">update</v-btn>
                                  <v-btn @click="closePop" class="btn-secondary">cancel</v-btn>
                                </v-flex>
                                <v-flex xs12 sm6>
                                </v-flex>
                              </v-layout>

                            </v-form>
                        </v-card-text>
                      </v-tab-item>
                    </v-tabs>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>


            <v-dialog v-model="searchPopup" max-width="550px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Advanced Search</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="searchPopup = false,clearSearchFilter()" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-layout row wrap pb-3>
                  <v-flex xs12 sm6>
                       <v-text-field
                        label="Voter Id"
                        v-model="advancedSearch.voterId"
                       ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                       <v-text-field
                        label="Sr. Number"
                        v-model="advancedSearch.srno"
                      ></v-text-field>
                  </v-flex>                  
                  <v-flex xs12 sm6>
                       <v-text-field
                        label="First Name"
                        v-model="advancedSearch.firstName"
                      ></v-text-field>
                  </v-flex>                  
                  <v-flex xs12 sm6>
                       <v-text-field
                        label="Family Name"
                        v-model="advancedSearch.familyName"
                      ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                       <v-text-field
                        label="Mobile Number"
                        v-model="advancedSearch.mobile"
                      ></v-text-field>
                  </v-flex>   
                  <v-flex xs12 sm12>
                      <v-btn @click="advanceSearch" :disabled="!advancedSearch.voterId && !advancedSearch.srno &&  !advancedSearch.firstName &&  !advancedSearch.familyName &&  !advancedSearch.mobile" class="btn-primary">Search</v-btn>
                      <v-btn @click="searchPopup = false, clearSearchFilter()" class="btn-secondary">cancel</v-btn>
                  </v-flex>
                </v-layout>
               
              </v-card>
            </v-dialog>


            <v-dialog v-model="deleteDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Delete Citizen {{selectedCitizen.firstName}} ?</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="deleteDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <p>Please sure selected Citizen will be removed permanently</p>
                    <v-btn @click="deleteCitizen" class="btn-secondary">delete</v-btn>
                    <v-btn @click="deleteDialogFlag = false" class="btn-primary">cancel</v-btn>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>


          
        <!--  <div id="loader">
            <div id="overlay-back"></div>
            <div id="overlay">
              <div id="dvLoading">
                   <v-progress-circular indeterminate :size="70" :width="7" color="#FF9934"></v-progress-circular>
              </div>
            </div>
          </div> -->

  </v-container>
</template>

<script>
import * as samparkService from "./service";
import * as papaparse from "./papaparse";

export default {
   watch: {
    pagination: {
      async handler () {
        if(this.selectedWard || this.selectedAssembly) {
          if(this.pagination.page == null){
            this.pagination.page = 1;
          }
          var id = this.selectedWard ? this.selectedWard : this.selectedAssembly;          
          var filterBy = this.selectedWard ? "ward" : "assembly";          
          samparkService.getCitizensData(id, filterBy ,this.pagination.page,this.pagination.rowsPerPage,this.advancedSearch).then(res => {
            this.Citizens = res.data.citizens;
            if(this.pagination.rowsPerPage > 0){
                this.pagination.totalItems =res.data.totalElements;
            }
          });
        }
      },
      deep: true
    }
  },
  data() {
    return {

      isSuperAdmin : false,      
      stateAssembly: [],  
      filteredStateAssembly: [],
      filteredParliamentaryConstituencies: [],
      filteredAssemblyConstituencies: [],
      filteredWards: [],
      tabs: ["Add new Citizen", "Citizen Dynamic Fields"],
      tabs3: ["Update Citizen","Citizen Dynamic Fields"],
      active: null,
      citizenDynamicFileds: [],
      selectedState: {},
      selectedParlimentary: {},
      selectedAssembly: null,
      selectedWard: '',
      addButFlag: true,
      CSVButFlag: true,
      buttonLabel : "Export Voters",
      filteredCitizens:[],
      selectedCitizen: {valid: true},
      booths: [],
       pagination: {
        },
      newCitizen: {
          valid: false,
          voterId: "",
          srno: "",
          firstName: "",
          familyName: "",
          gender: "",
          age: "",
          mobile: "",
          acHash: "",
          address: "",
          booth: ""
      },
      dialog: false,
      editDialogFlag: false,
      deleteDialogFlag: false,
      datePickerone: false,
      datePicker: false,
      searchPopup : false,
      advancedSearch : { voterId : null, firstName : null, familyName : null, mobile : null, srno : null},
      genderTypes: ["Male", "Female", "Other"],

        search: '',
        headers: [
          {
            text: 'Sr No',
            value: 'srno',
            width: '5%'
          },
          {
            text: 'Voter Id',
            value: 'voterId',
            width: '6%'
          },
          {
            text: 'First Name',
            value: 'firstName',
            width: '11%'
          },
          {
            text: 'Father/Hasband Name',
            value: 'familyName',
            width: '11%'
          },
          {
            text: 'Gender',
            value: 'gender',
            width: '11%'
          },
          {
            text: 'Age',
            value: 'age',
            width: '5%'
          },
          {
            text: 'Mobile',
            value: 'mobile',
            width: '11%'
          },
          {
            text: 'AC#',
            value: 'acHash',
            width: '6%'
          },
          {
            text: 'Booth',
            value: 'booth.name',
            width: '11%'
          },
          {
            text: 'Actions',
            align: 'center',
            sortable: false,
            value: "actions",
            class: "text-xs-center",
            width: '40%'
          }
        ],
        Citizens: []
      }
    },
    methods: {
      exportVoters(){
        this.CSVButFlag= true;
        var id = this.selectedWard ? this.selectedWard : this.selectedAssembly ? this.selectedAssembly : this.selectedParlimentary ? this.selectedParlimentary : this.selectedState;
        var filterBy = this.selectedWard ? "Ward" : this.selectedAssembly ? "assembly" : this.selectedParlimentary ? "pc" : "state";
        
        samparkService.getVotersCSV(id,filterBy).then((res) => {
          // let csvContent = papaparse.unparse(res);
          this.CSVButFlag= false;
           samparkService.getVotersDataCSV(filterBy);
          // let csvFile = new Blob([csvContent], {type: "text/csv"});
          // let downloadLink;
          // downloadLink = document.createElement("a");
          // var today = new Date().toJSON().slice(0,10).replace(/-/g,'/');
          // downloadLink.download = "Voters- "+ today  +".csv";
          // downloadLink.href = window.URL.createObjectURL(csvFile);
          // downloadLink.style.display = "none";
          // document.body.appendChild(downloadLink);
          // downloadLink.click();
        });
      },

      addnewC(){
         this.clear();
         this.dialog = true;
      },
      
      next() {
      this.active = "tab-2";
    },

     closeSavePop(){
       this.clear();
        this.dialog = false;
         this.active = "tab-1";
      },

      closePop(){
        this.selectedCitizen= { valid: true};
        this.editDialogFlag = false;
         this.active = "tab-1";
      },

      removeCitizen(citizen) {
        this.selectedCitizen = citizen;
        this.deleteDialogFlag = true;
      },

      deleteCitizen() {
      samparkService.deleteById("Citizen", this.selectedCitizen.id).then((res) => {
          if (res.code == 201) {
            this.Citizens.splice(this.Citizens.indexOf(this.selectedCitizen), 1);
            this.deleteDialogFlag = false;
            this.showDeleteSuccessMessage();
          } else {
            this.showDeleteErrorMessage();
          }
        })
      },

      editCitizen(citizen) {
        this.selectedCitizen = citizen;
        this.editDialogFlag = true;
      },

      updateCitizen() {
        samparkService.update('Citizen',this.selectedCitizen).then((res) => {
          if (res.code == 201) {
            this.editDialogFlag = false;
            this.showUpdateSuccessMessage();
            this.closePop();
          } else {
            this.showUpdateErrorMessage();
          }
        })
      },

      saveNewCitizen() {
        samparkService.saveNew('Citizen',this.newCitizen).then((res) => {
          if (res.code == 201) {
            this.dialog = false;
            this.showSaveSuccessMessage();
            this.active = "tab-1";
            this.clear();
            this.filterCitizen('ward');
          } 
           else if(res.code == 500) {
            this.showSaveErrorMessage();
          } else if(res.code == 11540) {
            this.userNameExistsMessage();
          }
        })

      },
      clear() {
        this.newCitizen = {
          valid: false,
          voterId: "",
          srno: "",
          firstName: "",
          familyName: "",
          gender: "",
          age: "",
          mobile: "",
          acHash: "",
          address: "",
          booth: ""
        };
        this.selectedCitizen= "";
    },
    showLoader(){
     // document.getElementById("loader").style.display = "block";
    },
    hideLoader(){
     // document.getElementById("loader").style.display = "none";
    },
    filterCitizen(filterdOn){
      this.Citizens = [];
      this.addButFlag= true;
      this.CSVButFlag= false;
      if(filterdOn == "state"){
        this.CSVButFlag= true;
        this.filteredParliamentaryConstituencies = [];
        this.filteredAssemblyConstituencies = [];
        this.filteredWards = [];
        this.selectedParlimentary = null;
        this.selectedAssembly = null;
        this.selectedWard = null;
        samparkService.parliamentaryConstituencyByState(this.selectedState).then(res => {
          this.filteredParliamentaryConstituencies = res.data;
        });
      } else if(filterdOn == "PC"){
        this.CSVButFlag= true;
        this.filteredAssemblyConstituencies = [];
        this.filteredWards = [];
        this.selectedAssembly = null;
        this.selectedWard = null;
        samparkService.getFilteredData('AssemblyConstituency',this.selectedParlimentary).then(res => {
          this.filteredAssemblyConstituencies = res.data;
        });
      } else if(filterdOn == "assembly"){
        this.filteredWards = [];
        this.selectedWard = null;
        samparkService.getFilteredData('Ward',this.selectedAssembly).then(res => {
          this.filteredWards = res.data;
        });
        this.pagination = {
            rowsPerPage: 5,
        }        
      } else if (filterdOn == "ward"){
        if(this.selectedWard){
          samparkService.getFilteredData('Booth',this.selectedWard).then(res => {
          this.booths = res.data;
            if(this.booths != null){
              this.addButFlag = false;
            }
          });
          this.pagination = {
            rowsPerPage: 5,
          }
        }
      }
    },
    advanceSearch () {
      this.advancedSearch['selectedState'] = this.selectedState;
      this.advancedSearch['selectedParlimentary'] = this.selectedParlimentary;
      this.advancedSearch['selectedAssembly'] = this.selectedAssembly;
      this.advancedSearch['selectedWard'] = this.selectedWard;
      this.pagination = {
        rowsPerPage: 5,
      }
      this.searchPopup = false;
    },
    clearFilters(){
      this.filteredAssemblyConstituencies = [];
      this.filteredWards = [];
      this.selectedParlimentary = null;
      this.selectedAssembly = null;
      this.selectedWard = null;
      this.addButFlag = true;
      this.Citizens = [];
      this.CSVButFlag= true;
      if(this.isSuperAdmin) {
        this.selectedState = {};
        this.filteredParliamentaryConstituencies = [];
      }
    },
    clearSearchFilter() {
      this.advancedSearch=  { voterId : null, firstName : null, familyName : null, mobile : null, srno : null};
      this.pagination = {
        rowsPerPage: 5,
      }
    }
  },
  beforeMount() {
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
      this.filterCitizen('state');
    } 
    samparkService.getAll('CitizenDynamicFileds').then((res) => {
          this.citizenDynamicFileds = res.data;
    })
  },
  notifications: {
    showSaveSuccessMessage: {
      title: "Citizen saved",
      message: "",
      type: "success",
      timeout: 2500
    },
    showSaveErrorMessage: {
      title: "Failed to save Citizen",
      message: "",
      type: "error",
      timeout: 2500
    },
    showUpdateSuccessMessage: {
      title: "Citizen updated successfully",
      message: "",
      type: "success",
      timeout: 2500
    },
    showUpdateErrorMessage: {
      title: "Failed to updated Citizen",
      message: "",
      type: "error",
      timeout: 2500
    },
    showDeleteSuccessMessage: {
      title: "Citizen deleted successfully",
      message: "",
      type: "success",
      timeout: 2500
    },
    showDeleteErrorMessage: {
      title: "Failed to delete Citizen",
      message: "",
      type: "error",
      timeout: 2500
    },
    userNameExistsMessage: {
      title: 'Voter Id Already Exists',
      message: '',
      type: 'error',
      timeout: 2500
    }
  }
};

</script>
