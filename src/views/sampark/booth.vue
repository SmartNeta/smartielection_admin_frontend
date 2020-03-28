
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
            v-bind:rows-per-page-items="pagination.rowsPerPageItems"
            v-bind:total-items="pagination.totalItems"
            v-bind:pagination.sync="pagination"
            v-bind:headers="headers"
            v-bind:items="booths"
            v-bind:search="search">
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.address }}</td>
            <td class="text-xs-left">{{ props.item.no }}</td>
            <td class="text-xs-left">{{ props.item.ward.name }}</td>
            <td>
                    
              <v-btn icon @click="editBooth(props.item)"><v-tooltip bottom><v-icon  slot="activator">edit</v-icon>  <span>Edit</span>
                    </v-tooltip></v-btn>
              <v-btn icon @click="removeBooth(props.item)"><v-tooltip bottom><v-icon slot="activator">close</v-icon><span>Delete</span>
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
                  <v-toolbar-title>Add new Booth</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="createDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>


                  <v-form v-model="newbooth.valid" ref="form">
                    <v-text-field
                      label="Name "
                      v-model="newbooth.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                     <v-text-field
                      label="Address"
                      v-model="newbooth.address"
                    ></v-text-field>
                    <v-text-field
                      label="Booth Number "
                      type="number"
                      v-model="newbooth.no"
                      :rules="[v => !!v || 'Booth Number is required']"
                      required
                    ></v-text-field>
                    <v-select
                      label="Ward " autocomplete  required
                      :items="wards"
                      v-model="newbooth.ward"
                      item-text="name" item-value="name"
                      :return-object="true"
                      :rules="[v => !!v || 'Ward is required']"
                      required
                    ></v-select>
                    <v-btn @click="saveNewBooth" :disabled="!newbooth.valid" class="btn-primary">submit</v-btn>
                    <v-btn @click="clear" class="btn-secondary">clear</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>


            <v-dialog v-model="editDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Update Booth</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="closePop" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>


                  <v-form v-model="selectedboot.valid" ref="form">

                    <v-text-field
                      label="Name "
                      v-model="selectedboot.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Address"
                      v-model="selectedboot.address"
                    ></v-text-field>
                     <v-text-field
                      label="Booth Number "
                      type="number"
                      v-model="selectedboot.no"
                      :rules="[v => !!v || 'Booth Number is required']"
                      required
                    ></v-text-field>
                    <v-select
                      label="Ward " autocomplete  required
                      :items="wards"
                      v-model="selectedboot.ward"
                      item-text="name" item-value="name"
                      :return-object="true"
                      :rules="[v => !!v || 'Item is required']"
                      required
                    ></v-select>
                    <v-btn @click="updateBooth" :disabled="!selectedboot.valid" class="btn-primary">update</v-btn>
                    <v-btn @click="closePop" class="btn-secondary">cancel</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>

            <v-dialog v-model="deleteDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Delete Booth {{selectedboot.address}} ?</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="deleteDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <p>Please sure selected Booth will be removed permanently along with its Volunteers.</p>
                    <v-btn @click="deleteBooth" class="btn-primary">delete</v-btn>
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
      watch: {
    pagination: {
      async handler () {
         samparkService.getBooth(this.pagination.page,this.pagination.rowsPerPage).then((res) => {
           if(this.pagination.rowsPerPage > 0){
               this.booths = res.data[0].content;
               this.pagination.totalItems = res.data[0].totalElements;
           } else {
             this.booths = res.data;
           }
        })
      },
      deep: true
    }
  },
    data () {
      return {
        items: [],      
        wards: [],
        selectedboot: {  valid: true },
        newbooth: {
          valid: false,
          name: "",
          address: "",
          no: "",
          ward: "",
        },
          pagination: {
          page: 1,
          rowsPerPage: 5,
          totalItems: 0,
        },
        createDialogFlag: false,
        editDialogFlag: false,
        deleteDialogFlag: false,

        search: '',
        headers: [
          {
            text: 'Name',
            value: 'name'
          },
           {
            text: 'Address',
            value: 'address'
          },
          {
            text: 'Booth Number',
            value: 'no'
          },
          {
            text: 'Ward',
            value: 'ward.name'
          },
          {
            text: 'Actions',
            sortable: false,
            value: 'actions'
          }
        ],
        booths: []
      }
    },
    methods: {
      closePop(){
        this.selectedboot= { valid: true},
        this.editDialogFlag = false
      },

      removeBooth(booth) {
        this.selectedboot = booth;
        this.deleteDialogFlag = true;
      },

      deleteBooth() {
        samparkService.deleteById("Booth", this.selectedboot.id).then((res) => {
          if (res.code == 201) {
            this.booths.splice(this.booths.indexOf(this.selectedboot), 1);
            this.deleteDialogFlag = false;
            this.showDeleteSuccessMessage();
          } else {
            this.showDeleteErrorMessage();
          }
        })
      },

      editBooth(booth) {
        this.selectedboot = booth;
        this.editDialogFlag = true;
      },

      updateBooth() {
        samparkService.update('Booth',this.selectedboot).then((res) => {
          if (res.code == 201) {
            this.editDialogFlag = false;
            this.showUpdateSuccessMessage();
            this.closePop();
          } else {
            this.showUpdateErrorMessage();
          }
        })
      },


      saveNewBooth() {
        samparkService.saveNew('Booth',this.newbooth).then((res) => {
          if (res.code == 201) {
            this.booths.push(res.data);
            this.createDialogFlag = false;
            this.showSaveSuccessMessage();
            this.clear();
          } else {
            this.showSaveErrorMessage();
          }
        })

      },
      clear() {
        this.newbooth = {
          valid: false,
          name: "",
          address: "",
          ward: "",
          no: "",
        };
        this.selectedboot = {};
      }
    },
    beforeMount() {
      samparkService.getAll('Ward').then((res) => {
          this.wards = res.data;
      })
    },
    notifications: {
      showSaveSuccessMessage: {
        title: 'Booth saved',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showSaveErrorMessage: {
        title: 'Failed to save Booth',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showUpdateSuccessMessage: {
        title: 'Booth updated successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showUpdateErrorMessage: {
        title: 'Failed to updated Booth',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showDeleteSuccessMessage: {
        title: 'Booth deleted successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showDeleteErrorMessage: {
        title: 'Failed to delete Booth',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showValidationMessage: {
        title: 'Please Select Ward',
        message: '',
        type: 'error',
        timeout: 2500
      }
    }

  }
</script>
