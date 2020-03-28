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
            v-bind:items="departments"
            v-bind:search="search">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.code }}</td>
            <td class="text-xs-center">
              <v-btn icon @click="editDepartment(props.item)"><v-tooltip bottom><v-icon  slot="activator">edit</v-icon>  <span>Edit</span>
                    </v-tooltip></v-btn>
              <v-btn icon @click="removeDepartment(props.item)"><v-tooltip bottom><v-icon slot="activator">close</v-icon><span>Delete</span>
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
                  <v-toolbar-title>Add new Department</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="createDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>


                  <v-form v-model="newDepartment.valid" ref="form">
                    <v-text-field
                      label="Name "
                      v-model="newDepartment.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                     <v-text-field
                      label="Code "
                      v-model="newDepartment.code"
                      :rules="[v => (v.trim().length) == 4 || 'Code must be 4 digit alphanumeric']"
                      required
                    ></v-text-field>
                    <v-btn @click="saveNewDepartment" :disabled="!newDepartment.valid" class="btn-primary">submit</v-btn>
                    <v-btn @click="clear" class="btn-secondary">clear</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>


            <v-dialog v-model="editDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Update Department</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="closePop" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>


                  <v-form v-model="selectedDepartment.valid" ref="form" >
                    <v-text-field
                      label="Name "
                      v-model="selectedDepartment.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                     <v-text-field
                      label="Code "
                      v-model="selectedDepartment.code"
                      :rules="[v => (v.trim().length) == 4 || 'Code must be 4 digit alphanumeric']"
                      required
                    ></v-text-field>
                    <v-btn @click="updateDepartment" :disabled="!selectedDepartment.valid" class="btn-primary">update</v-btn>
                    <v-btn @click="closePop" class="btn-secondary">cancel</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>

            <v-dialog v-model="deleteDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Delete Department {{selectedDepartment.name}} ?</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="deleteDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <p>Please sure selected Department will be removed permanently</p>
                    <v-btn @click="deleteDepartment" class="btn-primary">delete</v-btn>
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
        selectedDepartment: { valid: true},
        newDepartment: {
          valid: false,
          name: "",
          code: ""
        },

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
            text: 'Actions',
            align: 'center',
            sortable: false,
            value: 'actions'
          }
        ],
        departments: []
      }
    },
    methods: {

      closePop(){
        this.selectedDepartment= { valid: true},
        this.editDialogFlag = false
      },
      removeDepartment(department) {
        this.selectedDepartment = department;
        this.deleteDialogFlag = true;
      },

      deleteDepartment() {
        samparkService.deleteById("Department", this.selectedDepartment.id).then((res) => {
          if (res.code == 201) {
            this.departments.splice(this.departments.indexOf(this.selectedDepartment), 1);
            this.deleteDialogFlag = false;
            this.showDeleteSuccessMessage();
          } else {
            this.showDeleteErrorMessage();
          }
        })
      },

      editDepartment(department) {
        this.selectedDepartment = department;
        this.editDialogFlag = true;
      },

      updateDepartment() {
        samparkService.update('Department', this.selectedDepartment).then((res) => {
          if (res.code == 201) {
            this.editDialogFlag = false;
            this.showUpdateSuccessMessage();
            this.closePop();
          } else {
            this.showUpdateErrorMessage();
          }
        })
      },

      saveNewDepartment() {
        samparkService.saveNew('Department', this.newDepartment).then((res) => {
          if (res.code == 201) {
            this.departments.push(res.data);
            this.createDialogFlag = false;
            this.showSaveSuccessMessage();
            this.clear();
          } else {
            this.showSaveErrorMessage();
          }
        })
      },
      clear() {
        this.newDepartment = {
          valid: false,
          name: "",
          code: ""
        };
        this.selectedDepartment = {};
      }
    },
    beforeMount() {
      samparkService.getAll('Department').then((res) => {
          this.departments = res.data;
      })
    },
    notifications: {
      showSaveSuccessMessage: {
        title: 'Department saved',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showSaveErrorMessage: {
        title: 'Failed to save Department',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showUpdateSuccessMessage: {
        title: 'Department updated successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showUpdateErrorMessage: {
        title: 'Failed to updated Department',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showDeleteSuccessMessage: {
        title: 'Department deleted successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showDeleteErrorMessage: {
        title: 'Failed to delete Department',
        message: '',
        type: 'error',
        timeout: 2500
      }
    }

  }
</script>
