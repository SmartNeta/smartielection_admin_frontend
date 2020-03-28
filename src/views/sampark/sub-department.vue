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
            v-bind:items="subdepartments"
            v-bind:search="search">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.department.name }}</td>
            <td class="text-xs-center">
              <v-btn icon @click="editSubDepartment(props.item)"><v-tooltip bottom><v-icon  slot="activator">edit</v-icon>  <span>Edit</span>
                    </v-tooltip></v-btn>
              <v-btn icon @click="removeSubDepartment(props.item)"><v-tooltip bottom><v-icon slot="activator">close</v-icon><span>Delete</span>
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
                  <v-toolbar-title>Add new Sub Department</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="createDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>


                  <v-form v-model="newSubDepartment.valid" ref="form">
                    <v-text-field
                      label="Name "
                      v-model="newSubDepartment.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                     <v-select
                      label="Department " autocomplete  required
                      :items="departments"
                      v-model="newSubDepartment.department"
                      item-text="name" item-value="name"
                      :return-object="true"
                      :rules="[v => !!v || 'Item is required']"
                      required
                    ></v-select>
                    <v-btn @click="saveNewSubDepartment" :disabled="!newSubDepartment.valid" class="btn-primary">submit</v-btn>
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


                  <v-form v-model="selectedSubDepartment.valid" ref="form">
                    <v-text-field
                      label="Name "
                      v-model="selectedSubDepartment.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                     <v-select
                      label="Department " autocomplete  required
                      :items="departments"
                      v-model="selectedSubDepartment.department"
                      item-text="name" item-value="name"
                      :return-object="true"
                      :rules="[v => !!v || 'Item is required']"
                      required
                    ></v-select>
                    <v-btn @click="updateSubDepartment" :disabled="!selectedSubDepartment.valid" class="btn-primary">update</v-btn>
                    <v-btn @click="closePop" class="btn-secondary">cancel</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>

            <v-dialog v-model="deleteDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Delete Sub Department {{selectedSubDepartment.name}} ?</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="deleteDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <p>Please sure selected Sub Department will be removed permanently</p>
                    <v-btn @click="deleteSubDepartment" class="btn-primary">delete</v-btn>
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
        selectedSubDepartment: { valid: true },
        newSubDepartment: {
          valid: false,
          name: "",
          department: ""
        },

        createDialogFlag: false,
        editDialogFlag: false,
        deleteDialogFlag: false,
        search: '',
        pagination: {},
        departments: [],
        headers: [
          {
            text: 'Name',
            align: 'center',
            value: 'name'
          },
          {
            text: 'Department',
            align: 'center',
            value: 'department.name'
          },
          {
            text: 'Actions',
            align: 'center',
            value: 'actions'
          }
        ],
        subdepartments: []
      }
    },
    methods: {

      closePop(){
        this.selectedSubDepartment= { valid: true},
        this.editDialogFlag = false
      },

      removeSubDepartment(subDepartment) {
        this.selectedSubDepartment = subDepartment;
        this.deleteDialogFlag = true;
      },

      deleteSubDepartment() {
        samparkService.deleteById("SubDepartment", this.selectedSubDepartment.id).then((res) => {
          if (res.code == 201) {
            this.subdepartments.splice(this.subdepartments.indexOf(this.selectedSubDepartment), 1);
            this.deleteDialogFlag = false;
            this.showDeleteSuccessMessage();
          } else {
            this.showDeleteErrorMessage();
          }
        })
      },

      editSubDepartment(subDepartment) {
        this.selectedSubDepartment = subDepartment;
        this.editDialogFlag = true;
      },

      updateSubDepartment() {
        samparkService.update('SubDepartment', this.selectedSubDepartment).then((res) => {
          if (res.code == 201) {
            this.editDialogFlag = false;
            this.showUpdateSuccessMessage();
            this.closePop();
          } else {
            this.showUpdateErrorMessage();
          }
        })
      },

      saveNewSubDepartment() {
        samparkService.saveNew('SubDepartment', this.newSubDepartment).then((res) => {
          if (res.code == 201) {
            this.subdepartments.push(res.data);
            this.createDialogFlag = false;
            this.showSaveSuccessMessage();
            this.clear();
          } else {
            this.showSaveErrorMessage();
          }
        })
      },
      clear() {
        this.newSubDepartment = {
          valid: false,
           name: "",
           department: ""
        };
        this.selectedSubDepartment = {};
      }
    },
    beforeMount() {
      samparkService.getAll('SubDepartment').then((res) => {
          this.subdepartments = res.data;
      })
       samparkService.getAll('Department').then((res) => {
          this.departments = res.data;
      })
    },
    notifications: {
      showSaveSuccessMessage: {
        title: 'Sub Department saved',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showSaveErrorMessage: {
        title: 'Failed to save Sub Department',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showUpdateSuccessMessage: {
        title: 'Sub Department updated successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showUpdateErrorMessage: {
        title: 'Failed to updated Sub Department',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showDeleteSuccessMessage: {
        title: 'Sub Department deleted successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showDeleteErrorMessage: {
        title: 'Failed to delete Sub Department',
        message: '',
        type: 'error',
        timeout: 2500
      }
    }

  }
</script>
