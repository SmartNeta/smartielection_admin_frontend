<style type="text/css">
  .container.grid-list-xl .layout .flex {
    padding: 0px 10px;
  }
  .app-card .app-card-content {
    padding: 0.5rem 1.25rem;
  }

  @media only screen and (max-width: 500px) {
    .app-card-content{
      margin-bottom: 50px;
    }
    .complaint_image{
      width:100%;
    }
  }
</style>
<template>
  <v-container grid-list-xl fluid>
      <div class="app-card">
      <div class="app-card-content">
          <v-form v-model="newComplaint.valid" ref="form" >
            <v-layout row wrap>
                <v-flex xs12 sm6>
                      <v-text-field
                      label="Voter Id "
                      v-model="voterId"
                      :rules="[v => !!v || 'Voter Id is required']"
                      required
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                      label="Mobile "
                      v-model="newComplaint.mobile"
                      :rules="[v => !!v || 'Voter Mobile Number is required']"
                      required
                    ></v-text-field>
               </v-flex>
            </v-layout>
             <v-layout row wrap>
                <v-flex xs12 sm6>
                    <v-select
                      label="Department " autocomplete  required
                      :items="departments"
                      v-model="selectedDeptId"
                      item-text="name" item-value="id"
                      :rules="[v => !!v || 'Item is required']"
                      required
                      v-on:input="filterDepartments()"
                    ></v-select>
             </v-flex>
             <v-flex xs12 sm6>
                    <v-select
                      label="Sub-Department " autocomplete  required
                      :items="filteredSubDepartments"
                      v-model="newComplaint.subDepartment"
                      item-text="name" item-value="name"
                      :return-object="true"
                      :rules="[v => !!v || 'Item is required']"
                      required
                    ></v-select>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
             <v-flex xs12 sm6>
                  <v-dialog
                          ref="datePickerone"
                          persistent
                          v-model="datePickerone"
                          lazy
                          full-width
                          width="290px"
                          :return-value.sync="newComplaint.tentativeDateOfCompletion"
                        >  
                          <v-text-field
                            slot="activator"
                            label="Tentative Date Of Completion"
                            v-model="newComplaint.tentativeDateOfCompletion"
                            prepend-icon="event"
                          >
                          </v-text-field>
                          <v-date-picker v-model="newComplaint.tentativeDateOfCompletion"  :min="nowDate" scrollable >
                            <v-spacer></v-spacer>
                            <v-btn flat class="btn-danger" @click="datePickerone = false">Cancel</v-btn>
                            <v-btn flat class="btn-primary" @click="$refs.datePickerone.save(newComplaint.tentativeDateOfCompletion)">OK</v-btn>
                          </v-date-picker>
                        </v-dialog>
             </v-flex>
             <v-flex xs12 sm6>
                    <v-select
                          label="Compliant-Source"
                          v-model="newComplaint.compliantSource"
                          :items="CompliantSources"
                          :rules="[v => !!v || 'Complaint-Source is required']"
                          required
                        ></v-select>
                </v-flex>
            </v-layout>
             <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-text-field
                      label="Complaint Text"
                      v-model="newComplaint.complaint"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                      label="Name "
                      v-model="newComplaint.name"
                    ></v-text-field>
               </v-flex>                
            </v-layout>
             <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-text-field
                      label="Latitude"
                      type="number"
                      v-model="newComplaint.latitude"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                      label="Longitude"
                      type="number"
                      v-model="newComplaint.longitude"
                    ></v-text-field>
               </v-flex>                
            </v-layout>            
            <v-layout row wrap>
              <v-flex xs12 sm12 style="text-align: center">
                    <img v-if="previewflag" class="complaint_image" style="height: 200px;" v-for="imageData in imageDataArray" v-bind:src="imageData">
              </v-flex>
            </v-layout>
            <v-layout row wrap style="margin-top:15px;" class="pb-4">
                <v-flex xs12 sm12>
                    <input type="file" @change="previewImage" accept="image/*">
                    <v-btn @click="saveNewComplaint" :disabled="!newComplaint.valid" class="btn-primary">submit</v-btn>
                    <v-btn @click="clear" class="btn-secondary">clear</v-btn>
               </v-flex>
            </v-layout>
        </v-form>
      </div>
    </div>  
  </v-container>
</template>

