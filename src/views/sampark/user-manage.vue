<style type="text/css">
    table.v-table tbody td {
    padding: 0px 7px !important;
  }
  .v-form > .container > .layout > .flex {
    padding: 5px 10px !important;
  }
.flex, .child-flex > * {
    padding: 0px 10px !important;
}
  .theme--light .toolbar, .application .theme--light.toolbar {
    color: #FFF;
}
</style>
<template>
    <v-container fluid grid-list-xl py-0>
    <div class="app-card">
      <div class="app-card-content">
        <v-card-title>
        <v-btn class="btn-primary"  @click.stop="dialog = true">Add New</v-btn>
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
            v-bind:items="userDetails"
            v-bind:search="search">
          <template slot="items" slot-scope="props">
             <td class="text-xs-center">{{ props.item.firstName }}</td>
              <td class="text-xs-center">{{ props.item.lastName }}</td>
            <td class="text-xs-center">{{ props.item.email ? props.item.email : '' }}</td>
            <td class="text-xs-center">{{ props.item.phone ? props.item.phone : '' }}</td>  
             <td class="text-xs-center" :aria-valuemin="10">{{ props.item.rol }}</td>
            <td class="text-xs-center">{{ props.item.stateAssembly ? props.item.stateAssembly.state : '' }}</td>
            <td class="text-xs-center">
              <v-btn icon @click="editUser(props.item)" ><v-tooltip bottom><v-icon  slot="activator">edit</v-icon>  <span>Edit</span>
                    </v-tooltip></v-btn>
              <v-btn icon @click="removeUser(props.item)"><v-tooltip bottom><v-icon slot="activator">close</v-icon><span>Delete</span>
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
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Add new User</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="dialog = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <v-form v-model="newUser.valid" ref="form">
                   <v-container grid-list-xl fluid py-0>
                       <v-layout row wrap>
                        <v-flex xs12 sm6>
                           <v-text-field
                            label="First Name "
                            v-model="newUser.firstName"
                            :rules="[v => !!v || 'First Name is required']"
                            required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                            label="Last Name"
                            v-model="newUser.lastName"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                     <v-layout row wrap>
                        <v-flex xs12 sm6>
                           <v-text-field
                            label="User Name "
                            v-model="newWebUser.username"
                            :rules="[v => !!v || 'User Name is required']"
                            required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                            label="Password "
                            v-model="newWebUser.password"
                            :rules="[v => !!v || 'Password is required']"
                            required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm6>
                           <v-text-field
                            label="Email "
                            v-model="newUser.email"
                             :rules="emailRules"
                             required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                            label="Phone No."
                            type="number"
                            v-model="newUser.phone"
                           :counter="10"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm6>
                        <v-select
                            label="Role " autocomplete  required
                            :items="Roles"
                            v-model="newWebUser.roles"
                            item-text="name" item-value="name"
                            :return-object="true"
                            :rules="[v => !!v || 'Role is required']"
                            required
                            multiple
                            ></v-select> 
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-select
                            label="State " autocomplete  required
                            :items="StateAssemblies"
                            v-model="newUser.stateAssembly"
                            item-text="state" item-value="state"
                            :return-object="true"
                            :rules="[v => !!v || 'Item is required']"
                            required
                            ></v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                       <v-flex xs12 sm6>
                             <v-btn @click="saveNewUser" :disabled="!newUser.valid" class="btn-primary">submit</v-btn>
                            <v-btn @click="clear" class="btn-secondary">clear</v-btn>
                        </v-flex>
                       
                    </v-layout>
                    </v-container>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>

            <v-dialog v-model="editDialogFlag" max-width="650px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Update User</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="closePop" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <v-form v-model="selectedUser.valid" ref="form">
                   <v-container grid-list-xl fluid py-0>
                       <v-layout row wrap>
                        <v-flex xs12 sm6>
                           <v-text-field
                            label="First Name "
                            v-model="selectedUser.firstName"
                            :rules="[v => !!v || 'First Name is required']"
                            required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                            label="Last Name"
                            v-model="selectedUser.lastName"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                     <v-layout row wrap>
                        <v-flex xs12 sm6>
                           <v-text-field
                            label="User Name "
                            v-model="selectedWebUser.username"
                            :rules="[v => !!v || 'User Name is required']"
                            required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                            label="Password "
                            v-model="selectedWebUser.password"
                            :rules="[v => !!v || 'Password is required']"
                            required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm6>
                           <v-text-field
                            label="Email "
                            v-model="selectedUser.email"
                              :rules="emailRules"
                               required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                            label="Phone No."
                            type="number"
                            :counter="10"
                            v-model="selectedUser.phone"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm6>
                           <v-select
                            label="Role " autocomplete  required
                            :items="Roles"
                            v-model="selectedWebUser.roles"
                            item-text="name" item-value="name"
                            :return-object="true"
                            :rules="[v => !!v || 'Role is required']"
                            required
                            multiple
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-select
                            label="State " autocomplete  required
                            :items="StateAssemblies"
                            v-model="selectedUser.stateAssembly"
                            item-text="state" item-value="state"
                            :return-object="true"
                            :rules="[v => !!v || 'Item is required']"
                            required
                            ></v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 sm6>
                             <v-btn @click="UpdateUser" :disabled="!(selectedUser.valid)" class="btn-primary">submit</v-btn>
                             <v-btn @click="closePop" class="btn-secondary">cancle</v-btn>
                        </v-flex>
                        
                    </v-layout>
                  </v-container>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>


            <v-dialog v-model="deleteDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Delete Complaint {{selectedUser.firstNames}} ?</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="deleteDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <div class="v-text-field">
                    <p>Are you sure to you selected User will be deleted permanently?</p>
                  </div>
                    <v-btn @click="deleteUserInfo" class="btn-primary">delete</v-btn>
                    <v-btn @click="deleteDialogFlag = false" class="btn-secondary">cancel</v-btn>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>

  </v-container>
