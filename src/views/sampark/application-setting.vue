<style type="text/css">
  @media(max-width: 550px){
    .image-preview{
      margin-left: 0px !important;
    }
    .image-preview img{
      width: 100% !important;
    }
  }
  .app-card .app-card-title{
    padding-left: 0px;
  }

  @media only screen and (max-width: 924px) {
    .full_width_hundred {
      flex-basis: 100% !important;
      max-width: 100% !important;
    }
  }
</style>
<template>
  <v-container fluid grid-list-xl>
    <div class="app-card">
      <div class="app-card-content">
        <v-layout row wrap>
          <v-flex xs12 sm5 class="full_width_hundred">
            <div style="margin: 0px 20px;">
              <v-text-field
                label="Name"
                v-model="applicationSettingsForm.name"
                :rules="[v => !!v || 'Application Name is required']"
                required
              ></v-text-field>
            </div>  

            <div style="margin: 0px 20px;">
              <v-text-field
                label="Contact Number"
                v-model="applicationSettingsForm.contact"
                :rules="[v => !!v || 'Application contact is required']"
                required
              ></v-text-field>
            </div>  

            <div style="margin: 0px 20px;">
              <v-text-field
                label="Email"
                v-model="applicationSettingsForm.email"
                :rules="[v => !!v || 'Application Email is required']"
                required
              ></v-text-field>
            </div>  

            <div style="margin: 0px 20px;">
              <v-text-field
                label="Website"
                v-model="applicationSettingsForm.website"
                :rules="[v => !!v || 'Application Website is required']"
                required
              ></v-text-field>
            </div>  

            <div style="margin: 0px 20px;">
              <v-text-field
                label="Twitter Link"
                v-model="applicationSettingsForm.twitterLink"
                :rules="[v => !!v || 'Application twitter link is required']"
                required
              ></v-text-field>
            </div>  

            <div style="margin: 0px 20px;">
              <v-text-field
                label="Facebook Link"
                v-model="applicationSettingsForm.facebookLink"
                :rules="[v => !!v || 'Application facebook link is required']"
                required
              ></v-text-field>
            </div>  

            <div style="margin: 0px 20px;">
             <div class="app-card-title" style="padding-top: 0;">
                <h3>Application Text</h3>
              </div>
              <textarea v-model="applicationSettingsForm.text" :rows="4"  placeholder="Enter Text" style="width: 100%;background-color: #fff;border: 1px solid #DDE6F3;"></textarea>
            </div>

            <div style="margin: 0px 20px;">
             <div class="app-card-title" style="padding-top: 0;">
                <h3>About</h3>
              </div>
              <textarea v-model="applicationSettingsForm.about" :rows="4"  placeholder="Enter About Application" style="width: 100%;background-color: #fff;border: 1px solid #DDE6F3;"></textarea>
            </div>

            <div style="margin: 0px 20px; margin-bottom: 15px;">
             <div class="app-card-title" style="padding-top: 5;">
                <h3>Footer Text</h3>
              </div>
              <textarea v-model="applicationSettingsForm.footer" :rows="4"  placeholder="Enter Footer Text" style="width: 100%;background-color: #fff;border: 1px solid #DDE6F3;"></textarea>
            </div>


            <div style="margin: 0px 20px; margin-bottom: 15px;">
             <div class="app-card-title" style="padding-top: 5;">
                <h3>Address 1</h3>
              </div>
              <textarea v-model="applicationSettingsForm.address1" :rows="4"  placeholder="Enter Address" style="width: 100%;background-color: #fff;border: 1px solid #DDE6F3;"></textarea>
            </div>

            <div style="margin: 0px 20px; margin-bottom: 15px;">
             <div class="app-card-title" style="padding-top: 5;">
                <h3>Address 2</h3>
              </div>
              <textarea v-model="applicationSettingsForm.address2" :rows="4"  placeholder="Enter Address" style="width: 100%;background-color: #fff;border: 1px solid #DDE6F3;"></textarea>
            </div>

          </v-flex>
          <v-flex xs12 sm7 class="full_width_hundred">
            <div style="float: right;margin: 0px 20px;">
              <div v-if="imageData.length > 0">
                <div class="app-card-title">
                  <h3>Logo Preview</h3>
                </div>
                <div class="image-preview"  style="margin-right: : 20px"  >
                       <img style="height:250px;width: 500px;margin-bottom: 40px;" class="preview" v-bind:src="imageData">
                </div>
              </div>

              <div v-if="imageData.length < 1">
                <div class="app-card-title">
                  <h3>Current Logo</h3>
                </div>
                <div class="image-preview" style="margin-right: : 20px" >
                       <img style="height:250px;width: 500px;margin-bottom: 40px;" class="preview" src="/open/mobile/logo.jpg">
                </div>
              </div>
            </div>

            <div style="margin: 0px 20px;">
              <div class="file-upload-form">
                  Select logo :
                  <input  type="file" @change="previewImage" model="imageLogo" accept="image/*">
              </div>
            </div>
            <v-flex xs12 sm12>
              <v-btn @click="uploadLogoFile"  :disabled="uploadingFlag" class="btn-primary">SAVE</v-btn>
            </v-flex>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </v-container>
</template>

<script>
  import * as samparkService from "./service";
  import FileSelect from './FileSelect.vue'

  export default {
    components: {
      FileSelect
    },
    data () {
      return {
          uploadCsvDialog: false,
          uploadingFlag: false,
          successFlag: false,
          logoImage: {},
          imageLogo: {},
          imageData: "",
          selectedFile: "",
          img: "",
          applicationSettingsForm: {
            text: "",
            footer: "",
            name: "",
            logo: "",
            id: null
          }
      }
    },
    methods: {
      uploadLogoFile() {
        if(!this.selectedFile)  {
          if(this.applicationSettingsForm && this.applicationSettingsForm.logo){
              this.saveApplicationSettings();
              return;
          }else{
            this.showFileValidationMessage();
            return;
          }
        }
        this.uploadingFlag = true
        samparkService.saveLogoImage(this.selectedFile).then((res)=>{
          this.uploadingFlag = false
          if (res.code == 201) {
            this.successFlag = true;
            this.applicationSettingsForm.logo = res.data;
            this.saveApplicationSettings();
          } else {
         //   this.showUploadErrorMessage();
          }
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
        },
        saveApplicationSettings(){
           samparkService.saveApplicationSettings(this.applicationSettingsForm).then((res)=>{
            this.applicationSettingsForm = res.data || this.applicationSettingsForm;
            this.showSaveSuccessMessage();
          });
        }
    },
    beforeMount() {
      samparkService.getApplicationSettings().then((res)=>{
        this.applicationSettingsForm = res.data || this.applicationSettingsForm;
      });
    },
    notifications: {
      showSaveSuccessMessage: {
        title: 'Setting saved',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showSaveErrorMessage: {
        title: 'Failed to save satting',
        message: '',
        type: 'error',
        timeout: 2500
      },
      showFileValidationMessage: {
        title: 'Please select Logo',
        message: '',
        type: 'error',
        timeout: 2500
      },
    }
  }
</script>