<style>
  .theme--light .toolbar, .application .theme--light.toolbar {
    color: #FFF;
}
</style>
<template>
    <v-container fluid grid-list-xl py-0>
    <div class="app-card">
      <div class="app-card-content">
        <v-card-title>
        <v-btn class="btn-primary" @click.stop="createDialogFlag = true">Add New</v-btn>
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
            v-bind:items="partys"
            v-bind:search="search">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.code }}</td>
            <td class="text-xs-center">{{ props.item.ward ? props.item.ward.name : ''}}</td>
            <td class="text-xs-center">{{ props.item.assemblyConstituency ? props.item.assemblyConstituency.name : ''}}</td>
            <td class="text-xs-center">{{ props.item.district ? props.item.district.name : ''}}</td>
            <td class="text-xs-center">{{ props.item.stateAssembly.state}}</td>
            <td class="text-xs-center">
              <v-btn icon @click="editPartyOffic(props.item)"><v-tooltip bottom><v-icon  slot="activator">edit</v-icon>  <span>Edit</span>
                    </v-tooltip></v-btn>
              <v-btn icon @click="removeParty(props.item)"><v-tooltip bottom><v-icon slot="activator">close</v-icon><span>Delete</span>
                    </v-tooltip></v-btn>
            </td>
          </template>
          <template slot="pageText" slot-scope="{ pageStart, pageStop }">
            From {{ pageStart }} to {{ pageStop }}
          </template>
        </v-data-table>
      </div>
    </div>  

            <v-dialog v-model="createDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Add new Party</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="createDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>


                  <v-form v-model="newParty.valid" ref="form">
                    <v-text-field
                      label="Name "
                      v-model="newParty.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>

                    <v-text-field
                      label="Code"
                      v-model="newParty.code"
                    ></v-text-field>

                    <v-select
                        label="State" autocomplete  required
                        :items="stateAssemblies"
                        v-model="newParty.stateAssembly"
                        item-text="state" item-value="state"
                        :return-object="true"
                        :rules="[v => !!v || 'Item is required']"
                        required
                        v-on:input="filterCitizen('state')"
                    ></v-select>

                    <v-select
                        label="District " autocomplete
                        :items="filteredDistricts"
                        v-model="newParty.district"
                        item-text="name" item-value="name"
                        :return-object="true"
                        v-on:input="filterCitizen('district')"
                    ></v-select>

                    <v-select
                        label="Assemblys Constituency " autocomplete
                        :items="filteredAssemblyConstituencies"
                        v-model="newParty.assemblyConstituency"
                        item-text="name" item-value="name" 
                        :return-object="true"
                        v-on:input="filterCitizen('assemblyConstituency')"
                    ></v-select>

                    <v-select
                        label="Ward" autocomplete
                        :items="filteredWards"
                        v-model="newParty.ward"
                        item-text="name" item-value="name" 
                        :return-object="true"
                    ></v-select>

                    <v-btn @click="saveNewParty" :disabled="!newParty.valid" class="btn-primary">submit</v-btn>
                    <v-btn @click="clear" class="btn-secondary">clear</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>


            <v-dialog v-model="editDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Update Party</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="closePop" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <v-form v-model="newParty.valid" ref="form">
                     <v-text-field
                      label="Name "
                      v-model="newParty.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>

                    <v-text-field
                      label="Code"
                      v-model="newParty.code"
                    ></v-text-field>

                    <v-select
                        label="State" autocomplete  required
                        :items="stateAssemblies"
                        v-model="newParty.stateAssembly"
                        item-text="state" item-value="state"
                        :return-object="true"
                        :rules="[v => !!v || 'Item is required']"
                        required
                        v-on:input="filterCitizen('state')"
                    ></v-select>

                    <v-select
                        label="District " autocomplete
                        :items="filteredDistricts"
                        v-model="newParty.district"
                        item-text="name" item-value="name"
                        :return-object="true"
                        v-on:input="filterCitizen('district')"
                    ></v-select>

                    <v-select
                        label="Assemblys Constituency " autocomplete
                        :items="filteredAssemblyConstituencies"
                        v-model="newParty.assemblyConstituency"
                        item-text="name" item-value="name" 
                        :return-object="true"
                        v-on:input="filterCitizen('assemblyConstituency')"
                    ></v-select>

                    <v-select
                        label="Ward" autocomplete
                        :items="filteredWards"
                        v-model="newParty.ward"
                        item-text="name" item-value="name" 
                        :return-object="true"
                    ></v-select>
                    <v-btn @click="updateParty" :disabled="!selectedparty.valid" class="btn-primary">update</v-btn>
                    <v-btn @click="closePop" class="btn-secondary">cancel</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>

            <v-dialog v-model="deleteDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Delete Party {{selectedparty.name}} ?</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="deleteDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <p>Please sure selected Party will be removed permanently</p>
                    <v-btn @click="deleteParty" class="btn-primary">delete</v-btn>
                    <v-btn @click="deleteDialogFlag = false" class="btn-secondary">cancel</v-btn>
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
        selectedparty: { valid:true},
        newParty: {
          valid: false,
          name: "",
          code: "",
          stateAssembly: ""
        },
        stateAssemblies: [],
        newComplaintvalue: [],
        filteredStateAssembly: [],
        filteredDistricts: [],
        filteredAssemblyConstituencies: [],
        filteredWards: [],
        selectFlag: false,
        departments: [],
        filteredSubDepartments: [],
        createDialogFlag: false,
        editDialogFlag: false,
        deleteDialogFlag: false,
        search: '',
        pagination: {},
        headers: [
          {
            text: 'Name',
            align: 'center',
            value: 'name'
          },
            {
            text: 'Code',
            align: 'center',
            value: 'code'
          },
           {
            text: 'Ward',
            align: 'center',
            value: 'ward.name'
          },
           {
            text: 'Assembly Constituency',
            align: 'center',
            value: 'assemblyConstituency.name'
          },
           {
            text: 'District',
            align: 'center',
            value: 'district.name'
          },
            {
            text: 'State',
            align: 'center',
            value: 'stateAssembly.state'
          },
          {
            text: 'Actions',
            align: 'center',
            sortable: false,
            value: 'actions'
          }
        ],
        partys:[]
      }
    },
    methods: {

      closePop(){
        this.newParty= { valid: true},
        this.editDialogFlag = false
      },

      removeParty(Party) {
        this.selectedparty = Party;
        this.deleteDialogFlag = true;
      },

      deleteParty() {
        samparkService.deleteById("Party", this.selectedparty.id).then((res) => {
          if (res.code == 201) {
            this.partys.splice(this.partys.indexOf(this.selectedparty), 1);
            this.deleteDialogFlag = false;
            this.showDeleteSuccessMessage();
          } else {
            if(res.code == 320 ){
              this.showDeleteAlertMessage();
            }else{
              this.showDeleteErrorMessage();
            }
          }
        })
      },

      editPartyOffic(Party) {
        this.newParty = Party;
        if(this.newParty.district) {
            this.filterCitizen('district');
        }
        if(this.newParty.assemblyConstituency) {
            this.filterCitizen('assemblyConstituency');
        }
        this.editDialogFlag = true;
      },

      updateParty() {
        samparkService.update('Party', this.newParty).then((res) => {
          if (res.code === 201) {
            this.editDialogFlag = false;
            this.showUpdateSuccessMessage();
            this.closePop();
          } else {
            this.showUpdateErrorMessage();
          }
        })
      },

      saveNewParty() {
        samparkService.saveNew('Party', this.newParty).then((res) => {
          if (res.code === 201) {
            if(!this.partys) {
              this.partys = [];
            }
            this.partys.push(res.data);
            this.createDialogFlag = false;
            this.showSaveSuccessMessage();
            this.clear();
          } else {
            this.showSaveErrorMessage();
          }
        })
      },
      clear() {
        this.newParty = {
          valid: false,
          name: "",
          address: "",
          stateAssembly: ""
        };
        this.selectedStateAssembly = {};
      },
    filterCitizen(filterdOn) {
      if(this.selectFlag) {
           this.newParty.stateAssembly = this.selectedparty.stateAssembly;
           this.newParty.district = this.selectedparty.district;
      }
      if(filterdOn == "state") {
        this.filteredParliamentaryConstituencies = [];
        this.filteredDistricts = [];
        this.filteredAssemblyConstituencies = [];
        this.filteredWards = [];
        samparkService.getFilteredData('District', this.newParty.stateAssembly.id ).then(res => {
          this.filteredDistricts = res.data;
        });
        this.selectedAssembly = null;
        this.filteredParliamentaryConstituencies = [];

      } 
      else if(filterdOn === "district") {
            this.filteredParliamentaryConstituencies = [];
            this.filteredWards = [];
            samparkService.getFilteredData('ParliamentaryConstituency', this.newParty.district.id).then(res => {
              this.filteAC(res.data);
            });
      } 
      else if(filterdOn === "assemblyConstituency"){
            this.filteredWards = [];
            samparkService.getFilteredData('Ward', this.newParty.assemblyConstituency.id).then(res => {
              this.filteredWards = res.data;
            });
      }
    },
    filteAC (ParliamentaryC) {
          for(var j = 0;j < ParliamentaryC.length;j++) {
              samparkService.getFilteredData('AssemblyConstituency', ParliamentaryC[j].id).then(res => {
                for(var i = 0; i< res.data.length; i++){
                    this.filteredAssemblyConstituencies.push(res.data[i]);
                }
              });
          }
    }
    },
    beforeMount() {

      var data =  window.localStorage.getItem('loginUser');
      data = JSON.parse(data);
      if(data.stateAssembly != null) {
        this.newParty.stateAssembly = data.stateAssembly;
        this.stateAssemblies = this.newParty.stateAssembly;
         this.filterCitizen('state');
         samparkService.partyByState(this.newParty.stateAssembly.id).then((res) => {
          this.partys = res.data;
        })
      } else {
        this.stateAssembly = null;
         samparkService.getAll('StateAssembly').then((res) => {
              this.stateAssemblies = res.data;
          })
          samparkService.getAll('Party').then((res) => {
          this.partys = res.data;
        })
      }
    },
    notifications: {
      showSaveSuccessMessage: {
        title: 'Party saved',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showSaveErrorMessage: {
        title: 'Failed to save Party',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showUpdateSuccessMessage: {
        title: 'Party updated successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showUpdateErrorMessage: {
        title: 'Failed to updated Party',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showDeleteSuccessMessage: {
        title: 'Party deleted successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showDeleteErrorMessage: {
        title: 'Failed to delete Party',
        message: '',
        type: 'error',
        timeout: 2500
      },
    }

  }
</script>
