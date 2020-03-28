<template>
    <v-container fluid grid-list-xl py-0>
      <div class="app-card">
        <div class="app-card-content">
          <div class="app-card-title">
            <v-layout row wrap>
              <v-flex xs12 sm5>
                <v-select
                    label="State Assembly" required
                    :items="stateAssemblys"
                    v-model="selectedStateAssembly"
                    item-text="state" item-value="state"
                    :return-object="true"
                    v-on:input="stateChanged(selectedStateAssembly)">
                    :rules="[v => !!v || 'Item is required']"
                ></v-select>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex>
                <v-text-field
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                  v-model="search">
                </v-text-field>

              </v-flex>
            </v-layout>
          </div>
      

          <v-data-table
              v-bind:headers="headers"
              v-bind:items="volunteerActions"
              v-bind:search="search">
            <template slot="items" slot-scope="props">
              <td class="text-xs-center">{{ props.item.action }}</td>
              <td class="text-xs-center">{{ props.item.label }}</td>
              <td class="text-xs-center">{{ props.item.sequence }}</td>
              <td class="text-xs-center">
                <v-checkbox class="text-xs-center"
                    :label="props.item.visibility ? 'YES' : 'NO'"
                    v-model="props.item.visibility"
                    color="success"
                    hide-details
                    disabled="readonly">
                 </v-checkbox>
              </td>
              <td class="text-xs-center">
                <v-btn icon @click="volunteerActionSelected(props.item)">
                  <v-tooltip bottom><v-icon  slot="activator">edit</v-icon>
                    <span>Edit</span>
                  </v-tooltip>
                </v-btn>
              </td>
            </template>
            <template slot="pageText" slot-scope="{ pageStart, pageStop }">
              From {{ pageStart }} to {{ pageStop }}
            </template>
          </v-data-table>

        </div>
      </div>

    <v-dialog v-model="editDialogFlag" max-width="700px">
      <v-card>
        <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
          <v-toolbar-title>Edit Action</v-toolbar-title>
            <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn icon @click.native="editDialogFlag = false" dark>
                  <v-icon>close</v-icon>
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
              <v-form v-model="selectedVolunteerAction.valid" ref="form">


                    <v-text-field
                      label="Action"
                      v-model="selectedVolunteerAction.action"
                      readonly>
                    </v-text-field>

                    <v-text-field
                      label="Label*"
                      v-model="selectedVolunteerAction.label"
                      :rules="[v => !!v || 'Label required']"
                      required>
                    </v-text-field>

                    <v-select
                        label="Sequence" required
                        :items="sequenceList"
                        v-model="selectedVolunteerAction.sequence"
                        item-value="item"
                    ></v-select>

                      <v-select style="margin-bottom: 20px;"
                        label="Visibility" required
                        :items="visibilityList"
                        v-model="selectedVolunteerAction.visibility"
                        item-text="label" item-value="id"
                    ></v-select>

                    <v-btn @click="updateVolunteerAction"  class="btn btn-primary">update</v-btn>

              </v-form>
            </v-card-text>
            <div style="flex: 1 1 auto;"></div>
          </v-card>
        </v-dialog>



  </v-container>
</template>

<script>
  import * as samparkService from "./service";
  import FileSelect from './FileSelectExcel.vue'

  export default {
    components: {
      FileSelect
    },
    data () {
      return {
        editDialogFlag: false,
        deleteDialogFlag: false,
        selectedVolunteerAction: {},
        selectedStateAssembly: {},
        volunteerActions: [],
        stateAssemblys: [],
        search: "",
        sequenceList: [],
        visibilityList: [ {label : 'Yes', id: true},{label : 'No', id: false}],
        selectedStateAssembly: "",
        headers: [
          {
            text: 'Action',
            sortable: false,
            align: 'center',
            value: 'action'
          },
          {
            text: 'Label',
            sortable: false,
            align: 'center',
            value: 'label'
          },
          {
            text: 'Sequence',
            align: 'center',
            value: 'sequence'
          },
          {
            text: 'Visibility',
            align: 'center',
            width: '18%',
            value: 'visibility'
          },
          {
            text: 'Actions',
            align: 'center',
            sortable: false,
             width: '12%',
            value: 'actions'
          }
        ],

      }
    },
    methods: {

      stateChanged() {
        this.refreshList();
      },

      updateVolunteerAction() {
        if(!this.selectedVolunteerAction.label || this.selectedVolunteerAction.label.trim() == ""){
          this.showLabelErrorMessage();
          return false;
        }
        this.selectedVolunteerAction.stateAssembly = this.selectedStateAssembly;
        samparkService.saveNew('VolunteerAction', this.selectedVolunteerAction).then((res) => {
          if (res.code == 201) {
            this.editDialogFlag = false;
            this.showSaveSuccessMessage();
            this.clear();
          } else {
            this.showSaveErrorMessage();
          }
        })
      },

      volunteerActionSelected(selectedObj) {
        this.selectedVolunteerAction = {};
        this.selectedVolunteerAction = selectedObj;
        this.selectedVolunteerAction.sequence = selectedObj.sequence+"";
        this.editDialogFlag = true;
      },

      clear() {
        this.selectedVolunteerAction = {};
      },

      refreshList() {
        samparkService.getVolunteerActions(this.selectedStateAssembly.id).then((res) => {
            this.volunteerActions = res;
            this.generatSequenceArray();
        })
      },
      generatSequenceArray(){
        this.sequenceList = [];
        for (var i = 0; i < this.volunteerActions.length; i++) {
          this.sequenceList.push(i+"");
        }
      }
    },

    beforeMount() {
      var data =  window.localStorage.getItem('loginUser');
      data = JSON.parse(data);
      this.stateAssemblys = data.stateAssembly;
      if(!this.stateAssemblys){
        samparkService.getAll('StateAssembly').then((res) => {
          this.stateAssemblys = res.data;
          this.selectedStateAssembly = this.stateAssemblys[0];
          samparkService.getVolunteerActions(this.selectedStateAssembly.id).then((res) => {
              this.volunteerActions = res;
              this.generatSequenceArray();
          })
        })
      } else {
        this.selectedStateAssembly = this.stateAssemblys;
        samparkService.getVolunteerActions(this.selectedStateAssembly.id).then((res) => {
            this.volunteerActions = res;
            this.generatSequenceArray();
        })
      } 
    },

    notifications: {
      showSaveSuccessMessage: {
        title: 'Volunteer Setting\'s saved',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showSaveErrorMessage: {
        title: 'Failed to save Volunteer Setting\'s',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showLabelErrorMessage: {
        title: 'Please Enter Label',
        message: '',
        type: 'error',
        timeout: 2500
      },
    }
  }
</script>