<script>
  import  * as samparkService from "./service";
  import FileSelect from './FileSelect.vue'
  import moment from 'moment';

  export default {
     components: {
        FileSelect
      },
    data () {
      return {
        items: [],
        loginUser : {},
        datePickerone: false,
        datePicker: false,
        file: null,
        previewflag: false,
        imageFiles: [],
        imageDataArray: [],
        citizens: [],
        departments: [],
        filteredSubDepartments: [],
        newComplaintvalue: [],
        CompliantSources: ["Call Center", "Postal", "Mobile","Website"],
        selectedDeptId: null,
        voterId: "",
        newComplaint: {
          valid: false,
          citizen: "",
          firstName: "",
          lastName: "",
          gender: "",
          dob: "",
          mobile: "",
          address: "",
          name: "",
          compliantSources: "",
          imageFile: null,
          longitude: null,
          latitude : null
        }
      }
    },
    methods: {
      previewImage: function(event) {
          var input = event.target;
          this.imageFiles = [];
          this.imageDataArray = [];
          for (var i = 0; i < input.files.length; i++) {
            this.imageFiles.push(input.files[i]);
            var reader = new FileReader();
            reader.onload = (e) => {
                this.imageData = e.target.result;
                this.imageDataArray.push(e.target.result);
                this.previewflag = true;
            }
            reader.readAsDataURL(input.files[i]);
          }
      },

      saveNewComplaint() {
        if(this.newComplaint && this.imageFiles.length == 0 && this.newComplaint.image){
          this.saveComplaintAfterImage();
        }else{
          if(this.newComplaint && this.imageFiles.length != 0){
            samparkService.saveImageFiles(this.imageFiles).then((res)=>{
              if (res.code == 201) {
                this.newComplaint.images = res.data;
                this.saveComplaintAfterImage();
              } else {
                this.showFileSaveErrorMessage();
              }
            });
          }else{
              this. saveComplaintAfterImage();
          }
        }
      },
      saveComplaintAfterImage(){
        samparkService.getCitizenByVoterId(this.voterId).then((res) => {
          if (res.code == 201) {
              this.newComplaint.citizen = res.data;
              if(this.newComplaint.mobile) {
                this.newComplaint.citizen.mobile = this.newComplaint.mobile;
                samparkService.update('Citizen',this.newComplaint.citizen).then((res) => {
                });
              }
              this.newComplaint.stateAssembly = res.data.booth.ward.assemblyConstituency.parliamentaryConstituency.district.stateAssembly;
              this.nextSave();
          } else if(res.code == 404) {
            this.showVoterIdNotFound();
          }
        });
      },
      nextSave(){
        samparkService.saveNewComplaint(this.newComplaint).then((res) => {
          if (res.code == 201) {
            this.showSaveSuccessMessage();
            this.$router.push('complaint');
          } else {
            this.showSaveErrorMessage();
          }
        }); 
      },
      clear() {
        this.newComplaint = {
          valid: false,
          firstName: "",
          lastName: "",
          gender: "",
          dob: "",
          mobile: "",
          address: "",
          nowDate: "",
          imageFiles: [],
          latitude : null,
          longitude : null
        };
        this.voterId = '',
        this.filteredSubDepartments=[],
        this.selectedDeptId = null
      },
      filterDepartments(){
        this.filteredSubDepartments = [];
        samparkService. getFilteredSubDepartment( this.selectedDeptId).then((res) => {
            this.filteredSubDepartments = res.data;
        }) 
      }, 
    },
    beforeMount() {
      this.loginUser =  window.localStorage.getItem('loginUser');
      this.loginUser = JSON.parse(this.loginUser);
      if(this.loginUser.user.type == 'dept user'){
        this.departments = this.loginUser.subDepartment.department;
        this.selectedDeptId = this.departments.id;
        this.filterDepartments();
      }else{
        samparkService.getAll('Department').then((res) => {
            this.departments = res.data;
        })
      }
      this.nowDate = new Date().toJSON();
      this.nowDate = String(this.nowDate).toString().slice(0, 10);   
    },
    notifications: {
      showSaveSuccessMessage: {
        title: 'Complaint saved',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showSaveErrorMessage: {
        title: 'Failed to save Complaint',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showFileSaveErrorMessage: {
        title: 'Failed to save file',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showFileNotAttachedError: {
        title: 'Please select file.',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showVoterIdNotFound: {
        title: 'Voter Id is Not Found.',
        message: '',
        type: 'error',
        timeout: 2500
      }
    }
  }
</script>
