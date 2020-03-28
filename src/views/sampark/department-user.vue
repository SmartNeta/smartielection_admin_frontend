<style type="text/css">
  table.v-table tbody td {
    padding: 0px 10px !important;
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
             <td class="text-xs-left">{{ props.item.firstName }}</td>
              <td class="text-xs-left">{{ props.item.lastName }}</td>
            <td class="text-xs-left">{{ props.item.department ? props.item.department.name : '' }}</td>
            <td class="text-xs-left">{{ props.item.subDepartment ? props.item.subDepartment.name : '' }}</td>
            <td class="text-xs-left">{{ props.item.stateAssembly ? props.item.stateAssembly.state : '' }}</td>
            <td class="text-xs-left">{{ props.item.district ? props.item.district.name : '' }}</td>
            <td class="text-xs-left">{{ props.item.assemblyConstituency && props.item.assemblyConstituency.name ? props.item.assemblyConstituency.name  : '' }}</td>
            <td class="text-xs-center">
              <v-btn icon @click="editUser(props.item)" ><v-tooltip bottom><v-icon  slot="activator">edit</v-icon>  <span>Edit</span>
                    </v-tooltip></v-btn>
              <v-btn icon @click="removeUser(props.item)" small><v-tooltip bottom><v-icon slot="activator">close</v-icon><span>Delete</span>
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
                            label="Email  "
                            type="email"
                            v-model="newUser.email"
                            :rules="emailRules"
                            required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                            label="Phone No."
                            v-model="newUser.phone"
                            type="number"
                            :counter="10"  
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                     <v-layout row wrap>
                        <v-flex xs12 sm6>
                           <v-select
                            label="Department " autocomplete  required
                            :items="departments"
                            v-model="newUser.department"
                            item-text="name" item-value="name"
                            :rules="[v => !!v || 'Item is required']"
                            :return-object="true"
                            required
                            v-on:input="filterDepartments()"
                            ></v-select>
                    </v-flex>
                        <v-flex xs12 sm6>
                            <v-select
                                label="Sub-Department " autocomplete  required
                                :items="filteredSubDepartments"
                                v-model="newUser.subDepartment"
                                item-text="name" item-value="name"
                                :return-object="true"
                                :rules="[v => !!v || 'Item is required']"
                                required
                            ></v-select>
                     </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm6>
                            <v-select
                            label="State " autocomplete  required
                            :items="stateAssemblies"
                            v-model="newUser.stateAssembly"
                            item-text="state" item-value="state"
                            :return-object="true"
                            :rules="[v => !!v || 'Item is required']"
                            required
                            v-on:input="filterCitizen('state')"
                            ></v-select>
                        </v-flex>
                         <v-flex xs12 sm6>
                            <v-select
                            label="District " autocomplete  required
                            :items="filteredDistricts"
                            v-model="newUser.district"
                            item-text="name" item-value="name"
                            :return-object="true"
                            :rules="[v => !!v || 'Item is required']"
                            required
                            v-on:input="filterCitizen('district')"
                            ></v-select>
                        </v-flex>
                    </v-layout>
                     <v-layout row wrap>
                       <v-flex xs12 sm6>
                           <v-select
                            label="Assemblys Constituency " autocomplete  required
                            :items="filteredAssemblyConstituencies"
                            v-model="newUser.assemblyConstituency"
                            item-text="name" item-value="name" 
                            :return-object="true"
                            v-on:input="filterCitizen('assemblyConstituency')"
                            ></v-select>
                        </v-flex>
                       <v-flex xs12 sm6>
                            <v-select
                            label="Ward*" autocomplete  required
                            :items="filteredWards"
                            v-model="newUser.ward"
                            item-text="name" item-value="name" 
                            :return-object="true"
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
                            v-model="selectedUser.phone"
                            :counter="10"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                     <v-layout row wrap>
                        <v-flex xs12 sm6>
                           <v-select
                            label="Department " autocomplete  required
                            :items="departments"
                            v-model="selectedUser.department"
                            item-text="name" item-value="name"
                            :rules="[v => !!v || 'Item is required']"
                            required
                            :return-object="true"
                            v-on:input="filterDepartments()"
                            ></v-select>
                    </v-flex>
                        <v-flex xs12 sm6>
                            <v-select
                                label="Sub-Department " autocomplete  required
                                :items="filteredSubDepartments"
                                v-model="selectedUser.subDepartment"
                                item-text="name" item-value="name"
                                :return-object="true"
                                :rules="[v => !!v || 'Item is required']"
                                required
                            ></v-select>
                     </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm6>
                            <v-select
                            label="State " autocomplete  required
                            :items="stateAssemblies"
                            v-model="selectedUser.stateAssembly"
                            item-text="state" item-value="state"
                            :return-object="true"
                            :rules="[v => !!v || 'Item is required']"
                            required
                            v-on:input="filterCitizen('state')"
                            ></v-select>
                        </v-flex>
                         <v-flex xs12 sm6>
                            <v-select
                            label="District " autocomplete  required
                            :items="filteredDistricts"
                            v-model="selectedUser.district"
                            item-text="name" item-value="name"
                            :return-object="true"
                            :rules="[v => !!v || 'Item is required']"
                            required
                            v-on:input="filterCitizen('district')"
                            ></v-select>
                        </v-flex>
                    </v-layout>
                     <v-layout row wrap>
                       <v-flex xs12 sm6>
                           <v-select
                            label="Assemblys Constituency " autocomplete  required
                            :items="filteredAssemblyConstituencies"
                            v-model="selectedUser.assemblyConstituency"
                            item-text="name" item-value="name" 
                            :return-object="true"
                            v-on:input="filterCitizen('assemblyConstituency')"
                            ></v-select>
                        </v-flex>
                       <v-flex xs12 sm6>
                            <v-select
                            label="Ward*" autocomplete  required
                            :items="filteredWards"
                            v-model="selectedUser.ward"
                            item-text="name" item-value="name" 
                            :return-object="true"
                            ></v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 sm6>
                             <v-btn @click="UpdateUser" :disabled="!selectedUser.valid" class="btn-primary">submit</v-btn>
                             <v-btn @click="closePop" class="btn-secondary">cancle</v-btn>
                        </v-flex>
                        <v-flex xs12 sm6>
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
  import FileSelect from './FileSelect.vue'
  import moment from 'moment';

  export default {
     components: {
        FileSelect
      },
    data () {
      return {
        items: [],
        stateAssemblies: [],
        newComplaintvalue: [],
        filteredStateAssembly: [],
        filteredDistricts: [],
        filteredAssemblyConstituencies: [],
        filteredWards: [],
        selectFlag: false,
        departments: [],
        filteredSubDepartments: [],

        newUser: {
          valid: false,
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          user: "",
          stateAssembly: "",
          district :"",
        },    
        newWebUser: {
          username: "",
          password: "",
          type: "dept user"
        } ,
        selectedUser: { valid: true},
        selectedWebUser: { valid: true},

        dialog: false,
        deleteDialogFlag: false,
        editDialogFlag: false,
        search: '',
        headers: [
            {
            text: 'First Name',
            align: 'left',
            value: 'firstName',
            width: '11%'
          },
            {
            text: 'Last Name',
            align: 'left',
            value: 'lastName',
            width: '11%'
          },
          {
            text: 'Department',
            value: 'department.name',
            width: '11%'
          },
          {
            text: 'Sub Department',
            value: 'subDepartment.name',
            width: '11%'
          },
          {
            text: 'State',
            value: 'stateAssembly.state',
            width: '11%'
          },
          {
            text: 'District',
            value: 'district.name',
            width: '11%'
          },
           {
            text: 'Assembly',
            value: 'assemblyConstituency.name',
            width: '11%'
          },
          {
            text: 'Actions',
            sortable: false,
            value: 'actions',
            class: 'text-xs-center',
            width: '23%'
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
        this.selectFlag = false;
        this.editDialogFlag = false
        this.clear();
      },

      removeUser(user) {
        this.selectedUser = user;
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
        this.filteredSubDepartments.push(this.selectedUser.subDepartment);
        this.newUser.stateAssembly = user.stateAssembly;
        this.newUser.district = user.district;
        this.newUser.assemblyConstituency = user.assemblyConstituency;
        this.newUser.ward = user.ward;
        this.selectFlag = true;
        this.filterCitizen('state');
        this.filterCitizen('district');
        this.filterCitizen('assemblyConstituency');
        this.editDialogFlag = true;
      },
       UpdateUser() {
        samparkService.update('User', this.selectedWebUser).then((res) => {
          if (res.code == 201) {
              this.UpdateUserDetail();
          } else {
            this.showUpdateErrorMessage();
          }
        })
      },
      UpdateUserDetail() {
        samparkService.update('UserDetail', this.selectedUser).then((res) => {
          if (res.code == 201) {
            this.editDialogFlag = false;
            this.showUpdateSuccessMessage();
            this.closePop();
            this.clear();
          } else {
            this.showUpdateErrorMessage();
          }
        })
      },

      saveNewUser() {
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
      },
      saveUserDetail () {
        samparkService.saveNew('UserDetail', this.newUser).then((res) => {
          if (res.code == 201) {
            this.userDetails.push(res.data);
            this.dialog = false;
            this.showSaveSuccessMessage();
            this.clear();
            samparkService.sendUserNotification(res.data.id)
           } else if(res.code == 500) {
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
          phone: null,
          user: "",
          stateAssembly: "",
          district :'',
        },
         this.newWebUser= {
          username: "",
          password: "",
          type: "dept user"
        } 
        this.filteredDistricts = [],
        this.filteredAssemblyConstituencies =[],
        this.filteredWards =[],
        this.filteredSubDepartments =[]
      },
      filterDepartments(){
        if(this.selectFlag){
           this.newUser.department = this.selectedUser.department;
         }
            this.filteredSubDepartments = [];
            samparkService. getFilteredSubDepartment( this.newUser.department.id).then((res) => {
              this.filteredSubDepartments = res.data;
          })   
      }, 
    filterCitizen(filterdOn){
      if(this.selectFlag){
           this.newUser.stateAssembly = this.selectedUser.stateAssembly;
           this.newUser.district = this.selectedUser.district;
      }
      if(filterdOn == "state"){
        this.filteredParliamentaryConstituencies = [];
        this.filteredDistricts = [];
        this.filteredAssemblyConstituencies = [];
        this.filteredWards = [];
        samparkService.getFilteredData('District',this.newUser.stateAssembly.id ).then(res => {
          this.filteredDistricts = res.data;
        });
        this.selectedAssembly = null;
        this.filteredParliamentaryConstituencies = [];

      } else if(filterdOn == "district"){
            this.filteredParliamentaryConstituencies = [];
            this.filteredWards = [];
            samparkService.getFilteredData('ParliamentaryConstituency',this.newUser.district.id ).then(res => {
              var fParliamentaryConstituencies = res.data;
              this.filteAC(res.data);
            });
      } else if(filterdOn == "assemblyConstituency"){
            this.filteredWards = [];
            samparkService.getFilteredData('Ward',this.newUser.assemblyConstituency.id ).then(res => {
              this.filteredWards = res.data;
            });
      }
    },
    filteAC (ParliamentaryC){
          for(var j = 0;j < ParliamentaryC.length;j++){
              samparkService.getFilteredData('AssemblyConstituency',ParliamentaryC[j].id ).then(res => {
                for(var i=0; i< res.data.length;i++){
                    this.filteredAssemblyConstituencies.push(res.data[i]);
                }
              });
          }
    }
    },
     computed: {

      emailRules() {
        return [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
      },
      mobileRules() {
        return [
          v => !!v || 'Mobile No is required',
          v => v.length==10 || 'Mobile No must be valid 10 digit'
        ]
      },
     
    },
    beforeMount() {
      var data =  window.localStorage.getItem('loginUser');
      data = JSON.parse(data);
      
      if(data.stateAssembly != null){
          this.stateAssembly = data.stateAssembly;
         // this.selectedUser.stateAssembly = this.stateAssembly;
         // this.newUser.stateAssembly = this.stateAssembly;
          this.stateAssemblies.push(this.stateAssembly);

          samparkService.userByState().then((res) => {
                for(var i=0;i<res.data.length;i++){
                    if(res.data[i].user.type == 'dept user')
                            this.userDetails.push(res.data[i]);
                }
          })
      } else {
          samparkService.getAll('StateAssembly').then((res) => {
              this.stateAssemblies = res.data;
          })
          samparkService.getAll('UserDetail').then((res) => {
          var userDate = res.data;
          for(var i=0;i<res.data.length;i++){
                    if(res.data[i].user.type == 'dept user')
                            this.userDetails.push(res.data[i]);
                }
        })
      }
      
      //samparkService.getAll('StateAssembly').then((res) => {
          //this.stateAssemblies = res.data;
      //})     
       samparkService.getAll('Department').then((res) => {
          this.departments = res.data;
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
         userNameExistsMessage: {
          title: 'User Name Already Exists',
          message: '',
          type: 'error',
          timeout: 2500
        }
    }
  }
</script>