
<style type="text/css">
    table.v-table tbody td {
       padding: 0 10px !important
    }
    .flex, .child-flex > * {
      padding: 5px 10px !important;
    }
    .theme--light .toolbar, .application .theme--light.toolbar {
      color: #FFF;
    }
    .option-view {
      padding: 10px;
      margin-right: 10px;
      background-color: #f5f5f5;
      border-radius: 1rem;
    }

   @media only screen and (max-width: 500px) {
    .state-filter .toolbar__content {
      height: auto !important;
      display: block;
      position: relative;
      padding-top: 15px;
      background-color: #fff;
    }
    .state-filter .input-group {
      margin-left: 0px !important;
      padding: 18px 20px 0;
    }
    .state-filter .close-filter{
      margin-left: 0;
      color: black;
      position: absolute;
      top: 6px;
      right: 0;
      margin-right: 12px !important;
    }
    .state-filter .close-filter i{
      margin: 0px !important;
    }
    .state-filter label{
      padding: 0 25px;
    }
  }

</style>

<template>

    <v-container fluid grid-list-xl py-0>
       <v-card class="state-filter">
        <v-toolbar class="filter">
            <v-select label="State" :items="stateAssembly" item-text="state" item-value="id" v-model="selectedState" v-on:input="filterData('state')"></v-select>

            <v-select label="Parlimentary" :items="filteredParliamentaryConstituencies" item-text="name" item-value="id" v-model="selectedParlimentary" v-on:input="filterData('PC')" style="margin-left: 10px"></v-select>

            <v-select label="Assembly" :items="filteredAssemblyConstituencies" item-text="name" item-value="id" v-model="selectedAssembly" v-on:input="filterData('assembly')" style="margin-left: 10px"></v-select>

            <v-select label="Ward" :items="filteredWards" v-model="selectedWard" item-text="name" item-value="id" v-on:input="filterData('ward')" style="margin-left: 10px"></v-select>

            <div class="close-filter" style="margin-right: 0px;color: black;">
              <i title="clear filter" class="material-icons" @click="clearFilters()" style="margin: 20px;cursor: pointer;">cancel</i>
            </div>

         </v-toolbar>
      </v-card>
    <div class="app-card">
      <div class="app-card-content">
        <v-card-title>
        <v-btn class="btn-primary" :disabled="addButFlag" @click.stop="addnewC">Add New</v-btn>
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
            v-bind:items="surveyQuestions"
            v-bind:search="search">
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.question }}</td>
            <td class="text-xs-left">{{ props.item.type }}</td>
            <td class="text-xs-left">{{ props.item.options }}</td>
            <td class="text-xs-left">
              <v-checkbox
                  :label="props.item.mandatory ? 'YES' : 'NO'"
                  v-model="props.item.mandatory"
                  color="success"
                  hide-details
                  readonly>
               </v-checkbox>
             </td>
            <td class="text-xs-center" width="40px">
              <v-btn icon @click="editSurveyQuestion(props.item)" >
                <v-tooltip bottom>
                  <v-icon  slot="activator">edit</v-icon>
                  <span>Edit</span>
                </v-tooltip>
              </v-btn>
              <v-btn icon @click="removeSurveyQuestion(props.item)" small>
                <v-tooltip bottom>
                  <v-icon slot="activator">close</v-icon>
                  <span>Delete</span>
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
            <v-dialog v-model="saveDialogFlag" max-width="650px">
                <v-toolbar style="flex: 0 0 ;" class="bg-primary">
                  <v-toolbar-title>Add Survey Questoin</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="closeSavePop" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                        <v-card>
                           <v-card-text>
                                <v-form v-model="newSurveyQuestion.valid" ref="form">
                                <v-layout row wrap>
                                    <v-flex xs12 sm12>
                                        <v-text-field
                                          label="Question"
                                          v-model="newSurveyQuestion.question"
                                          :rules="[v => !!v || 'Question Id is required']"
                                          required
                                        ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                <v-layout row wrap>
                                    <v-flex xs12 sm12>
                                       <v-checkbox
                                          label="Is Mandatory"
                                          v-model="newSurveyQuestion.mandatory"
                                          color="success"
                                          hide-details>
                                       </v-checkbox>
                                    </v-flex>
                                  </v-layout>
                                  <v-layout row wrap>
                                    <v-flex xs12 sm6>
                                      <v-select
                                        label="Answere type"
                                        v-model="newSurveyQuestion.type"
                                        :items="answereTypes"
                                        :rules="[v => !!v || 'Answere type is required']"
                                        required
                                      ></v-select>
                                    </v-flex>
                                    <v-flex xs10 sm5 v-if="newSurveyQuestion.type != 'Input'">
                                      <v-text-field
                                        label="Add Options"
                                        v-model="option"
                                      ></v-text-field>
                                    </v-flex>
                                    <v-flex xs2 sm1 v-if="newSurveyQuestion.type != 'Input'">
                                      <v-btn icon @click.native="addOptionsArray(option)">
                                        <v-icon>add</v-icon>
                                      </v-btn>
                                    </v-flex>
                                  </v-layout>

                                  <v-layout row wrap v-if="newSurveyQuestion.type != 'Input'">
                                    <v-flex xs12 sm12>
                                        <span class="option-view" v-for="element in optionsArray">{{element}}
                                            <v-btn icon @click.native="editOptionsArray(element)">
                                              <v-tooltip bottom>
                                                <v-icon  slot="activator">edit</v-icon>
                                                <span>Edit</span>
                                              </v-tooltip>
                                            </v-btn>
                                            <v-btn icon @click.native="removeOptionsArray(element)">
                                              <v-tooltip bottom>
                                                <v-icon  slot="activator">close</v-icon>
                                                <span>Remove</span>
                                              </v-tooltip>
                                            </v-btn>
                                        </span>
                                    </v-flex>
                                  </v-layout>


                                  <v-layout row wrap v-if="newSurveyQuestion.type == 'Radio' ">
                                    <v-flex xs12 sm6>
                                        <v-btn v-if="!subSurveyQuestionFlag" @click="addSubSurveyQuestion"  class="btn-primary">Add Sub-Qustion</v-btn>
                                        <v-btn v-if="subSurveyQuestionFlag" @click="removeSubSurveyQuestion"  class="btn-primary">Remove Sub-Qustion</v-btn>
                                    </v-flex>
                                   </v-layout>

                    <v-layout row wrap v-if="subSurveyQuestionFlag">
                      <v-flex xs12 sm12>
                          <v-text-field
                            label="Question"
                            v-model="subSurveyQuestion.question"
                            :rules="[v => !!v || 'Question is required']"
                            required
                          ></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap v-if="subSurveyQuestionFlag">
                       <v-flex xs12 sm6>
                        <v-select
                          label="Answere type"
                          v-model="subSurveyQuestion.type"
                          :items="answereTypes"
                          :rules="[v => !!v || 'Answere type is required']"
                          required
                        ></v-select>
                      </v-flex>
                      <v-flex xs10 sm5 v-if="subSurveyQuestion.type != 'Input'">
                        <v-text-field
                          label="Add Options"
                          v-model="subQuestionOption"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs2 sm1 v-if="subSurveyQuestion.type != 'Input'">
                        <v-btn icon @click.native="addSubQuestionOptionsArray(subQuestionOption)">
                          <v-icon>add</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap v-if="subSurveyQuestion.type != 'Input' && subSurveyQuestionFlag">
                      <v-flex xs12 sm12>
                          <span class="option-view" v-for="element in subQuestionOptionsArray">{{element}}
                              <v-btn icon @click.native="editOptionsArray(element)">
                                <v-tooltip bottom>
                                  <v-icon  slot="activator">edit</v-icon>
                                  <span>Edit</span>
                                </v-tooltip>
                              </v-btn>                            
                              <v-btn icon @click.native="removeSubQuestionOptionsArray(element)">
                                <v-tooltip bottom>
                                  <v-icon  slot="activator">close</v-icon>
                                  <span>Remove</span>
                                </v-tooltip>                                
                              </v-btn>
                          </span>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap v-if="newSurveyQuestion.type == 'Radio'">
                      <v-flex xs12 sm12>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                      <v-flex xs12 sm6>
                      </v-flex>
                      <v-flex xs12 sm6>
                          <v-btn @click="saveNewSurveyQuestion"  :disabled="!newSurveyQuestion.valid" class="btn-primary">Save</v-btn>
                         <v-btn @click="closeSavePop" class="btn-secondary">cancel</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog>

            <v-dialog v-model="editDialogFlag" max-width="650px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Edit Survey Questoin</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="closeEditPop" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                <v-form v-model="selectedSurveyQuestion.valid" ref="form">
                   <v-layout row wrap>
                      <v-flex xs12 sm12>
                           <v-text-field
                            label="Question"
                            v-model="selectedSurveyQuestion.question"
                            :rules="[v => !!v || 'Question is required']"
                            required
                           ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm12>
                           <v-checkbox
                              label="Is Mandatory"
                              v-model="selectedSurveyQuestion.mandatory"
                              color="success"
                              hide-details>
                           </v-checkbox>
                        </v-flex>
                      </v-layout>
                    <v-layout row wrap>
                       <v-flex xs12 sm6>
                        <v-select
                          label="Answere type"
                          v-model="selectedSurveyQuestion.type"
                          :items="answereTypes"
                          :rules="[v => !!v || 'Answere type is required']"
                          required
                        ></v-select>
                      </v-flex>
                      <v-flex xs10 sm5 v-if="selectedSurveyQuestion.type != 'Input'">
                        <v-text-field
                          label="Add Options"
                          v-model="option"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs2 sm1 v-if="selectedSurveyQuestion.type != 'Input'">
                        <v-btn icon @click.native="addOptionsArray(option)">
                          <v-icon>add</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap v-if="selectedSurveyQuestion.type != 'Input'">
                      <v-flex xs12 sm12>
                          <span class="option-view" v-for="element in optionsArray">{{element}}
                              <v-btn icon @click.native="editOptionsArray(element)">
                                <v-tooltip bottom>
                                  <v-icon  slot="activator">edit</v-icon>
                                  <span>Edit</span>
                                </v-tooltip>
                              </v-btn>
                              <v-btn icon @click.native="removeOptionsArray(element)">
                                <v-tooltip bottom>
                                  <v-icon  slot="activator">close</v-icon>
                                  <span>Remove</span>
                                </v-tooltip>
                              </v-btn>
                          </span>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap v-if="selectedSurveyQuestion.type == 'Radio' ">
                      <v-flex xs12 sm6>
                          <v-btn v-if="!subSurveyQuestionFlag" @click="addSubSurveyQuestion"  class="btn-primary">Add Sub-Qustion</v-btn>
                          <v-btn v-if="subSurveyQuestionFlag" @click="removeSubSurveyQuestion"  class="btn-primary">Remove Sub-Qustion</v-btn>
                      </v-flex>
                     </v-layout>

                    <v-layout row wrap v-if="subSurveyQuestionFlag">
                      <v-flex xs12 sm12>
                          <v-text-field
                            label="Question"
                            v-model="subSurveyQuestion.question"
                            :rules="[v => !!v || 'Question is required']"
                            required
                          ></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap v-if="subSurveyQuestionFlag">
                       <v-flex xs12 sm6>
                        <v-select
                          label="Answere type"
                          v-model="subSurveyQuestion.type"
                          :items="answereTypes"
                          :rules="[v => !!v || 'Answere type is required']"
                          required
                        ></v-select>
                      </v-flex>
                      <v-flex xs10 sm5 v-if="subSurveyQuestion.type != 'Input'">
                        <v-text-field
                          label="Add Options"
                          v-model="subQuestionOption"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs2 sm1 v-if="subSurveyQuestion.type != 'Input'">
                        <v-btn icon @click.native="addSubQuestionOptionsArray(subQuestionOption)">
                          <v-icon>add</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap v-if="subSurveyQuestion.type != 'Input' && subSurveyQuestionFlag">
                      <v-flex xs12 sm12>
                          <span class="option-view" v-for="element in subQuestionOptionsArray">{{element}}
                              <v-btn icon @click.native="editSubQuestionOptionsArray(element)">
                                <v-tooltip bottom>
                                  <v-icon  slot="activator">edit</v-icon>
                                  <span>Edit</span>
                                </v-tooltip>
                              </v-btn>
                              <v-btn icon @click.native="removeSubQuestionOptionsArray(element)">
                                <v-tooltip bottom>
                                  <v-icon  slot="activator">close</v-icon>
                                  <span>Remove</span>
                                </v-tooltip>
                              </v-btn>
                          </span>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                      <v-flex xs12 sm6>
                      </v-flex>
                          <v-flex xs12 sm6>
                              <v-btn @click="updateSurveyQuestion"  class="btn-primary">Update</v-btn>
                              <v-btn @click="closeEditPop" class="btn-secondary">cancel</v-btn>
                          </v-flex>
                     </v-layout>
                    </v-form>
                    </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>


            <v-dialog v-model="deleteDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Delete SurveyQuestion {{selectedSurveyQuestion.question}} ?</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="deleteDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <p>Please sure selected SurveyQuestion will be removed permanently</p>
                    <v-btn @click="deleteSurveyQuestion" class="btn-secondary">delete</v-btn>
                    <v-btn @click="deleteDialogFlag = false" class="btn-primary">cancel</v-btn>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>

            <v-dialog v-model="optionEditorDialog" max-width="300px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Edit Option</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="optionEditorDialog = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-text-field label="Option" v-model="newOptionValue" :rules="[v => !!v || 'Option is required']" required style="margin-bottom: 10px;"></v-text-field>
                    <v-btn @click="updateOption" :disabled="!newOptionValue" class="btn btn-secondary">Update</v-btn>
                    <v-btn @click="optionEditorDialog = false" class="btn btn-primary" style="margin-left: 10px;">Cancel</v-btn>
                </v-card-text>
              </v-card>
            </v-dialog>

        <!--  <div id="loader">
            <div id="overlay-back"></div>
            <div id="overlay">
              <div id="dvLoading">
                   <v-progress-circular indeterminate :size="70" :width="7" color="#FF9934"></v-progress-circular>
              </div>
            </div>
          </div> -->

  </v-container>
