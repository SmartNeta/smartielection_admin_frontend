<template>
  <div class="session-banner login-background">
    <v-container px-0>
      <v-layout row wrap>
        <v-flex xs12 sm10 md6 lg5 mx-auto>
          <!-- <div class="mb-70">
            <router-link to="/" class="d-block text-xs-center"><img src="/static/img/smartNetaIcon.png" /></router-link></p>
          </div> -->
          <div class="session-block">
            <div class="session-head text-xs-center">
              <div class="div-icon logo-pos">
                <img src="/static/img/smartNetaIcon.png" />
              </div>
              <h3 class="mb-4">Login</h3>
              <p class="fs-14 px-5">Enter username and password to access control panel of Smart Neta.</p>
            </div>
            <form v-model="valid" @submit.prevent="login" class="mb-4">
              <v-text-field label="Username" v-model="username" :rules="usernameRules" required ></v-text-field>
              <v-text-field label="Password" v-model="password" type="password" :rules="passwordRules" required></v-text-field>
              <v-btn type="submit" block class="btn-gradient-primary bck">Login Now</v-btn>
            </form>
            <p class="text-xs-center mb-0 log-link"><router-link to="/">Forgot password?</router-link></p>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <div id="loader">
      <div id="overlay-back"></div>
      <div id="overlay">
        <div id="dvLoading">
             <v-progress-circular indeterminate :size="70" :width="7" color="#FF9934"></v-progress-circular>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
  import * as samparkService from '@/views/sampark/service.js';

  export default {
    data() {
      return {
        checkbox: false,
        valid: false,
        email: "",
        username: "",
        emailRules: [
          v => !!v || "E-mail is required",
          v =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "E-mail must be valid"
        ],
        password: "",
        passwordRules: [v => !!v || "Password is required"],
        usernameRules: [v => !!v || "Username is required"],
        user: {}
      };
    },
    methods: {
      login() {
        window.localStorage.removeItem("loginUser");
        window.localStorage.removeItem("auth_token");
        window.localStorage.removeItem("permissions");
        this.showLoader();
        this.user = {
          'username' : this.username,
          'password' : this.password
        }
        samparkService.login(this.user).then((res) => {
          if(res == 500){
            this.showLoginError();
            this.hideLoader();
          }else {
            window.localStorage.setItem("auth_token" , res.token);
            window.localStorage.setItem("loginUser" , JSON.stringify(res.userDetail));
            window.localStorage.setItem("permissions" , res.permissions);
            this.showLoginSuccessMessage();
            this.hideLoader();
            this.$router.push('dashboard');
          }
        });
      },
      showLoader(){
        document.getElementById("loader").style.display = "block";
      },
      hideLoader(){
        document.getElementById("loader").style.display = "none";
      }
    },
    beforeMount() {
      window.localStorage.removeItem("loginUser");
      window.localStorage.removeItem("auth_token");
      window.localStorage.removeItem("permissions");
    },
    notifications: {
      showLoginSuccessMessage: {
        title: "Login Successfully.",
        message: "",
        type: "success",
        timeout: 2500
      },
      showLoginError: {
        title: "Failed to Login",
        message: "",
        type: "error",
        timeout: 2500
      }
    }
  };
</script>
