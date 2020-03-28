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
            v-bind:items="parliamentaryConstituencies"
            v-bind:search="search">
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.no }}</td>
            <td class="text-xs-left">{{ props.item.district.name }}</td>
            <td class="text-xs-left">{{ props.item.district.stateAssembly.state }}</td>
            <td>
              <v-btn icon @click="editParliamentaryConstituency(props.item)"><v-tooltip bottom><v-icon  slot="activator">edit</v-icon>  <span>Edit</span>
                    </v-tooltip></v-btn>
              <v-btn icon @click="removeParliamentaryConstituency(props.item)"><v-tooltip bottom><v-icon slot="activator">close</v-icon><span>Delete</span>
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
                  <v-toolbar-title>Add new Parliamentary Constituency</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="createDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>


                  <v-form v-model="newParliamentaryConstituency.valid" ref="form">
                    <v-text-field
                      label="Name "
                      v-model="newParliamentaryConstituency.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Parliamentary Constituency No. "
                      type="number"
                      v-model="newParliamentaryConstituency.no"
                      :rules="[v => !!v || 'Parliamentary Constituency No. is required']"
                      required
                    ></v-text-field>
                    <v-select
                      label="District " autocomplete  required
                      :items="districts"
                      v-model="newParliamentaryConstituency.district"
                      item-text="name" item-value="name"
                      :return-object="true"
                      :rules="[v => !!v || 'Item is required']"
                      required
                    ></v-select>
                    <v-btn @click="saveNewParliamentaryConstituency" :disabled="!newParliamentaryConstituency.valid" class="btn-primary">submit</v-btn>
                    <v-btn @click="clear" class="btn-secondary">clear</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>


            <v-dialog v-model="editDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Update Parliamentary Constituency</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="closePop" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>


                  <v-form v-model="selectedParliamentaryConstituency.valid" ref="form">

                    <v-text-field
                      label="Name "
                      v-model="selectedParliamentaryConstituency.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                     <v-text-field
                      label="Parliamentary Constituency No. "
                      type="number"
                      v-model="selectedParliamentaryConstituency.no"
                      :rules="[v => !!v || 'Parliamentary Constituency No. is required']"
                      required
                    ></v-text-field>
                    <v-select
                      label="District " autocomplete  required
                      :items="districts"
                      v-model="selectedParliamentaryConstituency.district"
                      item-text="name" item-value="name"
                      :return-object="true"
                      :rules="[v => !!v || 'Item is required']"
                      required
                    ></v-select>
                    <v-btn @click="updateParliamentaryConstituency" :disabled="!selectedParliamentaryConstituency.valid" class="btn-primary">update</v-btn>
                    <v-btn @click="closePop" class="btn-secondary">cancel</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>

            <v-dialog v-model="deleteDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Delete parliamentary constituency {{selectedParliamentaryConstituency.name}} ?</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="deleteDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <p>Please sure selected parliamentary constituency will be removed permanently along with its assembly constituencies, wards, booths.</p>
                    <v-btn @click="deleteParliamentaryConstituency" class="btn-primary">delete</v-btn>
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
        districts: [],
        selectedParliamentaryConstituency: {  valid: true },
        newParliamentaryConstituency: {
          valid: false,
          name: "",
          no: "",
          stateAssembly: ""
        },

        createDialogFlag: false,
        editDialogFlag: false,
        deleteDialogFlag: false,

        search: '',
        headers: [
          {
            text: 'Name',
            align: 'left',
            value: 'name'
          },
           {
            text: 'Number',
            align: 'left',
            value: 'no'
          },
          {
            text: 'Districe',
            value: 'district.name'
          },
          {
            text: 'State',
            value: 'district.stateAssembly.state'
          },
          {
            text: 'Actions',
            sortable: false,
            value: 'actions'
          }
        ],
        parliamentaryConstituencies: []
      }
    },
    methods: {

       closePop(){
        this.selectedParliamentaryConstituency= { valid: true},
        this.editDialogFlag = false
      },

      removeParliamentaryConstituency(parliamentaryConstituency) {
        this.selectedParliamentaryConstituency = parliamentaryConstituency;
        this.deleteDialogFlag = true;
      },

      deleteParliamentaryConstituency() {
        samparkService.deleteById("ParliamentaryConstituency" , this.selectedParliamentaryConstituency.id).then((res) => {
          if (res.code == 201) {
            this.parliamentaryConstituencies.splice(this.parliamentaryConstituencies.indexOf(this.selectedParliamentaryConstituency), 1);
            this.deleteDialogFlag = false;
            this.showDeleteSuccessMessage();
          } else {
            this.showDeleteErrorMessage();
          }
        })
      },

      editParliamentaryConstituency(parliamentaryConstituency) {
        this.selectedParliamentaryConstituency = parliamentaryConstituency;
        this.editDialogFlag = true;
      },

      updateParliamentaryConstituency() {
        samparkService.update('ParliamentaryConstituency', this.selectedParliamentaryConstituency).then((res) => {
          if (res.code == 201) {
            this.editDialogFlag = false;
            this.showUpdateSuccessMessage();
            this.closePop();
          } else {
            this.showUpdateErrorMessage();
          }
        })
      },


      saveNewParliamentaryConstituency() {
        samparkService.saveNew('ParliamentaryConstituency', this.newParliamentaryConstituency).then((res) => {
          if (res.code == 201) {
            this.parliamentaryConstituencies.push(res.data);
            this.createDialogFlag = false;
            this.showSaveSuccessMessage();
            this.clear();
          } else {
            this.showSaveErrorMessage();
          }
        })
      },
      clear() {
        this.newParliamentaryConstituency = {
          valid: false,
          name: "",
          no: "",
          district: ""
        };
        this.selectedParliamentaryConstituency = {};
      }
    },
    beforeMount() {
      samparkService.getAll('District').then((res) => {
          this.districts = res.data;
      })
      samparkService.getAll('ParliamentaryConstituency').then((res) => {
          this.parliamentaryConstituencies = res.data;
      })
    },
    notifications: {
      showSaveSuccessMessage: {
        title: 'Parliamentary Constituency saved',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showSaveErrorMessage: {
        title: 'Failed to save Parliamentary Constituency',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showUpdateSuccessMessage: {
        title: 'Parliamentary Constituency updated successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showUpdateErrorMessage: {
        title: 'Failed to updated Parliamentary Constituency',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showDeleteSuccessMessage: {
        title: 'Parliamentary Constituency deleted successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showDeleteErrorMessage: {
        title: 'Failed to delete Parliamentary Constituency',
        message: '',
        type: 'error',
        timeout: 2500
      }
    }

  }
</script>
