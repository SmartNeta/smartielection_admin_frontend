<style>
  .theme--light .toolbar, .application .theme--light.toolbar {
    color: #FFF;
}
.padd-block{
  padding: 6px;
}
@media(max-width: 550px){
  .padd-block{
    padding: 2px;
  }  
}

@media only screen and (max-width: 450px){
  .padding_three{
    padding: 3px !important;
  }
  .btn__content{
    padding: 0 3px !important;
  }
}
</style>
<template>
    <v-container fluid grid-list-xl py-0>
    <div class="app-card">
      <div class="app-card-content">
        <v-card-title>
          <v-flex xs12 sm4>
                    <v-select
                      label="Role" autocomplete  required
                      :items="roles"
                      v-model="selectedRole"
                      item-text="name" item-value="name"
                      :return-object="true"
                      :rules="[v => !!v || 'Item is required']"
                      v-on:input="selectRole()"
                      overflow
                    ></v-select>
                  </v-flex> 
          <v-spacer></v-spacer>
              <v-btn class="btn-success"  @click.stop="createDialogFlag = true">Add New</v-btn>
              <div class="padding_three" style="padding: 10px;"></div>
            <v-btn  class="btn-primary" @click.stop="editDialogFlag = true">Update</v-btn>
            <div class="padding_three" style="padding: 10px;"></div>
              <v-btn @click.stop="deleteDialogFlag = true">Delete</v-btn>
        </v-card-title>
                <div class="app-card-content">

                       <v-layout row wrap>
                            <v-flex xs12 sm12 md12 lg12>
                              <h4 style="font-weight: 700;">General Settings</h4>
                            </v-flex>
                            <v-flex xs12 sm6 md4 lg4  v-for="action in generalActions">
                              <v-checkbox
                                  :label="action.name"
                                  v-model="selectedActions"
                                  color="success"
                                  :title="action.name"
                                  :value="action.id"
                                  @change="saveNewRoleAction(action)"
                                  hide-details>
                                </v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm12 md12 lg12>
                              <h4 style="font-weight: 700;">SmartiWard Settings</h4>
                            </v-flex>
                            <v-flex xs12 sm6 md4 lg4  v-for="action in smartiWardActions">
                              <v-checkbox
                                  :label="action.name"
                                  v-model="selectedActions"
                                  color="success"
                                  :title="action.name"
                                  :value="action.id"
                                  @change="saveNewRoleAction(action)"
                                  hide-details>
                              </v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm12 md12 lg12>
                              <h4 style="font-weight: 700;">SmartiElection Settings</h4>
                            </v-flex>
                            <v-flex xs12 sm6 md4 lg4  v-for="action in smartiElectionActions">
                              <v-checkbox
                                  :label="action.name"
                                  v-model="selectedActions"
                                  color="success"
                                  :title="action.name"
                                  :value="action.id"
                                  @change="saveNewRoleAction(action)"
                                  hide-details>
                              </v-checkbox>
                            </v-flex>
                        </v-layout>
                </div>
      </div>
    </div> 

     <v-dialog v-model="createDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Add new Role</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="createDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>


                  <v-form v-model="newRole.valid" ref="form" lazy-validation>
                    <v-text-field
                      label="Name"
                      v-model="newRole.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Description"
                      v-model="newRole.description"
                    ></v-text-field>
                    <v-btn @click="saveNewRole" :disabled="!newRole.valid" class="btn-primary">submit</v-btn>
                    <v-btn @click="clear" class="btn-secondary">clear</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>

            <v-dialog v-model="editDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Update Role</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="editDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>


                  <v-form v-model="selectedRole.valid" ref="form" lazy-validation> 
                    <v-text-field
                      label="Name"
                      v-model="selectedRole.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Description"
                      v-model="selectedRole.description"
                    ></v-text-field>
                    <v-btn @click="updateRole" class="btn-primary">update</v-btn>
                    <v-btn @click="editDialogFlag = false" class="btn-secondary">cancel</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>

            <v-dialog v-model="deleteDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Delete Role {{selectedRole.name}} ?</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="deleteDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <p>Please sure selected Role will be removed permanently</p>
                    <v-btn @click="deleteRole" class="btn-primary">delete</v-btn>
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
        roles: [],
        generalActions : [],
        smartiWardActions : [],
        smartiElectionActions : [],
        selectedActions: [],
        selectedRole: {},
        selectAction: {},
        createDialogFlag: false,
        editDialogFlag: false,
        deleteDialogFlag: false,

        search: '',
        parliamentaryConstituencies: [],
        newRole: "",
        newRole: {
            name: "",
            description: "",
        } ,
        newroleAction: {
          securityActionsId: "",
          securityGroupId: "",
        }

      }
    },
    methods: {

      selectRole() {
           samparkService.getSecurityGroup(this.selectedRole.id).then((res) => {
            if (res.code == 201) {
                this.selectedActions = res.data;
              this.clear();
            } else {
            }
          })

      },
       saveNewRole() {
         var groupsActions = {
           name : this.newRole.name,
           description : this.newRole.description,
         }
        samparkService.saveNew('SecurityGroup',groupsActions).then((res) => {
          if (res.code == 201) {
            this.roles.push(res.data);
            this.selectedRole = res.data;
            this.selectRole();
            this.createDialogFlag = false;
            this.showSaveSuccessMessage();
            this.clear();
          } else {
            this.showSaveErrorMessage();
          }
        })
      },

      saveNewRoleAction(selectedItem) {
        var state = this.selectedActions.includes(selectedItem.id);
        samparkService.saveNewRoleAction(this.selectedRole.id,selectedItem.id,state).then((res) => {
          if (res.code == 201) {
            if(state){
               this.showSaveActionSuccessMessage();
            }else{
               this.showremoveActionSuccessMessage();
            }
            this.clear();
          } else {
            this.showSaveAcionErrorMessage();
          }
        })
      },

       deleteRole() {
          for(var i=0;i<this.selectedActions.length;i++){
                samparkService.saveNewRoleAction(this.selectedRole.id,this.selectedActions[i],false).then((res) => {
            if (res.code == 201) {
            } else {
            }
          })
        }
        samparkService.deleteById("SecurityGroup", this.selectedRole.id).then((res) => {
          if (res.code == 201) {
            this.roles.splice(this.roles.indexOf(this.selectedRole), 1);
            this.selectedRole = this.roles[0]
            this.selectRole()
            this.deleteDialogFlag = false;
            this.showDeleteSuccessMessage();
          } else  if (res.code == 320) {
              this.showDeleteAlertMessage();
            } else {
            this.showDeleteErrorMessage();
          }
        })
      },

      updateRole() {
        var role = {
          id : this.selectedRole.id,
          name : this.selectedRole.name,
          description : this.selectedRole.description
        };
        samparkService.update('SecurityGroup', role).then((res) => {
          if (res.code == 201) {
            this.showUpdateSuccessMessage();
            this.editDialogFlag= false;
            this.clear();
          } else {
            this.showUpdateErrorMessage();
          }
        })
      },
       clear() {
         this.newRole = {
            name: '',
            description: '',
            actions: []
        }
       }
    },
    beforeMount() {
      samparkService.getAll('SecurityGroup').then((res) => {
          this.roles = res.data;
          this.selectedRole = res.data[0]
          this.selectRole()
      })
         samparkService.getAll('SecurityActions').then((res) => {
          this.actions = res.data;
          this.generalActions = res.data.filter(map=> {
            return map.description == "General"
          })
          this.smartiWardActions = res.data.filter(map=> {
            return map.description == "SmartiWard"
          })
          this.smartiElectionActions = res.data.filter(map=> {
            return map.description == "SmartiElection"
          })


      })
      
    },
    notifications: {
      showSaveSuccessMessage: {
        title: 'Role saved',
        message: '',
        type: 'success',
        timeout: 2500
      },
       showSaveActionSuccessMessage: {
        title: 'Action saved',
        message: '',
        type: 'success',
        timeout: 2500
      },
       showSaveAcionErrorMessage: {
        title: 'Failed to save or removed Action',
        message: '',
        type: 'error',
        timeout: 2500
      },
       showremoveActionSuccessMessage: {
        title: 'Action removed',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showSaveErrorMessage: {
        title: 'Failed to save Role',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showUpdateSuccessMessage: {
        title: 'Role updated successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showUpdateErrorMessage: {
        title: 'Failed to updated Role',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showDeleteSuccessMessage: {
        title: 'Role deleted successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showDeleteErrorMessage: {
        title: 'Failed to delete Role',
        message: '',
        type: 'error',
        timeout: 2500
      },
       showDeleteAlertMessage: {
        title: 'This Role is Already Assingned to User',
        message: '',
        type: 'error',
        timeout: 2500
      }
    }

  }
</script>
