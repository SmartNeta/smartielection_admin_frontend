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
            v-bind:items="districts"
            v-bind:search="search">
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.no }}</td>
            <td class="text-xs-left">{{ props.item.stateAssembly.state }}</td>
            <td>
              <v-btn icon @click="editDistrict(props.item)"><v-tooltip bottom><v-icon  slot="activator">edit</v-icon>  <span>Edit</span>
                    </v-tooltip></v-btn>
              <v-btn icon @click="removeDistrict(props.item)"><v-tooltip bottom><v-icon slot="activator">close</v-icon><span>Delete</span>
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
                  <v-toolbar-title>Add new District</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="createDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>


                  <v-form v-model="newDistrict.valid" ref="form">
                   <v-text-field
                      label="Name "
                      v-model="newDistrict.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="District Number "
                      v-model="newDistrict.no"
                      type="number"
                      :rules="[v => !!v || 'District Number is required']"
                      required
                    ></v-text-field>
                    <v-select
                      label="State " autocomplete  required
                      :items="stateAssemblys"
                      v-model="newDistrict.stateAssembly"
                      item-text="state" item-value="state"
                      :return-object="true"
                      :rules="[v => !!v || 'Item is required']"
                      required
                    ></v-select>
                    <v-btn @click="saveNewDistrict" :disabled="!newDistrict.valid" class="btn-primary">save</v-btn>
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


                  <v-form v-model="selectedDistrict.valid" ref="form">

                    <v-text-field
                      label="Name "
                      v-model="selectedDistrict.name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="District Number "
                      type="number"
                      v-model="selectedDistrict.no"
                      :rules="[v => !!v || 'District Number is required']"
                      required
                    ></v-text-field>
                    <v-select
                      label="State " autocomplete  required
                      :items="stateAssemblys"
                      v-model="selectedDistrict.stateAssembly"
                      item-text="state" item-value="state"
                      :return-object="true"
                      :rules="[v => !!v || 'Item is required']"
                      required
                    ></v-select>
                    <v-btn @click="updateDistrict" :disabled="!selectedDistrict.valid" class="btn-primary">update</v-btn>
                    <v-btn @click="closePop" class="btn-secondary">cancel</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>

            <v-dialog v-model="deleteDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Delete District {{selectedDistrict.name}} ?</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="deleteDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <p>Please sure selected District will be removed permanently along with its Assembly Constituencies ,wards, booths</p>
                    <v-btn @click="deleteDistrict" class="btn-primary">delete</v-btn>
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
        items: [],
        stateAssemblys: [],
        selectedDistrict: { valid: true },
        District: {},
        newDistrict: {
          valid: false,
          name: "",
          no: "",
          parliamentaryConstituency: ""
        },

        createDialogFlag: false,
        editDialogFlag: false,
        deleteDialogFlag: false,

        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        search: '',
        pagination: {},
        headers: [
          {
            text: 'Name',
            value: 'name'
          },
          {
            text: 'District Number',
            value: 'no'
          },
          {
            text: 'State Assembly',
            value: 'stateAssembly.state'
          },
          {
            text: 'Actions',
            align: 'left',
            sortable: false,
            value: 'actions'
          }
        ],
        districts: []
      }
    },
    methods: {

       closePop(){
        this.selectedDistrict= { valid: true},
        this.editDialogFlag = false
      },

      removeDistrict(District) {
        this.selectedDistrict = District;
        this.deleteDialogFlag = true;
      },

      deleteDistrict() {
        samparkService.deleteById("District" , this.selectedDistrict.id).then((res) => {
          if (res.code == 201) {
            this.districts.splice(this.districts.indexOf(this.selectedDistrict), 1);
            this.deleteDialogFlag = false;
            this.showDeleteSuccessMessage();
          } else {
            this.showDeleteErrorMessage();
          }
        })
      },

      editDistrict(District) {
        this.selectedDistrict = District;
        this.editDialogFlag = true;
      },

      updateDistrict() {
        samparkService.update('District', this.selectedDistrict).then((res) => {
          if (res.code == 201) {
            this.editDialogFlag = false;
            this.showUpdateSuccessMessage();
            this.closePop();
          } else {
            this.showUpdateErrorMessage();
          }
        })
      },
      saveNewDistrict() {
        samparkService.saveNew('District', this.newDistrict).then((res) => {
          if (res.code == 201) {
            this.districts.push(res.data);
            this.createDialogFlag = false;
            this.showSaveSuccessMessage();
            this.clear();
          } else {
            this.showSaveErrorMessage();
          }
        })
      },
      clear() {
        this.newDistrict = {
          valid: false,
          name: "",
          no: "",
          stateAssembly: ""
        };
      }
    },
    beforeMount() {
      samparkService.getAll('District').then((res) => {
          this.districts = res.data;
      })
      samparkService.getAll('StateAssembly').then((res) => {
          this.stateAssemblys = res.data;
      })
    },

    notifications: {
      showSaveSuccessMessage: {
        title: 'District saved',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showSaveErrorMessage: {
        title: 'Failed to save District',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showUpdateSuccessMessage: {
        title: 'District updated successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showUpdateErrorMessage: {
        title: 'Failed to updated District',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showDeleteSuccessMessage: {
        title: 'District deleted successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showDeleteErrorMessage: {
        title: 'Failed to delete District',
        message: '',
        type: 'error',
        timeout: 2500
      }
    }

  }
</script>
