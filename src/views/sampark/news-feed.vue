<style type="text/css">
/*  .list--three-line .list__tile {
    height: 115px;
  }*/
  .mynews{
    cursor: pointer;
    border: 1px solid #e0e0e0;
    margin: 10px 0px;
    padding: 10px;
  }
  .mynews:hover{
    background-color: #e0e0e0;
    border: 1px solid #ed9622;
  }
</style>
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
                  <v-flex xs12 sm5 style="margin-top: 15px;">
                    <v-btn class="btn-primary" @click.stop="createDialogFlag = true">Add New</v-btn>
                  </v-flex>
              </v-layout>
        </div>
        <v-layout row>
          <v-flex xs12 md12>
            <v-card>
                <template v-for="item in newsFeeds">
                  <div class="mynews" v-bind:key="item.header" @click="newsFeedSelected(item)">
                    <v-layout row wrap>
                      <v-flex xs12 sm1>
                        <v-list-tile-avatar style="padding: 10px 15px;">
                          <img v-bind:src="getImagePath(item.image)">
                        </v-list-tile-avatar>
                      </v-flex>
                      <v-flex xs12 sm11>
                          <label style="font-weight: bold;" v-html="item.header"></label>
                          <p v-html="item.details"></p>
                      </v-flex>
                    </v-layout>
                  </div>
                </template>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
    </div>






         <v-dialog v-model="createDialogFlag" max-width="700px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Add new News</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="createDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <v-form v-model="newNewsFeed.valid" ref="form">

                   <v-text-field
                      label="News Header*"
                      v-model="newNewsFeed.header"
                      :rules="[v => !!v || 'Header is required']"
                      required
                    ></v-text-field>                   
                    <v-text-field
                      label="Web Link"
                      v-model="newNewsFeed.webLink"
                    ></v-text-field>
                      <span style="margin-bottom: 5px">News Detail*</span>
                      <textarea v-model="newNewsFeed.details" :rows="8" :rules="[v => !!v || 'Details required']" required placeholder="Enter Text" style="width: 100%; background-color: #fff;border: 1px solid #DDE6F3;"></textarea>

                    <div class="file-upload-form" style="margin-bottom: 25px;">
                        Select image :
                        <input  type="file" @change="previewImage" model="imageFile" accept="image/*">
                    </div>

                    <v-btn @click="uploadImageAndSave" :disabled="!newNewsFeed.valid || !newNewsFeed.details" class="btn-primary">save</v-btn>
                    <v-btn @click="clear" class="btn-secondary">clear</v-btn>
                  </v-form>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
              </v-card>
            </v-dialog>


         <v-dialog v-model="editDialogFlag" max-width="700px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Edit News</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="editDialogFlag = false" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <v-form v-model="selectedNewsFeed.valid" ref="form">
                   <v-text-field
                      label="News Header"
                      v-model="selectedNewsFeed.header"
                      :rules="[v => !!v || 'Header is required']"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Web Link"
                      v-model="selectedNewsFeed.webLink"
                    ></v-text-field>
                    <span><b>News Detail*</b></span>
                    <textarea v-model="selectedNewsFeed.details" :rows="8" :rules="[v => !!v || 'Details required']" required placeholder="Enter Text" style="width: 100%; background-color: #fff;border: 1px solid #DDE6F3;"></textarea>
                    <div class="file-upload-form" style="margin-bottom: 25px;">
                        Select image :
                        <input  type="file" @change="previewImage" model="imageFile" accept="image/*">
                    </div>
                    <v-btn @click="uploadImageAndUpdate" :disabled="!selectedNewsFeed.valid" class="btn btn-primary">update</v-btn>
                    <v-btn @click="deleteNewsFeed" class="btn btn-primary" style="margin-left: 10px;">delete</v-btn>
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
        createDialogFlag: false,
        editDialogFlag: false,
        newNewsFeed: {},
        selectedNewsFeed: {},
        selectedStateAssembly: {},
        newsFeeds: [],
          uploadCsvDialog: false,
          uploadingFlag: false,
          successFlag: false,
          stateAssemblys: [],
          selectedStateAssembly: "",
      }
    },
    methods: {

      uploadImageAndSave() {
        if(this.selectedFile) {
          samparkService.saveImageFile(this.selectedFile).then((res)=>{
            if (res.code == 201) {
              this.newNewsFeed.image = res.data;
              this.saveNewNewsFeed();
            } else {
            }
          })
        } else {
              this.saveNewNewsFeed();
        }
      },

      stateChanged() {
            this.refreshList();
      },

      saveNewNewsFeed() {
        this.newNewsFeed.stateAssembly = this.selectedStateAssembly;
        samparkService.saveNew('NewsFeed', this.newNewsFeed).then((res) => {
          if (res.code == 201) {
            this.newsFeeds.push(res.data);
            this.createDialogFlag = false;
            this.showSaveSuccessMessage();
            this.clear();
          } else {
            this.showSaveErrorMessage();
          }
        })
      }, 

      uploadImageAndUpdate() {
        if(this.selectedFile) {
          samparkService.saveImageFile(this.selectedFile).then((res)=>{
            if (res.code == 201) {
              this.selectedNewsFeed.image = res.data;
              this.updateNewsFeed();
            } else {
            }
          })
        } else {
            this.updateNewsFeed();
        }
      },

      updateNewsFeed() {
        samparkService.saveNew('NewsFeed', this.selectedNewsFeed).then((res) => {
          if (res.code == 201) {
            this.refreshList();
            this.editDialogFlag = false;
            this.showUpdateSuccessMessage();
            this.clear();
          } else {
            this.showUpdateErrorMessage();
          }
        })
      }, 

      deleteNewsFeed() {
        samparkService.deleteById('NewsFeed', this.selectedNewsFeed.id).then((res) => {
          if (res.code == 201) {
            this.refreshList();
            this.editDialogFlag = false;
            this.showDeleteSuccessMessage();
            this.clear();
          } else {
            this.showDeleteErrorMessage();
          }
        })
      }, 
      getImagePath(imageName) {
        return samparkService.getServerApiPath() + '/mobile/download-image/' + imageName;
      },
      newsFeedSelected(newsFeed) {
        this.selectedNewsFeed = newsFeed;
        this.selectedNewsFeed['valid'] = true;
        this.editDialogFlag = true;
      },

      clear() {
        this.newNewsFeed = {};
        this.selectedNewsFeed = {};
        this.selectedFile = null;
      },

      refreshList() {
        samparkService.getFilteredData('NewsFeed', this.selectedStateAssembly.id).then((res) => {
            this.newsFeeds = res.data;
        })
      },

      previewImage: function(event) {
        var input = event.target;
        this.selectedFile = input.files[0];
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.imageData = e.target.result;
          }
          reader.readAsDataURL(input.files[0]);
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
          samparkService.getFilteredData('NewsFeed', this.selectedStateAssembly.id).then((res) => {
        this.newsFeeds = res.data;
        })
      })
    } else {
       this.selectedStateAssembly = this.stateAssemblys;
         samparkService.getFilteredData('NewsFeed', this.selectedStateAssembly.id).then((res) => {
        this.newsFeeds = res.data;
        })
    } 
    },
    notifications: {
      showSaveSuccessMessage: {
        title: 'News Feed saved',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showSaveErrorMessage: {
        title: 'Failed to save News Feed',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showUpdateSuccessMessage: {
        title: 'News Feed updated successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showUpdateErrorMessage: {
        title: 'Failed to updated News Feed',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showDeleteSuccessMessage: {
        title: 'News Feed deleted successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showDeleteErrorMessage: {
        title: 'Failed to delete News Feed',
        message: '',
        type: 'error',
        timeout: 2500
      }
    }
  }
</script>