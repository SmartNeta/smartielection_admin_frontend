<style>
  .theme--light .toolbar, .application .theme--light.toolbar {
    color: #FFF;
}
</style>
<template>
    <v-container fluid grid-list-xl py-0>
    <div class="app-card">
      <div class="app-card-content">
          
        <v-data-table
            v-bind:headers="headers"
            v-bind:items="dynamicFields"
            >
      
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.label }}</td>
            <td class="text-xs-right">
              <v-btn icon @click="editDynamivFiled(props.item)"><v-tooltip bottom><v-icon slot="activator">edit</v-icon><span>Edit</span>
                    </v-tooltip></v-btn>
            </td>
          </template>
         
        </v-data-table>
      </div>
    </div>  

      <v-dialog v-model="editDialogFlag" max-width="500px">
              <v-card>
                <v-toolbar style="flex: 0 0 auto;" class="bg-primary">
                  <v-toolbar-title>Update Citizen dynamic Field</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon @click.native="closePop" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>

                  <v-form v-model="selectedDynamicField.valid" ref="form">
                    <v-text-field
                      :label="selectedDynamicField.name"
                      v-model="selectedDynamicField.label"
                      :rules="[v => !!v || 'State is required']"
                      required
                    ></v-text-field>
                    <v-btn @click="updateDynamivFiled" :disabled="!selectedDynamicField.valid" class="btn-primary">update</v-btn>
                    <v-btn @click="closePop" class="btn-secondary">cancel</v-btn>
                  </v-form>
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
        editDialogFlag: false,
        selectedDynamicField: "",
        headers: [
          {
            text: 'Name',
            align: 'center',
            value: 'name'
          },
            {
            text: 'Lable',
            align: 'center',
            value: 'label'
          },
           {
            text: 'Action',
            sortable: false,
            align: 'right',
          }
        ],
        dynamicFields: []
      }
    },
     methods: {
        closePop(){
        this.selectedDynamicField= { valid: true},
        this.editDialogFlag = false
      },
        editDynamivFiled(dynamicField) {
          this.selectedDynamicField = dynamicField;
          this.editDialogFlag = true;
      },
      updateDynamivFiled() {
        samparkService.update('CitizenDynamicFileds', this.selectedDynamicField).then((res) => {
          if (res.code == 201) {
            this.closePop();
            this.showUpdateSuccessMessage();
            this.clear();
          } else {
            this.showUpdateErrorMessage();
          }
        })
      },
     },
    beforeMount() {
      samparkService.getAll('CitizenDynamicFileds').then((res) => {
          this.dynamicFields = res.data;
      })
    },
     notifications: {
      showUpdateSuccessMessage: {
        title: 'Citizen Dynamic Filed updated successfully',
        message: '',
        type: 'success',
        timeout: 2500
      },
      showUpdateErrorMessage: {
        title: 'Failed to updated Citizen Dynamic Filed',
        message: '',
        type: 'error',
        timeout: 2500
      }
    }

  }
</script>
