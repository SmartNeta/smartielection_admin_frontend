<!-- Side Structure -->
<template>
  <div class="" :class="sidebarFilter">
        <v-toolbar flat class="transparent scroll-area">
          <v-list class="pa-0">
            <v-list-tile avatar class="sidebar-profile">
              <v-list-tile-avatar>
                <img src="/static/img/One_User_Orange.png" />
                <!-- <img src="/static/img/modi.png" /> -->
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title class="fw-bold">{{ user && user.firstName ? user.firstName : ""}} {{ user && user.lastName ? user.lastName : ""}}</v-list-tile-title>
              </v-list-tile-content>
              <v-spacer></v-spacer>
              <v-menu bottom left>
                <v-btn icon slot="activator" class="ma-0">
                  <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
<!-- 
                  <v-list-tile to="/users/user-profile">
                    <v-icon class="mr-3 font-lg text-gray">ti-user</v-icon>
                    <v-list-tile-title>View Profile</v-list-tile-title>
                  </v-list-tile>

                  <v-list-tile to="/inbox">
                    <v-icon class="mr-3 font-lg text-gray">ti-email</v-icon>
                    <v-list-tile-title>Inbox</v-list-tile-title>
                  </v-list-tile>

                  <v-list-tile to="/users/users-list">
                    <v-icon class="mr-3 font-lg text-gray">ti-bell</v-icon>
                    <v-list-tile-title>Users List</v-list-tile-title>
                  </v-list-tile> -->

                  <v-list-tile to="/login">
                    <v-icon class="mr-3 font-lg text-gray">ti-power-off</v-icon>
                    <v-list-tile-title>Log Out</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-list-tile>
            <template v-for="item in category2" >
              <template v-if="item.items!= null">
                <v-list-group
                  :key="item.title"
                  :prepend-icon="item.action"
                  no-action
                  v-model="item.active"
                >
                <v-list-tile ripple slot="activator" v-if="item.items !== null">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ $lang.strings[item.title] }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile ripple slot="activator" :to="item.path" v-else>
                  <v-list-tile-action>
                    <i :class="item.action"></i>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ $lang.strings[item.title] }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>


                <template v-for="subItem in item.items" >
                    <template v-if="subItem.items!= null" class="sub-item">

                        <v-list-group
                            :key="subItem.title"
                            :prepend-icon="item.action"
                            v-model="subItem.active"
                          >

                        <v-list-tile ripple slot="activator" v-if="subItem.items !== null">
                          <v-list-tile-content>
                            <v-list-tile-title>{{ $lang.strings[subItem.title] }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile ripple slot="activator" :to="subItem.path" v-else>
                          <v-list-tile-action>
                            <i :class="subItem.action"></i>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title>{{ $lang.strings[subItem.title] }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                         </v-list-group> 
                      </template>

                    <template v-else>
                      <v-list-tile :to="subItem.path" :key="subItem.path">
                        <v-list-tile-content>
                          <v-list-tile-title>{{ $lang.strings[subItem.title] }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
            </template>
              
            </v-list-group>
            </template>

            <template v-else>
              <v-list-tile :to="item.path" :key="item.path">
                <v-list-tile-action>
                  <v-icon>{{ item.action }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title style="font-size:15px;">{{ $lang.strings[item.title] }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
              

            </template>
          </v-list>
        </v-toolbar>
  </div>
</template>

<script>
/* eslint-disable */
import { category1} from "./SidebarLinks";
import EventBus from "../../lib/eventBus";
export default {
  data() {
    return {
      category1: category1,
      category2: [],
      category3: [],
      permissions: [],
      backgroundFilters: null,
      expandSidebar: "",
      user:{}
    };
  },
  computed: {
    // change the background color of the sidebar
    sidebarFilter() {
      EventBus.$on("sidebarFilters", payload => {
        this.backgroundFilters = payload;
      });
      return this.backgroundFilters;
    }
  },
  beforeMount() {
    var category3 =  JSON.parse(JSON.stringify(this.category1));
    this.permissions =  window.localStorage.getItem('permissions').split(',');
    this.category2 = [];
    this.category2.push(this.category1[0]);
    for(var k = 1 ; k < this.category1.length ; k++) {
      var permIndex = this.permissions.indexOf(this.category1[k].permission);
      if(this.category1[k].items && this.category1[k].items.length > 0 && permIndex > -1){
            for (var m= 0; m < this.category1[k].items.length; m++) {
              var index = this.permissions.indexOf(this.category1[k].items[m].permission);
              if(index < 0 ){
                for(var z = 0;z< category3[k].items.length;z++){
                  if(category3[k].items[z].permission  == this.category1[k].items[m].permission ){
                    category3[k].items.splice(z,1);
                  }
                }
              }
            }
            if(category3[k].items.length > 0){
                this.category2.push(category3[k]);
            }
      }else{
              if( permIndex > -1){
                this.category2.push(this.category1[k]);  
            }
      }
    }
    
    var data =  window.localStorage.getItem('loginUser');
    this.user = JSON.parse(data);
  }
};
</script>
<style type="text/css">
  .v-list__group__items--no-action .v-list__tile {
    padding-left: 70px;
    font-size: 14px;
  }
  .v-list__tile, .v-list__group__header .v-list__group__header__append-icon, .v-list__group__header .v-list__group__header__prepend-icon {
    padding-left: 10px;
  }
  .Vuely-sidebar{
    max-height: calc(100% - 90px) !important;
  }
  @media only screen and (max-width: 500px) {
    .Vuely-sidebar{
      max-height: calc(100% - 120px) !important;
    }
  }
</style>