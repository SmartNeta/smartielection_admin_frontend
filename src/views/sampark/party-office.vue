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
            v-bind:items="partyOffices"
            v-bind:search="search">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.address }}</td>
            <td class="text-xs-center">{{ props.item.assemblyConstituency.name}}</td>
            <td class="text-xs-center">
              <v-btn icon @click="editPartyOffic(props.item)"><v-tooltip bottom><v-icon  slot="activator">edit</v-icon>  <span>Edit</span>
                    </v-tooltip></v-btn>
              <v-btn icon @click="removePartyOffic(props.item)"><v-tooltip bottom><v-icon slot="activator">close</v-icon><span>Delete</span>
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
                  <v-toolbar-title>Add new Party Office</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="createDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>


                  <v-form v-model="newPartyOffice.valid" ref="form">
                    <v-text-field
                      label="Name "
                      v-model="newPartyOffice.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Address"
                      v-model="newPartyOffice.address"
                    ></v-text-field>
                     <v-text-field
                      label="Latitude "
                      v-model="newPartyOffice.latitude"
                    ></v-text-field>
                    <v-text-field
                      label="Longitude"
                      v-model="newPartyOffice.longitude"
                    ></v-text-field>
                    <v-select
                        label="Assembly Constituency " autocomplete  required
                        :items="assemblyConstituencies"
                        v-model="newPartyOffice.assemblyConstituency"
                        item-text="name" item-value="name"
                        :return-object="true"
                        :rules="[v => !!v || 'Item is required']"
                        required
                    ></v-select>
                    <v-btn @click="saveNewPartyOffice" :disabled="!newPartyOffice.valid" class="btn-primary">submit</v-btn>
                    <v-btn @click="clear" class="btn-secondary">clear</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>


            <v-dialog v-model="editDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Update Party Office</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="closePop" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <v-form v-model="selectedpartyOffice.valid" ref="form">
                     <v-text-field
                      label="Name "
                      v-model="selectedpartyOffice.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Address"
                      v-model="selectedpartyOffice.address"
                    ></v-text-field>
                      <v-text-field
                      label="Latitude "
                      v-model="selectedpartyOffice.latitude"
                    ></v-text-field>
                    <v-text-field
                      label="Longitude"
                      v-model="selectedpartyOffice.longitude"
                    ></v-text-field>
                    <v-select
                        label="Assembly Constituency " autocomplete  required
                        :items="assemblyConstituencies"
                        v-model="selectedpartyOffice.assemblyConstituency"
                        item-text="name" item-value="name"
                        :return-object="true"
                        :rules="[v => !!v || 'Item is required']"
                        required
                    ></v-select>
                    <v-btn @click="updatePartyOffic" :disabled="!selectedpartyOffice.valid" class="btn-primary">update</v-btn>
                    <v-btn @click="closePop" class="btn-secondary">cancel</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>

            <v-dialog v-model="deleteDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Delete Party Office {{selectedpartyOffice.name}} ?</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="deleteDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <p>Please sure selected Party Office will be removed permanently</p>
                    <v-btn @click="deletePartyOffic" class="btn-primary">delete</v-btn>
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
        selectedpartyOffice: { valid:true},
        newPartyOffice: {
          valid: false,
          name: "",
          address: "",
          assemblyConstituency: ""
        },
        assemblyConstituencies: [],
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
            text: 'Address',
            align: 'center',
            value: 'address'
          },
            {
            text: 'Assembly Constituency',
            align: 'center',
            value: 'assemblyConstituency.name'
          },
          {
            text: 'Actions',
            align: 'center',
            sortable: false,
            value: 'actions'
          }
        ],
        partyOffices:[]
      }
    },
    methods: {

      closePop(){
        this.selectedpartyOffice= { valid: true},
        this.editDialogFlag = false
      },

      removePartyOffic(PartyOffic) {
        this.selectedpartyOffice = PartyOffic;
        this.deleteDialogFlag = true;
      },

      deletePartyOffic() {
        samparkService.deleteById("PartyOffice", this.selectedpartyOffice.id).then((res) => {
          if (res.code == 201) {
            this.partyOffices.splice(this.partyOffices.indexOf(this.selectedpartyOffice), 1);
            this.deleteDialogFlag = false;
            this.showDeleteSuccessMessage();
          } else {
            if(res.code == 320 ){
              this.showDeleteAlertMessage();
            }else{
              this.showDeleteErrorMessage();
            }
          }
        })
      },

      editPartyOffic(PartyOffic) {
        this.selectedpartyOffice = PartyOffic;
        this.editDialogFlag = true;
      },

      updatePartyOffic() {
        samparkService.update('PartyOffice', this.selectedpartyOffice).then((res) => {
          if (res.code == 201) {
            this.editDialogFlag = false;
            this.showUpdateSuccessMessage();
            this.closePop();
          } else {
            this.showUpdateErrorMessage();
          }
        })
      },

      saveNewPartyOffice() {
        samparkService.saveNew('PartyOffice', this.newPartyOffice).then((res) => {
          if (res.code == 201) {
            this.partyOffices.push(res.data);
            this.createDialogFlag = false;
            this.showSaveSuccessMessage();
            this.clear();
          } else {
            this.showSaveErrorMessage();
          }
        })
      },
      clear() {
        this.newPartyOffice = {
          valid: false,
          name: "",
          address: "",
          assemblyConstituency: ""
        };
        this.selectedStateAssembly = {};
      }
    },
    beforeMount() {
      samparkService.getAll('PartyOffice').then((res) => {
          this.partyOffices = res.data;
      })
       samparkService.getAll('AssemblyConstituency').then((res) => {
          this.assemblyConstituencies = res.data;
      })
    },
    notifications: {
      showSaveSuccessMessage: {
        title: 'Party Office saved',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showSaveErrorMessage: {
        title: 'Failed to save Party Office',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showUpdateSuccessMessage: {
        title: 'Party Office updated successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showUpdateErrorMessage: {
        title: 'Failed to updated Party Office',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showDeleteSuccessMessage: {
        title: 'Party Office deleted successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showDeleteErrorMessage: {
        title: 'Failed to delete Party Office',
        message: '',
        type: 'error',
        timeout: 2500
      },
    }

  }
</script>