</template>

<script>
import * as samparkService from "./service";

export default {
  data() {
    
    return {
      newOptionValue : null,
      optionEditorFor : null,
      optionEditorDialog : false,
      optionIndex : null,
      stateAssembly: [],  
      filteredStateAssembly: [],
      filteredDistricts: [],
      filteredAssemblyConstituencies: [],
      filteredWards: [],
      filteredParliamentaryConstituencies: [],
      selectedState: {},
      selectedAssembly: {},
      selectedParlimentary : {},
      selectedWard: '',
      addButFlag: true,
      filteredSurveyQuestions:[],
      selectedSurveyQuestion: {valid: true},
      surveyQuestions: [],
      pagination: { },
      newSurveyQuestion: {valid: false},
      subSurveyQuestion: {},
      saveDialogFlag: false,
      editDialogFlag: false,
      deleteDialogFlag: false,
      subSurveyQuestionFlag: false,
      answereTypes: ["Input", "Radio", "Multi Choice"],
      optionsArray: [],
      subQuestionOptionsArray: [],
      option: "",
      subQuestionOption: "",
        search: '',
        headers: [
          {
            text: 'Question',
            value: 'question',
            width: '50%'
          },
          {
            text: 'Type',
            value: 'type',
            width: '10%'
          },
          {
            text: 'Options',
            value: 'options',
            width: '15%'
          },
          {
            text: 'Mandatory',
            value: 'mandatory',
            align:'center'
          },
          {
            text: 'Actions',
            align: 'center',
            sortable: false,
            value: "actions",
            class: "text-xs-center",
            width: '10%'
          }
        ],
        SurveyQuestions: []
      }
    },
    methods: {

      updateOption(){
        if(this.optionEditorFor == "MainQuestionOption"){
          this.optionsArray.splice(this.optionIndex, 1, this.newOptionValue);
        }else{
          this.subQuestionOptionsArray.splice(this.optionIndex , 1,this.newOptionValue);
        }
        this.optionEditorDialog = false;
      },

      addSubSurveyQuestion() {
            this.subSurveyQuestionFlag = true;
            this.subSurveyQuestion = {};
            this.subQuestionOptionsArray = [];
      },

      removeSubSurveyQuestion() {
        this.subSurveyQuestionFlag = false;
      },

      addOptionsArray(element){
        if(element && (this.optionsArray.indexOf(element) == -1)) {
          this.optionsArray.push(element);
          this.option = "";
        }
      },

      removeOptionsArray(element){
        if(this.optionsArray.indexOf(element) != -1) {
          this.optionsArray.splice(this.optionsArray.indexOf(element), 1);
        }
      },

      editOptionsArray(element){
        if(this.optionsArray.indexOf(element) != -1) {
          this.optionEditorFor = "MainQuestionOption";
          this.optionIndex = this.optionsArray.indexOf(element);
          this.newOptionValue = this.optionsArray[this.optionsArray.indexOf(element)];
          this.optionEditorDialog = true;
        }
      },

      addSubQuestionOptionsArray(element){
        if(element && (this.subQuestionOptionsArray.indexOf(element) == -1)) {
          this.subQuestionOptionsArray.push(element);
          this.subQuestionOption = "";
        }
      },

      removeSubQuestionOptionsArray(element){
        if(this.subQuestionOptionsArray.indexOf(element) != -1) {
          this.subQuestionOptionsArray.splice(this.subQuestionOptionsArray.indexOf(element), 1);
        }
      },

      editSubQuestionOptionsArray(element){
        if(this.subQuestionOptionsArray.indexOf(element) != -1) {
          this.optionEditorFor = "SubQuestionOption";
          this.optionIndex = this.subQuestionOptionsArray.indexOf(element);
          this.newOptionValue = this.subQuestionOptionsArray[this.subQuestionOptionsArray.indexOf(element)];
          this.optionEditorDialog = true;
        }
      },

      editSurveyQuestion(surveyQuestion) {
        this.selectedSurveyQuestion = surveyQuestion;
        if(surveyQuestion.options) {
          this.optionsArray = surveyQuestion.options.split(";");
        } else {
          this.optionsArray = []
        }
        this.editDialogFlag = true;

        if(surveyQuestion.childQuestion) {
          this.subSurveyQuestion = surveyQuestion.childQuestion;
          this.subSurveyQuestionFlag = true;
          if(this.subSurveyQuestion.options) {
            this.subQuestionOptionsArray = this.subSurveyQuestion.options.split(";");
          } else {
            this.subQuestionOptionsArray = []
          }
        } else {
          this.subSurveyQuestionFlag = false;
        }

      },

      addnewC(){
         this.clear();
         this.saveDialogFlag = true;
      },
      
      closeSavePop(){
        this.clear();
        this.saveDialogFlag = false;
      },

      closeEditPop(){
        this.selectedSurveyQuestion= { valid: true};
        this.editDialogFlag = false;
        this.optionsArray = [];
      },

      removeSurveyQuestion(surveyQuestion) {
        this.selectedSurveyQuestion = surveyQuestion;
        this.deleteDialogFlag = true;
      },

      deleteSurveyQuestion() {
      samparkService.deleteById("SurveyQuestion", this.selectedSurveyQuestion.id).then((res) => {
          if (res.code == 201) {
            this.deleteDialogFlag = false;
            this.showDeleteSuccessMessage();
            this.refresh();
          } else {
            this.showDeleteErrorMessage();
          }
        })
      },


      save2() {
        this.selectedSurveyQuestion.options = this.optionsArray.join(";");
        samparkService.update('SurveyQuestion',this.selectedSurveyQuestion).then((res) => {
          if (res.code == 201) {
            this.showUpdateSuccessMessage();
            this.closeEditPop();
            if(this.subSurveyQuestion.id && !this.subSurveyQuestionFlag) {
              samparkService.deleteById("SurveyQuestion", this.subSurveyQuestion.id).then((res) => {
                this.refresh();
              })
            }
            this.subSurveyQuestion = {};
            this.subSurveyQuestionFlag = false;
            this.refresh();
          } else {
            this.showUpdateErrorMessage();
          }
        })
      },

      updateSurveyQuestion() {
        if(this.subSurveyQuestionFlag) {
          this.subSurveyQuestion.stateAssembly =  {"id" : this.selectedState};
          if(this.selectedWard != null){
            this.subSurveyQuestion.ward =  {"id" : this.selectedWard};
          }
          this.subSurveyQuestion.options = this.subQuestionOptionsArray.join(";");
          this.subQuestionOptionsArray = [];
          samparkService.saveNew('SurveyQuestion', this.subSurveyQuestion).then((res) => {
            if (res.code == 201) {
              this.selectedSurveyQuestion.childQuestion = res.data;
              this.save2()
            }
          })
        } else {
          delete this.selectedSurveyQuestion['childQuestion'];
          this.save2()
        }
    },

      save1() {
        this.newSurveyQuestion.options = this.optionsArray.join(";");
        this.optionsArray = [];
        samparkService.saveNew('SurveyQuestion',this.newSurveyQuestion).then((res) => {
          if (res.code == 201) {
            this.subSurveyQuestion = {};
            this.subSurveyQuestionFlag = false;
            this.closeSavePop();
            this.showSaveSuccessMessage();
            this.clear();
            this.refresh();
          } 
           else if(res.code == 500) {
            this.showSaveErrorMessage();
          }
        })
      },

      saveNewSurveyQuestion() {
        this.newSurveyQuestion.stateAssembly =  {"id" : this.selectedState};
        if(this.selectedWard != null){
          this.newSurveyQuestion.ward =  {"id" : this.selectedWard};
        }

        if(this.subSurveyQuestionFlag) {
            this.subSurveyQuestion.stateAssembly =  {"id" : this.selectedState};
            if(this.selectedWard != null){
              this.subSurveyQuestion.ward =  {"id" : this.selectedWard};
            }
            this.subSurveyQuestion.options = this.subQuestionOptionsArray.join(";");
            this.subQuestionOptionsArray = [];
            samparkService.saveNew('SurveyQuestion', this.subSurveyQuestion).then((res) => {
              if (res.code == 201) {
                this.newSurveyQuestion.childQuestion = res.data;
                this.save1();
              }
            })
        } else {
          this.save1();
        }
      },

      clear() {
        this.newSurveyQuestion = { valid: false };
        this.selectedSurveyQuestion= "";
    },

    showLoader(){
     // document.getElementById("loader").style.display = "block";
    },

    hideLoader(){
     // document.getElementById("loader").style.display = "none";
    },

    refresh(){
        if(this.selectedWard != null){
          this.filterData('ward');
        } else {
          this.filterData('state');
        }

    },


    filterData(filterdOn) {
      this.SurveyQuestions = [];
      if(filterdOn == "state"){
        this.filteredDistricts = [];
        this.filteredAssemblyConstituencies = [];
        this.filteredParliamentaryConstituencies = [];
        this.filteredWards = [];
        this.selectedAssembly = null;
        this.selectedWard = null;
        this.addButFlag = false;
        this.selectedParlimentary = null;
        samparkService.parliamentaryConstituencyByState(this.selectedState).then(res => {
          this.filteredParliamentaryConstituencies = res.data;
        });
        samparkService.getFilteredByState(this.selectedState).then(res => {
          this.surveyQuestions = [];
          for (var i = 0; i < res.data.length; i++) {
            if(!res.data[i].parentQuestion) {
              this.surveyQuestions.push(res.data[i]);
            }
          }
        }); 
      } else if(filterdOn == "PC"){
        this.filteredWards = [];
        this.selectedAssembly = null;
        this.selectedWard = null;
        samparkService.getFilteredData('AssemblyConstituency',this.selectedParlimentary).then(res => {
          this.filteredAssemblyConstituencies = res.data;
        });
      } else if(filterdOn == "assembly") {
        this.filteredWards = [];
        this.selectedWard = null;
        samparkService.getFilteredData('Ward',this.selectedAssembly).then(res => {
          this.filteredWards = res.data;
        });
      } else if (filterdOn == "ward") {
        if(this.selectedWard){
          samparkService.getFilteredData('SurveyQuestion',this.selectedWard).then(res => {
            this.surveyQuestions = [];
            for (var i = 0; i < res.data.length; i++) {
              if(!res.data[i].parentQuestion) {
                this.surveyQuestions.push(res.data[i]);
              }
            }
          });
        }
      }
    },
    clearFilters(){
      this.filterData('state');
    }
  },
  beforeMount() {
    var data =  window.localStorage.getItem('loginUser');
    data = JSON.parse(data);
    this.stateAssembly = data.stateAssembly;
   
    if(!this.stateAssembly){
        samparkService.getAll('StateAssembly').then((res) => {
          this.stateAssembly = res.data;
      })
    } else {
       this.selectedState = this.stateAssembly.id;
       this.filterData('state');
    } 
  },
  notifications: {
    showSaveSuccessMessage: {
      title: "SurveyQuestion saved",
      message: "",
      type: "success",
      timeout: 2500
    },
    showSaveErrorMessage: {
      title: "Failed to save SurveyQuestion",
      message: "",
      type: "error",
      timeout: 2500
    },
    showUpdateSuccessMessage: {
      title: "SurveyQuestion updated successfully",
      message: "",
      type: "success",
      timeout: 2500
    },
    showUpdateErrorMessage: {
      title: "Failed to updated SurveyQuestion",
      message: "",
      type: "error",
      timeout: 2500
    },
    showDeleteSuccessMessage: {
      title: "SurveyQuestion deleted successfully",
      message: "",
      type: "success",
      timeout: 2500
    },
    showDeleteErrorMessage: {
      title: "Failed to delete SurveyQuestion",
      message: "",
      type: "error",
      timeout: 2500
    },
    showCsvFileSelectError:{
      title: "Please select CSV file to uplaod.",
      message:"",
      type:"error",
      timeout:2500
    },
    showCsvSaveErrorMessage: {
      title: "Failed to save CSV file",
      message: "",
      type: "error",
      timeout: 2500
    },
    userNameExistsMessage: {
      title: 'Voter Id Already Exists',
      message: '',
      type: 'error',
      timeout: 2500
    }
  }
};

</script>
