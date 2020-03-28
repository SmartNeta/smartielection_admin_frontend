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
            v-bind:items="stateAssemblys"
            v-bind:search="search">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.state }}</td>
            <td class="text-xs-center">
              <v-checkbox 
                  :label="props.item.createCitizen ? 'YES' : 'NO'"
                  v-model="props.item.createCitizen"
                  color="success"
                  hide-details
                  disabled="readonly"
                  >
               </v-checkbox>
            </td>
            <td class="text-xs-center">
              <v-checkbox 
                  :label="props.item.updateCitizen ? 'YES' : 'NO'"
                  v-model="props.item.updateCitizen"
                  color="success"
                  hide-details
                  disabled="readonly"
                  >
               </v-checkbox>
            </td>
            <td class="text-xs-center">
              <v-checkbox 
                  :label="props.item.volunteerApproval ? 'YES' : 'NO'"
                  v-model="props.item.volunteerApproval"
                  color="success"
                  hide-details
                  disabled="readonly"
                  >
               </v-checkbox>
            </td>                        
            <td class="text-xs-center">
              <v-btn icon @click="editStateAssembly(props.item)"><v-tooltip bottom><v-icon  slot="activator">edit</v-icon><span>Edit</span>
                    </v-tooltip></v-btn>
              <v-btn icon @click="removeStateAssembly(props.item)"><v-tooltip bottom><v-icon  slot="activator">close</v-icon><span>Delete</span>
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
                  <v-toolbar-title>Add new State Assembly</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="createDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>


                  <v-form v-model="newStateAssembly.valid" ref="form">
                    <v-layout row wrap>
                      <v-flex xs12 sm12>
                        <v-text-field
                          label="State "
                          v-model="newStateAssembly.state"
                          :rules="[v => !!v || 'State is required']"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 sm12>
                         <v-checkbox
                            label="Create Citizen"
                            v-model="newStateAssembly.createCitizen"
                            color="success"
                            hide-details>
                         </v-checkbox>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap >
                      <v-flex xs12 sm12>
                         <v-checkbox
                            label="Update Citizen"
                            v-model="newStateAssembly.updateCitizen"
                            color="success"
                            hide-details>
                         </v-checkbox>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap style="margin-bottom: 20px;">
                      <v-flex xs12 sm12>
                         <v-checkbox
                            label="Default Volunteer approval"
                            v-model="newStateAssembly.volunteerApproval"
                            color="success"
                            hide-details>
                         </v-checkbox>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 sm12>
                        <v-btn @click="saveNewStateAssembly" :disabled="!newStateAssembly.valid" class="btn-primary">submit</v-btn>
                        <v-btn @click="clear" class="btn-secondary">clear</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>


            <v-dialog v-model="editDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Update State Assembly</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="editDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>


                  <v-form v-model="selectedStateAssembly.valid" ref="form">
                    <v-layout row wrap>
                      <v-flex xs12 sm12>
                        <v-text-field
                          label="State "
                          v-model="selectedStateAssembly.state"
                          :rules="[v => !!v || 'State is required']"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 sm12 style="margin-bottom: 20px;">
                         <v-checkbox
                            label="Create Citizen"
                            v-model="selectedStateAssembly.createCitizen"
                            color="success"
                            hide-details>
                         </v-checkbox>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 sm12 style="margin-bottom: 20px;">
                         <v-checkbox
                            label="Update Citizen"
                            v-model="selectedStateAssembly.updateCitizen"
                            color="success"
                            hide-details>
                         </v-checkbox>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 sm12 style="margin-bottom: 20px;">
                         <v-checkbox
                            label="Default Volunteer approval"
                            v-model="selectedStateAssembly.volunteerApproval"
                            color="success"
                            hide-details>
                         </v-checkbox>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 sm12>
                        <v-btn @click="updateStateAssembly" :disabled="!selectedStateAssembly.valid" class="btn-primary">update</v-btn>
                        <v-btn @click="editDialogFlag = false" class="btn-secondary">cancel</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>

            <v-dialog v-model="deleteDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Delete state assembly {{selectedStateAssembly.state}} ?</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="deleteDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <p>Please sure selected state assembly will be removed permanently along with its parliamentary constituencies, assembly constituencies, wards, booths</p>
                    <v-btn @click="deleteStateAssembly" class="btn-primary">delete</v-btn>
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
        selectedStateAssembly: {},
        newStateAssembly: {
          valid: false,
          state: "",
          createCitizen: false,
          updateCitizen: false,
          volunteerApproval: false
        },

        createDialogFlag: false,
        editDialogFlag: false,
        deleteDialogFlag: false,
        search: '',
        pagination: {},
        headers: [
          {
            text: 'State',
            align: 'center',
            value: 'state',
            width: '25%'
          },
          {
            text: 'Create Citizen',
            align: 'center',
            value: 'createCitizen',
            width: '20%'
          },
          {
            text: 'Update Citizen',
            align: 'center',
            value: 'updateCitizen',
            width: '20%'
          },
          {
            text: 'Default Volunteer Approval',
            align: 'center',
            value: 'volunteerApproval',
            width: '20%'
          },                    
          {
            text: 'Actions',
            align: 'center',
            sortable: false,
            value: 'actions',
            width: '15%'
          }
        ],
        stateAssemblys: []
      }
    },
    methods: {

      removeStateAssembly(stateAssembly) {
        this.selectedStateAssembly = stateAssembly;
        this.deleteDialogFlag = true;
      },

      deleteStateAssembly() {
        samparkService.deleteById("StateAssembly", this.selectedStateAssembly.id).then((res) => {
          if (res.code == 201) {
            this.stateAssemblys.splice(this.stateAssemblys.indexOf(this.selectedStateAssembly), 1);
            this.deleteDialogFlag = false;
            this.showDeleteSuccessMessage();
          } else {
            this.showDeleteErrorMessage();
          }
        })
      },

      editStateAssembly(stateAssembly) {
        this.selectedStateAssembly = stateAssembly;
        this.editDialogFlag = true;
      },

      updateStateAssembly() {
        samparkService.update('StateAssembly', this.selectedStateAssembly).then((res) => {
          if (res.code == 201) {
            this.editDialogFlag = false;
            this.showUpdateSuccessMessage();
            this.clear();
          } else {
            this.showUpdateErrorMessage();
          }
        })
      },

      saveNewStateAssembly() {
        samparkService.saveNew('StateAssembly', this.newStateAssembly).then((res) => {
          if (res.code == 201) {
            this.stateAssemblys.push(res.data);
            this.createDialogFlag = false;
            this.showSaveSuccessMessage();
            this.clear();
          } else {
            this.showSaveErrorMessage();
          }
        })
      },
      clear() {
        this.newStateAssembly = {
          valid: false,
          state: "",
          createCitizen : false,
          updateCitizen: false,
          volunteerApproval : false
        };
        this.selectedStateAssembly = {};
      }
    },
    beforeMount() {
      samparkService.getAll('StateAssembly').then((res) => {
          this.stateAssemblys = res.data;
      })
    },
    notifications: {
      showSaveSuccessMessage: {
        title: 'State Assembly saved',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showSaveErrorMessage: {
        title: 'Failed to save State Assembly',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showUpdateSuccessMessage: {
        title: 'State Assembly updated successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showUpdateErrorMessage: {
        title: 'Failed to updated State Assembly',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showDeleteSuccessMessage: {
        title: 'State Assembly deleted successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showDeleteErrorMessage: {
        title: 'Failed to delete State Assembly',
        message: '',
        type: 'error',
        timeout: 2500
      }
    }

  }
</script>
