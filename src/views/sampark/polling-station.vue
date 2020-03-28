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
            v-bind:items="pollingStations"
            v-bind:search="search">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.name }}</td>
             <td class="text-xs-center">{{ props.item.number }}</td>
            <td class="text-xs-center">{{ props.item.address }}</td>
            <td class="text-xs-center">{{ props.item.ward.name}}</td>
            <td class="text-xs-center">
              <v-btn icon @click="editPollingStation(props.item)"><v-tooltip bottom><v-icon  slot="activator">edit</v-icon>  <span>Edit</span>
                    </v-tooltip></v-btn>
              <v-btn icon @click="removePollingStation(props.item)"><v-tooltip bottom><v-icon slot="activator">close</v-icon><span>Delete</span>
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
                  <v-toolbar-title>Add new Polling Station</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="createDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>


                  <v-form v-model="newPollingStation.valid" ref="form">
                    <v-text-field
                      label="Name "
                      v-model="newPollingStation.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Number "
                      v-model="newPollingStation.number"
                      :rules="[v => !!v || 'Number is required']"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Address"
                      v-model="newPollingStation.address"
                    ></v-text-field>
                    <v-select
                        label="Ward " autocomplete  required
                        :items="wards"
                        v-model="newPollingStation.ward"
                        item-text="name" item-value="name"
                        :return-object="true"
                        :rules="[v => !!v || 'Item is required']"
                        required
                    ></v-select>
                    <v-btn @click="saveNewPollingStation" :disabled="!newPollingStation.valid" class="btn-primary">submit</v-btn>
                    <v-btn @click="clear" class="btn-secondary">clear</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>


            <v-dialog v-model="editDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Update Polling Station</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="closePop" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <v-form v-model="selectedPollingStation.valid" ref="form">
                     <v-text-field
                      label="Name "
                      v-model="selectedPollingStation.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                     <v-text-field
                      label="Number "
                      v-model="selectedPollingStation.number"
                      :rules="[v => !!v || 'Number is required']"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Address"
                      v-model="selectedPollingStation.address"
                    ></v-text-field>
                    <v-select
                        label="Ward " autocomplete  required
                        :items="wards"
                        v-model="selectedPollingStation.ward"
                        item-text="name" item-value="name"
                        :return-object="true"
                        :rules="[v => !!v || 'Item is required']"
                        required
                    ></v-select>
                    <v-btn @click="updatePollingStation" :disabled="!selectedPollingStation.valid" class="btn-primary">update</v-btn>
                    <v-btn @click="closePop" class="btn-secondary">cancel</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>

            <v-dialog v-model="deleteDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Delete Polling Station {{selectedPollingStation.name}} ?</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="deleteDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <p>Please sure selected Polling Station will be removed permanently</p>
                    <v-btn @click="deletePollingStation" class="btn-primary">delete</v-btn>
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
        selectedPollingStation: { valid:true},
        newPollingStation: {
          valid: false,
          name: "",
          address: "",
          ward: ""
        },
        wards: [],

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
            text: 'Number',
            align: 'center',
            value: 'number'
          },
            {
            text: 'Address',
            align: 'center',
            value: 'address'
          },
            {
            text: 'Ward',
            align: 'center',
            value: 'ward.name'
          },
          {
            text: 'Actions',
            align: 'center',
            sortable: false,
            value: 'actions'
          }
        ],
        pollingStations: []
      }
    },
    methods: {

      closePop(){
        this.selectedPollingStation= { valid: true},
        this.editDialogFlag = false
      },

      removePollingStation(PollingStation) {
        this.selectedPollingStation = PollingStation;
        this.deleteDialogFlag = true;
      },

      deletePollingStation() {
        samparkService.deleteById("PollingStation", this.selectedPollingStation.id).then((res) => {
          if (res.code == 201) {
            this.pollingStations.splice(this.pollingStations.indexOf(this.selectedPollingStation), 1);
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

      editPollingStation(PollingStation) {
        this.selectedPollingStation = PollingStation;
        this.editDialogFlag = true;
      },

      updatePollingStation() {
        samparkService.update('PollingStation', this.selectedPollingStation).then((res) => {
          if (res.code == 201) {
            this.editDialogFlag = false;
            this.showUpdateSuccessMessage();
            this.closePop();
          } else {
            this.showUpdateErrorMessage();
          }
        })
      },

      saveNewPollingStation() {
        samparkService.saveNew('PollingStation', this.newPollingStation).then((res) => {
          if (res.code == 201) {
            this.pollingStations.push(res.data);
            this.createDialogFlag = false;
            this.showSaveSuccessMessage();
            this.clear();
          } else {
            this.showSaveErrorMessage();
          }
        })
      },
      clear() {
        this.newPollingStation = {
          valid: false,
          name: "",
          address: "",
          assemblyConstituency: ""
        };
        this.selectedStateAssembly = {};
      }
    },
    beforeMount() {
      samparkService.getAll('PollingStation').then((res) => {
          this.pollingStations = res.data;
      })
       samparkService.getAll('Ward').then((res) => {
          this.wards = res.data;
      })
    },
    notifications: {
      showSaveSuccessMessage: {
        title: 'Polling Station saved',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showSaveErrorMessage: {
        title: 'Failed to save Polling Station',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showUpdateSuccessMessage: {
        title: 'Polling Station updated successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showUpdateErrorMessage: {
        title: 'Failed to updated Polling Station',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showDeleteSuccessMessage: {
        title: 'Polling Station deleted successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showDeleteErrorMessage: {
        title: 'Failed to delete Polling Station',
        message: '',
        type: 'error',
        timeout: 2500
      },
    }

  }
</script>