</template>




<script>
  import * as samparkService from "./service";
  import FileSelect from './FileSelect.vue';
  import moment from 'moment';

  import VueMultiselect from 'vue-multiselect';
   

  export default {
     components: {
        FileSelect
      },
    data () {
      return {
        items: [],
        StateAssemblies: [],
        stateAssembly: {},
        newComplaintvalue: [],
        sortUser: [],
        Roles: [],
        selectedRoles: [],
        
        newUser: {
          valid: false,
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          user: "",
          stateAssembly: "",
        },    
        newWebUser: {
          username: "",
          password: "",
          roles: [],
          type: "user"
        } ,
        newRole: {
          id: "",
          name: ""
        },
        selectedUser: { valid: true },
        selectedWebUser: { valid: true },

        dialog: false,
        deleteDialogFlag: false,
        editDialogFlag: false,
        search: '',
        headers: [
            {
            text: 'First Name',
            align: 'left',
            value: 'firstName',
            class: 'text-xs-center',
            width: '13.5%'
          },
            {
            text: 'Last Name',
            align: 'left',
            value: 'lastName',
            class: 'text-xs-center',
            width: '13.5%'
          },
          {
            text: 'Email',
            value: 'email',
            class: 'text-xs-center',
            width: '13.5%'
          },
          {
            text: 'Phone No',
            value: 'phone',
            class: 'text-xs-center',
            width: '13.5%'
          },
          {
            text: 'Roles',
            value: 'rol',
            class: 'text-xs-center',
            width: '13.5%'
          },
          {
            text: 'State',
            value: 'stateAssembly.state',
            class: 'text-xs-center',
            width: '13.5%'
          },
          {
            text: 'Actions',
            sortable: false,
            value: 'actions',
            class: 'text-xs-center',
            width: '19%'
          }
        ],
        users: [],
        userDetails: []
      }
    },
    methods: {
       closePop(){
        this.selectedUser= { valid: true},
        this.selectedWebUser= { valid: true},
        this.editDialogFlag = false
      },
      removeUser(user) {

        this.selectedUser = user;
        this.selectedUser.user.roles = null;
        this.selectedWebUser = this.selectedUser.user;
        this.deleteDialogFlag = true;
      },
      deleteUserInfo() {
        samparkService.deleteById("UserDetail", this.selectedUser.id).then((res) => {
          if (res.code == 201) {
            this.deleteUserDetail();
          } else {
            this.showDeleteErrorMessage();
          }
        })
      },
       deleteUserDetail() {
        samparkService.deleteById("User", this.selectedWebUser.id).then((res) => {
          if (res.code == 201) {
            this.deleteDialogFlag = false;
            this.showDeleteSuccessMessage();
            this.userDetails.pop(this.selectedUser);
          } else {
            this.showDeleteErrorMessage();
          }
        })
      },
       editUser(user) {
        this.selectedUser = user;
        this.selectedWebUser = this.selectedUser.user;
        this.editDialogFlag = true;
      },
       UpdateUser() {
          if(this.selectedWebUser.roles.length >0){
              samparkService.update('User', this.selectedWebUser).then((res) => {
                if (res.code == 201) {
                    this.UpdateUserDetail();
                } else {
                  this.showUpdateErrorMessage();
                }
              })
            } else {
                  this.pleasSelectRoleMessage();
          }
      },
      UpdateUserDetail() {
        samparkService.update('UserDetail', this.selectedUser).then((res) => {
          if (res.code == 201) {
            this.editDialogFlag = false;
            this.showUpdateSuccessMessage();
            this.closePop();
          } else {
            this.showUpdateErrorMessage();
          }
        })
      },

      saveNewUser() {
          if(this.newWebUser.roles.length >0){
            samparkService.saveNew('User', this.newWebUser).then((res) => {
              if (res.code == 201) {
              this.newUser.user = res.data ;
              this.saveUserDetail();
             } else if(res.code == 500) {
                  this.showSaveErrorMessage();
                } else if(res.code == 11540) {
                  this.userNameExistsMessage();
                }
            })
          } else {
              this.pleasSelectRoleMessage();
          }
      },
      saveUserDetail () {
        samparkService.saveNew('UserDetail', this.newUser).then((res) => {
          if (res.code == 201) {
            if(res.data.user.type == 'user'){
              var rol = '';
              for(var j=0 ; j < res.data.user.roles.length; j++){
                if(j != 0 ) {
                  rol = rol + ","
                }
                rol = rol + res.data.user.roles[j].name;
              }
              res.data.rol = rol;
            }
            this.userDetails.push(res.data);
            this.dialog = false;
            this.showSaveSuccessMessage();
            this.clear();
            samparkService.sendUserNotification(res.data.id)
          }  else if(res.code == 500) {
              this.showSaveErrorMessage();
            } else if(res.code == 11540) {
              this.userNameExistsMessage();
            }
        })
      },
      clear() {
         this.newUser = {
          valid: false,
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          stateAssembly: "",
        },
         this.newWebUser ={
          username: "",
          password: "",
          roles: [],
          type: "user"
        }
        this.newUser.stateAssembly = this.stateAssembly;
      }
    },
    filterCitizen(filterdOn){
      this.Citizens = [];
      if(filterdOn == "state"){
        this.filteredParliamentaryConstituencies = [];
        this.filteredDistricts = [];
        this.filteredAssemblyConstituencies = [];
        this.filteredWards = [];
        for (var i = 0; i < this.parliamentaryConstituencies.length; i++) {
          if(this.selectedState == this.parliamentaryConstituencies[i].stateAssembly.id){
            this.filteredParliamentaryConstituencies.push(this.parliamentaryConstituencies[i]);
          }
        }
        this.selectedParlimentary = null;
        this.selectedDistrict = null;
        this.selectedAssembly = null;
        this.selectedWard = null;
      } else if(filterdOn == "PC"){
        this.filteredDistricts = [];
        this.filteredAssemblyConstituencies = [];
        this.filteredWards = [];
        for (var i = 0; i < this.districts.length; i++) {
          if(this.selectedParlimentary == this.districts[i].parliamentaryConstituency.id){
            this.filteredDistricts.push(this.districts[i]);
          }
        }
        this.selectedDistrict = null;
        this.selectedAssembly = null;
        this.selectedWard = null;
      } else if(filterdOn == "district"){
        this.filteredAssemblyConstituencies = [];
        this.filteredWards = [];
        for (var i = 0; i < this.assemblyConstituencies.length; i++) {
          if(this.selectedDistrict == this.assemblyConstituencies[i].district.id){
            this.filteredAssemblyConstituencies.push(this.assemblyConstituencies[i]);
          }
        }
        this.selectedAssembly= null;
        this.selectedWard = null;
      } else if(filterdOn == "assembly"){
        this.filteredWards = [];
        for (var i = 0; i < this.wards.length; i++) {
          if(this.selectedAssembly == this.wards[i].assemblyConstituency.id){
            this.filteredWards.push(this.wards[i]);
          }
        }
        this.selectedWard = null;
      } else if (filterdOn == "ward"){
        if(this.selectedWard){
          this.showLoader();
          samparkService.getCitizenByWard(this.selectedWard).then(res => {
          this.Citizens = res.data;
          this.hideLoader();
          });
        }
      } else{

      }
    },
     computed: {

      emailRules() {
        return [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
      }
    },
    beforeMount() {

      var data =  window.localStorage.getItem('loginUser');
      data = JSON.parse(data);
      if(data.stateAssembly != null) {
        this.stateAssembly = data.stateAssembly;
          this.StateAssemblies.push(this.stateAssembly);
        samparkService.userByState().then((res) => {
          var userDate = res.data;
          for(var i=0;i< userDate.length;i++){
                if(res.data[i].user.type == 'user'){
                    var rol = '';
                    for(var j=0;j<res.data[i].user.roles.length;j++){
                      if(j != 0){
                        rol = rol + ","
                      }
                      rol = rol + res.data[i].user.roles[j].name;
                    }
                    res.data[i].rol = rol;
                    this.userDetails.push(res.data[i]);
                }
            }
        })
      } else {
        this.stateAssembly = null;
         samparkService.getAll('StateAssembly').then((res) => {
              this.StateAssemblies = res.data;
          })
          samparkService.getAll('UserDetail').then((res) => {
          var userDate = res.data;
          for(var i=0;i< userDate.length;i++){
                if(res.data[i].user.type == 'user'){
                    var rol = '';
                    for(var j = 0; j < res.data[i].user.roles.length; j++){
                      if(j != 0) {
                        rol = rol + ","
                      }
                      rol = rol + res.data[i].user.roles[j].name;
                    }
                    res.data[i].rol = rol;
                    this.userDetails.push(res.data[i]);
                }
            }
        })
      }
      
       samparkService.getAll('SecurityGroup').then((res) => {
          this.Roles = res.data;
      })
    },
    notifications: {
      showSaveSuccessMessage: {
        title: 'User saved',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showSaveErrorMessage: {
        title: 'Failed to save User',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showUpdateSuccessMessage: {
        title: 'User updated successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showUpdateErrorMessage: {
        title: 'Failed to updated User',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showDeleteSuccessMessage: {
        title: 'User deleted successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showDeleteErrorMessage: {
        title: 'Failed to delete User',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showFileNotFoundMessage: {
          title: 'File Not Found',
          message: '',
          type: 'error',
          timeout: 2500
        },
         pleasSelectRoleMessage: {
          title: 'Please Select Roles',
          message: '',
          type: 'error',
          timeout: 2500
        },
         userNameExistsMessage: {
          title: 'User Name Already Exists',
          message: '',
          type: 'error',
          timeout: 2500
        }
    }
  }
</script>