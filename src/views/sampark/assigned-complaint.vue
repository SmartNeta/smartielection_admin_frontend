<style type="text/css">
  table.v-table tbody td {
    padding: 0px 7px !important;
  }
  .theme--light.v-btn {
    margin : 2px !important;
  }
  .theme--light .toolbar, .application .theme--light.toolbar {
    color: #FFF;
  }
  @media (max-width: 1750px) and (min-width: 320px) {
    #assignedTable .table thead tr th, #assignedTable .table thead tr td, #assignedTable  .table tbody tr th, #assignedTable .table tbody tr td {
      padding: 0 3px !important;
    }
  }  
</style>
<template>
    <v-container fluid grid-list-xl py-0>
    <div class="app-card">
      <div class="app-card-content">
        <v-card-title>
    <!--    <v-btn class="btn-primary" to="/createcomplaint">Add New</v-btn> -->
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search">
          </v-text-field>
        </v-card-title>
        <v-data-table id="assignedTable"
            v-bind:headers="headers"
            v-bind:items="complaints"
            v-bind:search="search">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.citizen ? props.item.citizen.voterId : props.item.voterId }}</td>
            <td class="text-xs-center">{{ props.item.citizen ? props.item.citizen.mobile : props.item.mobile }}</td>
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.incidentId }}</td>
            <td class="text-xs-center">{{ props.item.subDepartment.department.name }}</td>
            <td class="text-xs-center">{{ props.item.subDepartment.name }}</td>
            <td class="text-xs-center">{{ props.item.createdDate }}</td>
            <td class="text-xs-center text-danger" v-if = "props.item.user == null">Unassigned</td>            
            <td class="text-xs-center " v-else>{{ 'Assigned to ' + props.item.user.firstName + ' ' + props.item.user.lastName }}</td>
            <td class="text-xs-right">
              <v-btn icon @click="editComplaint(props.item)" ><v-tooltip bottom><v-icon  slot="activator">edit</v-icon>  <span>Edit</span>
                    </v-tooltip></v-btn>
              <v-btn icon @click="download(props.item)" ><v-tooltip bottom><v-icon slot="activator">file_download</v-icon><span>Download Image</span>
                    </v-tooltip></v-btn>
              <v-btn icon @click="removeComplaint(props.item)" small><v-tooltip bottom><v-icon slot="activator">close</v-icon><span>Delete</span>
                    </v-tooltip></v-btn>
            </td>
          </template>
          <template slot="pageText" slot-scope="{ pageStart, pageStop }">
            From {{ pageStart }} to {{ pageStop }}
          </template>
        </v-data-table>
      </div>
    </div>  
            <v-dialog v-model="deleteDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Delete Complaint {{selectedComplaint.name}} ?</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="deleteDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <div class="v-text-field">
                    <p>Are you sure to you selected Complaint will be deleted permanently?</p>
                  </div>
                    <v-btn @click="deleteComplaint" class="btn-primary">delete</v-btn>
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
        user : {},
        file: null,
        selectedComplaint: {},
        complaints: [],
        dialog: false,
        deleteDialogFlag: false,
        editDialogFlag: false,
        search: '',
        headers: [
          {
            text: 'VoterId',
            align: 'left',
            value: 'citizen.voterId',
            class: 'text-xs-center',
            width: '6.5%'
          },
          {
            text: 'Citizens Mo.',
            align: 'left',
            value: 'citizen.mobile',
            class: 'text-xs-center',
            width: '6.5%'
          },            
          {
            text: 'Name',
            value: 'name',
            class: 'text-xs-center',
            width: '11.5%'
          },
          {
            text: 'Incident Id',
            value: 'incidentId',
            class: 'text-xs-center',
            width: '11.5%'
          },
           {
            text: 'Department',
            value: 'subDepartment.department.name',
            class: 'text-xs-center',
            width: '11.5%'
          },
          {
            text: 'Sub-Department ',
            value: 'subDepartment.name',
            class: 'text-xs-center',
            width: '11.5%'
          },
          {
            text: 'Created date',
            value: 'createdDate',
            class: 'text-xs-center',
            width: '8.5%'
          },
          {
            text: 'Status',
            value: 'user.firstName',
            class: 'text-xs-center',
            width: '11.5%'
          },
          {
            text: 'Actions',
            sortable: false,
            value: 'actions',
            class: 'text-xs-center',
            width: '19.5%'
          }
        ],
        Complaints: []
      }
    },
    methods: {
      removeComplaint(Complaint) {
        this.selectedComplaint = Complaint;
        this.deleteDialogFlag = true;
      },
      deleteComplaint() {
        samparkService.deleteById("Complaint", this.selectedComplaint.id).then((res) => {
          if (res.code == 201) {
            this.deleteDialogFlag = false;
            this.showDeleteSuccessMessage();
            this.complaints.pop(this.selectedComplaint);
          } else {
            this.showDeleteErrorMessage();
          }
        })
      },
      editComplaint(Complaint) {
        window.location.name = Complaint;
        this.$router.push('editcomplaint');
      },

      download (complaint){
        if(complaint.id) {
          samparkService.getFilteredData('ComplaintImages', complaint.id).then((res) => {
            var complaintImages = res.data;
            for (var i = 0; i < complaintImages.length; i++) {
              if(!complaintImages[i].image || samparkService.downloadFile(complaintImages[i].image) > 1){
                this.showFileNotFoundMessage();
              }
            }
          })
        }
      }
    },
    beforeMount() {
      var data =  window.localStorage.getItem('loginUser');
      this.user = JSON.parse(data);

     samparkService.getComplaintByUser(this.user.id).then((res) => {
          this.complaints = res.data;
          for(var i=0; i< res.data.length; i++){
              this.complaints[i].createdDate = String(res.data[i].createdDate).toString().slice(0, 10);
          }
      })
      window.location.name = null;
    },
    notifications: {
      showDeleteSuccessMessage: {
        title: 'Complaint deleted successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showDeleteErrorMessage: {
        title: 'Failed to delete Complaint',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showFileNotFoundMessage: {
          title: 'File Not Found',
          message: '',
          type: 'error',
          timeout: 2500
        }
    }
  }
</script>
