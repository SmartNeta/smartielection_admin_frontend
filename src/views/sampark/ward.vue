
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
        <v-btn class="btn-primary" @click.stop="dialog = true">Add New</v-btn>
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
            v-bind:total-items="pagination.totalItems"
            v-bind:pagination.sync="pagination"
            v-bind:headers="headers"
            v-bind:items="wards"
            v-bind:search="search">
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.no }}</td>
            <td class="text-xs-left">{{ props.item.areaAddress }}</td>
            <td class="text-xs-left">{{ props.item.assemblyConstituency.name }}</td>
            <td>
              <v-btn icon @click="editWard(props.item)" ><v-tooltip bottom><v-icon  slot="activator">edit</v-icon>  <span>Edit</span>
                    </v-tooltip></v-btn>
              <v-btn icon @click="removeWard(props.item)" small><v-tooltip bottom><v-icon slot="activator">close</v-icon><span>Delete</span>
                    </v-tooltip></v-btn>
            </td>
          </template>
          <template slot="pageText" slot-scope="{ pageStart, pageStop }">
            From {{ pageStart }} to {{ pageStop }}
          </template>
        </v-data-table>
      </div>
    </div>  
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Add new Ward</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="dialog = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>


                  <v-form v-model="newWard.valid" ref="form">
                    <v-text-field
                      label="Name  "
                      v-model="newWard.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                     <v-text-field
                      label="Number  "
                      type="number"
                      v-model="newWard.no"
                      :rules="[v => !!v || 'Number is required']"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Area Address"
                      v-model="newWard.areaAddress"
                    ></v-text-field>
                    <v-select
                      label="Assembly Constituency  " autocomplete  required
                      :items="assemblyConstituencies"
                      v-model="newWard.assemblyConstituency"
                      item-text="name" item-value="name"
                      :return-object="true"
                      :rules="[v => !!v || 'Item is required']"
                      required
                    ></v-select>
                    <v-btn @click="saveNewWard" :disabled="!newWard.valid" class="btn-primary">submit</v-btn>
                    <v-btn @click="clear" class="btn-secondary">clear</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>

            <v-dialog v-model="editDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Update Ward</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="closePop" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>


                  <v-form v-model="selectedWard.valid" ref="form" lazy-validation>

                   <v-text-field
                      label="Name  "
                      v-model="selectedWard.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Number  "
                      v-model="selectedWard.no"
                      type="number"
                      :rules="[v => !!v || 'Number is required']"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Area Address"
                      v-model="selectedWard.areaAddress"
                    ></v-text-field>
                    <v-select
                      label="Assembly Constituency  " autocomplete  required
                      :items="assemblyConstituencies"
                      v-model="selectedWard.assemblyConstituency"
                      item-text="name" item-value="name"
                      :return-object="true"
                      :rules="[v => !!v || 'Item is required']"
                      required
                    ></v-select>
                    <v-btn @click="updateWard" :disabled="!selectedWard.valid" class="btn-primary">update</v-btn>
                    <v-btn @click="closePop" class="btn-secondary">cancle</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>


            <v-dialog v-model="deleteDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Delete Ward {{selectedWard.name}} ?</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="deleteDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <p>Please sure selected Ward will be removed permanently along with its booths.</p>
                    <v-btn @click="deleteWard" class="btn-primary">delete</v-btn>
                    <v-btn @click="deleteDialogFlag = false" class="btn-secondary">cancle</v-btn>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>

  </v-container>
</template>




<script>
  import * as samparkService from "./service";

  export default {
     watch: {
    pagination: {
      async handler () {
         samparkService.getWard(this.pagination.page,this.pagination.rowsPerPage).then((res) => {
            if(this.pagination.rowsPerPage > 0){
                this.wards = res.data[0].content;
                this.pagination.totalItems = res.data[0].totalElements;
            } else {
                this.wards = res.data;
            }
        
        })
      },
      deep: true
    }
  },
    data () {
      return {
        stateAssemblys: [],
        selectedWard: { valid: true},
        assemblyConstituencies: [],
        newWard: {
          valid: false,
          name: "",
          no: "",
          areaAddress: "",
          type: "",
          assemblyConstituency: "",    
        },

        pagination: {
          page: 1,
          rowsPerPage: 5,
          totalItems: 0,
        },

        dialog: false,
        deleteDialogFlag: false,
        editDialogFlag: false,

        search: '',
        headers: [
          {
            text: 'Name',
            align: 'left',
            value: 'name'
          },
          {
            text: 'Number',
            value: 'no'
          },
          {
            text: 'Address',
            value: 'areaAddress'
          },
          {
            text: 'Assembly constituency',
            value: 'assemblyConstituency.name'
          },
          {
            text: 'Actions',
            align: 'center',
            sortable: false,
            value: 'actions'
          }
        ],
        wards: []
      }
    },
    methods: {
        closePop(){
        this.selectedWard= { valid: true},
        this.editDialogFlag = false
      },

      removeWard(ward) {
        this.selectedWard = ward;
        this.deleteDialogFlag = true;
      },

      deleteWard() {
        samparkService.deleteById("Ward", this.selectedWard.id).then((res) => {
          if (res.code == 201) {
            this.wards.splice(this.wards.indexOf(this.selectedWard), 1);
            this.deleteDialogFlag = false;
            this.showDeleteSuccessMessage();
          } else {
            this.showDeleteErrorMessage();
          }
        })
      },

       editWard(ward) {
        this.selectedWard = ward;
        this.editDialogFlag = true;
      },

      updateWard() {
        samparkService.update('Ward', this.selectedWard).then((res) => {
          if (res.code == 201) {
            this.editDialogFlag = false;
            this.showUpdateSuccessMessage();
            this.closePop();
          } else {
            this.showUpdateErrorMessage();
          }
        })
      },

      saveNewWard() {
        
        samparkService.saveNew('Ward', this.newWard).then((res) => {
          if (res.code == 201) {
            this.wards.push(res.data);
            this.dialog = false;
            this.showSaveSuccessMessage();
            this.clear();
          } else {
            this.showSaveErrorMessage();
          }
        })

      },

      clear() {
        this.newWard = {
          valid: false,
          name: "",
          areaAddress: "",
          type: "",
          assemblyConstituencies: ""
        };
      }
    },
    beforeMount() {
      this.pagination = {};
      samparkService.getAll('AssemblyConstituency').then((res) => {
          this.assemblyConstituencies = res.data;
      })
    },
    notifications: {
      showSaveSuccessMessage: {
        title: 'Ward saved',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showSaveErrorMessage: {
        title: 'Failed to save Ward',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showUpdateSuccessMessage: {
        title: 'Ward updated successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showUpdateErrorMessage: {
        title: 'Failed to updated Ward',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showDeleteSuccessMessage: {
        title: 'Ward deleted successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showDeleteErrorMessage: {
        title: 'Failed to delete Ward',
        message: '',
        type: 'error',
        timeout: 2500
      }

    }

  }
</script>
