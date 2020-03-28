<!-- Header Structure -->
<template>
  <div>
    <v-navigation-drawer
      app
      fixed
      clipped
      v-model="drawer"
      :width="250"
      class="Vuely-sidebar"
      :style="sidebarImage"
      :class="{'background-none': !backgroundImageToggle}"
      :right="ifRtlLayout">
      <!-- App Sidebar -->
      <app-sidebar></app-sidebar>
    </v-navigation-drawer>
    <v-toolbar class="navbar-default" app fixed :clipped-left="!ifRtlLayout" :clipped-right="ifRtlLayout">
      <!-- App Logo -->
      <div class="site-logo">
        <router-link to="/dashboard"><img src="/static/img/smartNetaIcon.png" alt="site logo" height="50"></router-link>
      </div>
      <v-toolbar-title>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="right-nav">
        <!-- App Searchbar -->
        <v-btn icon @click="toggleFullScreen" class="d-inline-50">
          <i class="ti-fullscreen"></i>
        </v-btn>
      </div>
    </v-toolbar>
    <div style="text-align:center;padding:5px 0px;bottom: 0px; position: absolute; z-index: 9; width: 100%; background:whitesmoke; color: #202020;"">&copy;2019 <a target="_blank" href="http://smartneta.com/">Smart Neta.</a> Political Campaign Management Software. All Rights Reserved <a href="http://smartneta.com/privacy-policy/" target="_blank">Privacy Policy.</a></div>
  </div>
</template>

<script>
/* eslint-disable */
import Sidebar from "../Sidebar/Sidebar.vue";
import EventBus from "../../lib/eventBus";
import screenfull from "screenfull";

export default {
  data() {
    return {
      collapsed: false, // collapse sidebar
      drawer: true, // sidebar drawer default true
      sidebarImages: "", // sidebar background images
      enableSidebarBackground: false,
      enableDefaultSidebar: false,
      rtlLayout: false,
      searchFormOpen: false,
      items: [
        {
          title: "Total App Memory",
          icon: "storage"
        },
        {
          title: "Total Memory Used",
          icon: "memory"
        },
        {
          title: "12 Unread Mail",
          icon: "mail"
        },
        {
          title: "Feedback",
          icon: "feedback"
        }
      ]
    };
  },
  computed: {
    // computed property to get the state of collapsed sidebar
    sidebarCollapse() {
      EventBus.$on("collapseSidebar", payload => {
        this.collapsed = payload;
      });
      return this.collapsed;
    },
    // computed property to change the background image of the sidebar
    sidebarImage() {
      EventBus.$on("changeBackgroundImage", payload => {
        this.sidebarImages = payload;
      });
      return "background-image: url(" + this.sidebarImages + ");";
    },
    // computed property to display the sidebar image or not
    backgroundImageToggle() {
      EventBus.$on("backgroundImage", payload => {
        this.enableSidebarBackground = payload;
      });
      return this.enableSidebarBackground;
    },
    // if rtl Layout
    ifRtlLayout() {
      EventBus.$on("rtlLayoutEvent", payload => {
        this.rtlLayout = payload;
      });
      return this.rtlLayout;
    }
  },
  methods: {
    // toggle full screen method
    toggleFullScreen() {
      // if (screenfull.enabled) {
      //   screenfull.toggle();
      // }

      if (!document.fullscreenElement && 
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    },
    searchFormHanler() {
      this.searchFormOpen = !this.searchFormOpen;
    }
  },
  components: {
    appSidebar: Sidebar
  }
};
</script>
