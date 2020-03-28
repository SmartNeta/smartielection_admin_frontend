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
            v-bind:items="assemblyConstituencies"
            v-bind:search="search">
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
             <td class="text-xs-left">{{ props.item.no }}</td>
            <td class="text-xs-left">{{ props.item.parliamentaryConstituency.name }}</td>
            <td class="text-xs-left">{{ props.item.parliamentaryConstituency.district.stateAssembly.state }}</td>
            <td>
              <v-btn icon @click="editAssemblyConstituency(props.item)"><v-tooltip bottom><v-icon  slot="activator">edit</v-icon>  <span>Edit</span>
                    </v-tooltip></v-btn>
              <v-btn icon @click="removeAssemblyConstituency(props.item)"><v-tooltip bottom><v-icon slot="activator">close</v-icon><span>Delete</span>
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
                  <v-toolbar-title>Add new Assembly Constituency</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="createDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>


                  <v-form v-model="newAssemblyConstituency.valid" ref="form">
                    <v-text-field
                      label="Name "
                      v-model="newAssemblyConstituency.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                     <v-text-field
                      label="Assembly Constituency Number "
                      type="number"
                      v-model="newAssemblyConstituency.no"
                      :rules="[v => !!v || 'Assembly Constituency Number is required']"
                      required
                    ></v-text-field>
                    <v-select
                      label="Parliamentary Constituency " autocomplete  required
                      :items="parliamentaryConstituencies"
                      v-model="newAssemblyConstituency.parliamentaryConstituency"
                      item-text="name" item-value="name"
                      :return-object="true"
                      :rules="[v => !!v || 'Item is required']"
                      required
                    ></v-select>
                    <v-btn @click="saveNewAssemblyConstituency" :disabled="!newAssemblyConstituency.valid" class="btn-primary">save</v-btn>
                    <v-btn @click="clear" class="btn-secondary">clear</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>


            <v-dialog v-model="editDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Update Assembly Constituency</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="closePop" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>


                  <v-form v-model="selectedAssemblyConstituency.valid" ref="form">

                    <v-text-field
                      label="Name "
                      v-model="selectedAssemblyConstituency.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                     <v-text-field
                      label="Assembly Constituency Number "
                      type="number"
                      v-model="selectedAssemblyConstituency.no"
                      :rules="[v => !!v || 'Assembly Constituency Number is required']"
                      required
                    ></v-text-field>
                    <v-select
                      label="Parliamentary Constituency " autocomplete  required
                      :items="parliamentaryConstituencies"
                      v-model="selectedAssemblyConstituency.parliamentaryConstituency"
                      item-text="name" item-value="name"
                      :return-object="true"
                      :rules="[v => !!v || 'Item is required']"
                      required
                    ></v-select>
                    <v-btn @click="updateAssemblyConstituency" :disabled="!selectedAssemblyConstituency.valid" class="btn-primary">update</v-btn>
                    <v-btn @click="closePop" class="btn-secondary">cancel</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>

            <v-dialog v-model="deleteDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Delete assembly constituency {{selectedAssemblyConstituency.name}} ?</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="deleteDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <p>Please sure selected assembly constituency will be removed permanently along with its wards, booths.</p>
                    <v-btn @click="deleteAssemblyConstituency" class="btn-primary">delete</v-btn>
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
         samparkService.getAssemblyConstituency(this.pagination.page,this.pagination.rowsPerPage).then((res) => {
           if(this.pagination.rowsPerPage > 0){
               this.assemblyConstituencies = res.data[0].content;
               this.pagination.totalItems = res.data[0].totalElements;
           } else {
             this.assemblyConstituencies = res.data;
           }
        })
      },
      deep: true
    }
  },
    data () {
      return {
        items: [],        
        parliamentaryConstituencies: [],
        selectedAssemblyConstituency: { valid: true },
        newAssemblyConstituency: {
          valid: false,
          name: "",
          no: "",
          parliamentaryConstituency: ""
        },

        createDialogFlag: false,
        editDialogFlag: false,
        deleteDialogFlag: false,
        
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        search: '',
          pagination: {
          page: 1,
          rowsPerPage: 5,
          totalItems: 0,
        },
        headers: [
          {
            text: 'Name',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          {
            text: 'Number',
            value: 'no'
          },
          {
            text: 'Parliamentary Constituency.',
            value: 'parliamentaryConstituency.name'
          },
          {
            text: 'State Assembly',
            value: 'parliamentaryConstituency.district.stateAssembly.state'
          },
          {
            text: 'Actions',
            align: 'center',
            sortable: false,
            value: 'actions'
          }
        ],
        assemblyConstituencies: []
      }
    },
    methods: {

      closePop(){
        this.selectedAssemblyConstituency= { valid: true},
        this.editDialogFlag = false
      },

      removeAssemblyConstituency(assemblyConstituency) {
        this.selectedAssemblyConstituency = assemblyConstituency;
        this.deleteDialogFlag = true;
      },

      deleteAssemblyConstituency() {
        samparkService.deleteById("AssemblyConstituency", this.selectedAssemblyConstituency.id).then((res) => {
          if (res.code == 201) {
            this.assemblyConstituencies.splice(this.assemblyConstituencies.indexOf(this.selectedAssemblyConstituency), 1);
            this.deleteDialogFlag = false;
            this.showDeleteSuccessMessage();
          } else {
            this.showDeleteErrorMessage();
          }
        })
      },

      editAssemblyConstituency(assemblyConstituency) {
        this.selectedAssemblyConstituency = assemblyConstituency;
        this.editDialogFlag = true;
      },

      updateAssemblyConstituency() {
        samparkService.update('AssemblyConstituency', this.selectedAssemblyConstituency).then((res) => {
          if (res.code == 201) {
            this.editDialogFlag = false;
            this.showUpdateSuccessMessage();
            this.closePop();
          } else {
            this.showUpdateErrorMessage();
          }
        })
      },
      saveNewAssemblyConstituency() {
        samparkService.saveNew('AssemblyConstituency', this.newAssemblyConstituency).then((res) => {
          if (res.code == 201) {
            this.assemblyConstituencies.push(res.data);
            this.createDialogFlag = false;
            this.showSaveSuccessMessage();
            this.clear();
          } else {
            this.showSaveErrorMessage();
          }
        })
      },
      clear() {
        this.newAssemblyConstituency = {
          valid: false,
          name: "",
          no: "",
          district: ""
        };
      }
    },
    beforeMount() {
      samparkService.getAll('ParliamentaryConstituency').then((res) => {
          this.parliamentaryConstituencies = res.data;
      })
    },

    notifications: {
      showSaveSuccessMessage: {
        title: 'Assembly Constituency saved',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showSaveErrorMessage: {
        title: 'Failed to save Assembly Constituency',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showUpdateSuccessMessage: {
        title: 'Assembly Constituency updated successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showUpdateErrorMessage: {
        title: 'Failed to updated Assembly Constituency',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showDeleteSuccessMessage: {
        title: 'Assembly Constituency deleted successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showDeleteErrorMessage: {
        title: 'Failed to delete Assembly Constituency',
        message: '',
        type: 'error',
        timeout: 2500
      }
    }

  }
</script>
