<style type="text/css">
  .container.grid-list-xl .layout .flex {
    padding: 0px 10px;
  }
  .app-card .app-card-content {
    padding: 0.5rem 1.25rem;
  }
  .theme--light .toolbar, .application .theme--light.toolbar {
    color: #FFF;
}
</style>
<template>
  <v-container grid-list-xl fluid>
      <div class="app-card">
      <div class="app-card-content">
          <v-form v-model="newComplaint.valid" ref="form">
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
                  <v-text-field
                      label="Incident Id"
                      v-model="newComplaint.incidentId"
                      readonly="readonly"
                    ></v-text-field>
               </v-flex>
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
            </v-layout>
            <v-layout row wrap>
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
               <v-flex xs12 sm6>
                    <v-select
                          label="Compliant-Source "
                          v-model="newComplaint.compliantSource"
                          :items="CompliantSources"
                           :rules="[v => !!v || 'Item is required']"
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
                   <v-select 
                          label="Status"
                          v-model="newComplaint.status"
                          :items="CompliantStatus"
                          :rules="[userType == 'dept user' ? v => !!v || 'Status is required' : true]"
                          :required="(userType == 'dept user')"
                        ></v-select>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-dialog
                          ref="datePicker"
                          persistent
                          v-model="datePicker"
                          lazy
                          full-width
                          width="290px"
                        >  
                          <v-text-field 
                            slot="activator"
                            label= "Ddate Handed Over To Responsible Department"
                            v-model="newComplaint.dateHandedOverToResponsibleDepartment "
                            prepend-icon="event"
                            >
                          </v-text-field>
                          <v-date-picker v-model="newComplaint.dateHandedOverToResponsibleDepartment" scrollable >
                            <v-spacer></v-spacer>
                            <v-btn flat class="btn-danger" @click="datePicker = false">Cancel</v-btn>
                            <v-btn flat class="btn-primary" @click="$refs.datePicker.save(newComplaint.dateHandedOverToResponsibleDepartment)">OK</v-btn>
                          </v-date-picker>
                        </v-dialog>
                </v-flex>
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
                          <v-date-picker v-model="newComplaint.tentativeDateOfCompletion" scrollable >
                            <v-spacer></v-spacer>
                            <v-btn flat class="btn-danger" @click="datePickerone = false">Cancel</v-btn>
                            <v-btn flat class="btn-primary" @click="$refs.datePickerone.save(newComplaint.tentativeDateOfCompletion)">OK</v-btn>
                          </v-date-picker>
                        </v-dialog>
             </v-flex>
            </v-layout>
             <v-layout row wrap>
               <v-flex xs12 sm6>
                  <v-text-field
                    label="Action"
                    v-model="newComplaint.action"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Comments From Department"
                    v-model="newComplaint.commentsFromDepartment"
                  ></v-text-field>
                </v-flex>
            </v-layout>
             <v-layout row wrap>
               <v-flex xs12 sm6>
                  <v-text-field v-if="newComplaint.user !=null"
                    label="Assigned User"
                    v-model="assignedUser"
                    :disabled="true"
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
            </v-flex>
             <v-layout row wrap>
             <v-flex xs12 sm3 style="text-align: center">
                    <img v-if="previewflag" style="height: 200px;" v-for="imageData in imageDataArray" v-bind:src="imageData">
             </v-flex>
             <v-flex xs12 sm9 style="text-align: center">
                <v-flex v-for="complaintImage in complaintImages" style="display: inline-flex; position: relative;">
                  <img style="height: 200px" v-bind:src="getImagePath(complaintImage.image)">
                  <v-btn icon style="position: absolute;right: 10px;" @click="removeComplaintImage(complaintImage.id)" small>
                    <v-tooltip bottom>
                      <v-icon slot="activator">close</v-icon>
                      <span>Delete</span>
                    </v-tooltip>
                  </v-btn>
                </v-flex>
             </v-flex>
            </v-layout>

            <v-layout row wrap class="mb-4">
                <v-flex xs12 sm6>
                    <input v-if="complaintImages.length < 2" type="file" @change="previewImage" accept="image/*" multiple="multiple">
                    <v-btn @click="saveNewComplaint" :disabled="!newComplaint.valid" class="btn-primary">submit</v-btn>
                    <v-btn style="margin-left: 10px" to="/complaint" class="btn-secondary btn">cancel</v-btn>
               </v-flex>
                <v-flex xs12 sm6>
                </v-flex>
            </v-layout>            
        </v-form>
      </div>
    </div>  



    <div class="app-card" v-if="newComplaint.latitude">
      <div class="app-card-title">
        <h3>Incident Location</h3>
      </div>
      <div class="app-card-content">
        <gmap-map :center="center" :zoom="15" style="width: '100%'; height: 400px">
          <gmap-marker :position="markers.position" :clickable="true" :draggable="false" @click="center=markers.position"></gmap-marker>
        </gmap-map>
      </div>
    </div>


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
        center: {lat: 30.7, lng: 76.7},
        markers: {
          position: {lat: 30.7, lng: 76.7}
        },

        imageDataArray: [],
        items: [],
        Editflag: false,
        previewflag: false,
        datePickerone: false,
        datePicker: false,
        file: null,
        users:[],
        voterId: '',
        subDepartments: [],
        departments: [],
        filteredSubDepartments: [],
        CompliantSources: ["Call Center", "Postal", "Mobile","Website", "Volunteer"],
        CompliantStatus: ["Inprogress", "Resolved", "Ignore","Out Of Scope","Under Review"],
        StateAssemblys: [],
        newComplaintvalue: [],
        selectedState: '',
        userType: '',
        newCitizen: {},
        selectedDeptId: null,
        assignedUser: null,
        imageFiles: [],
        complaintImages: [],
        newComplaint: {
          valid: false,
          firstName: "",
          lastName: "",
          gender: "",
          dob: "",
          mobile: "",
          dateHandedOverToResponsibleDepartment: "",
          address: "",
          citizen: "",
          longitude : null,
          latitude : null
        }
      }
    },
    methods: {
      removeComplaintImage(complaintImageId) {
        samparkService.deleteById("ComplaintImages", complaintImageId).then((res) => {
          if (res.code == 201) {
            samparkService.getFilteredData('ComplaintImages', this.newComplaint.id).then((res) => {
              this.complaintImages = res.data;
            })
          }
        })

      },

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
              this.saveComplaintAfterImage();
          }
        }
      },
      saveComplaintAfterImage(){
        if(this.newComplaint.citizen) {
         samparkService.getCitizenByVoterId(this.voterId).then((res) => {
            if (res.code == 201) {
                this.newCitizen = res.data;
                this.newComplaint.citizen =  this.newCitizen ;
                if(this.newComplaint.mobile && this.newComplaint.citizen.mobile != this.newComplaint.mobile) {
                    this.newComplaint.citizen.mobile = this.newComplaint.mobile;
                    samparkService.update('Citizen',this.newComplaint.citizen).then((res) => {
                  });
                }
                this.nextSave();
            } else if(res.code == 404) {
              this.showVoterIdNotFound();
            }
          });
        } else {
            this.newComplaint.voterId = this.voterId;
            this.nextSave();
        }
      },
      nextSave(){
       samparkService.saveNewComplaint(this.newComplaint).then((res) => {
          if (res.code == 201) {
            this.showUpdateSuccessMessage();
            this.$router.push('complaint');
          } else {
            this.showUpdateErrorMessage();
          }
        }); 
      },
      filterDepartments(){
        this.filteredSubDepartments = [];
            samparkService. getFilteredSubDepartment( this.selectedDeptId).then((res) => {
            this.filteredSubDepartments = res.data;
        }) 
      },    
      getImagePath(imageName) {
        return samparkService.getServerApiPath() + '/mobile/download-image/' + imageName;
      },
    },
    beforeMount() {
      var data =  window.localStorage.getItem('loginUser');
      var user = JSON.parse(data);
      this.userType = (user.user.type !=null) ? user.user.type : "user";
      samparkService.getAll('Department').then((res) => {
        this.departments = res.data;
      })
      if(window.location.name){
        this.Editflag = true;
        this.newComplaint  = window.location.name;
        if(this.newComplaint.citizen != null){
          this.voterId = this.newComplaint.citizen.voterId ;
          this.newComplaint.mobile = this.newComplaint.citizen.mobile;
        } else {
          this.voterId = this.newComplaint.voterId;
        }
          
        if(this.newComplaint.tentativeDateOfCompletion!=null){
          this.newComplaint.tentativeDateOfCompletion=String(this.newComplaint.tentativeDateOfCompletion).toString().slice(0, 10);
        }
        if(this.newComplaint.dateHandedOverToResponsibleDepartment!=null){
          this.newComplaint.dateHandedOverToResponsibleDepartment=String(this.newComplaint.dateHandedOverToResponsibleDepartment).toString().slice(0, 10);
        }
        this.selectedDeptId = this.newComplaint.subDepartment.department;
        this.filteredSubDepartments.push(this.newComplaint.subDepartment);

        this.assignedUser = this.newComplaint.user ? this.newComplaint.user.firstName + ' ' + this.newComplaint.user.lastName : null; 
        
        this.center.lat = Number(this.newComplaint.latitude);
        this.center.lng = Number(this.newComplaint.longitude);
        this.markers.position.lat = Number(this.newComplaint.latitude);
        this.markers.position.lng = Number(this.newComplaint.longitude);
      }
      samparkService.getFilteredData('ComplaintImages', this.newComplaint.id).then((res) => {
        this.complaintImages = res.data;
      })
    },
    notifications: {
      showUpdateSuccessMessage: {
        title: 'Complaint updated successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showUpdateErrorMessage: {
        title: 'Failed to updated Complaint',
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
