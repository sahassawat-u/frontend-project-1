<template>
    <v-app class='background'>
        <v-container >
        <v-layout row align-center justify-center class='mt-10'>
        <v-flex xs12 md6 sm6 class=''>
             <v-card flat class='justify-center grey lighten-4' elevation="4">
                <v-card-title primary-title>
                <h4 class='grey--text text--darken-1'>Login</h4>
                </v-card-title>
                <v-form>
                <v-text-field class='ml-5 mr-5' :rules="emailRules"
                 v-model="username" label="email">
                </v-text-field>
            <v-text-field class='ml-5 mr-5'
             name="password" :rules="passwordRules" v-model="password"
             label="password" type="password" @keyup.enter="doLogin">
            </v-text-field>
                <v-card-actions class='justify-center'>
                <v-btn depressed primary large @click="doLogin"
                 class='pink lighten-2 white--text'>
                    Login
                    <v-icon left class='pl-2'>login</v-icon>
                </v-btn>
                </v-card-actions>
                </v-form>

            </v-card>
            <v-row>
                <v-col>
                <v-btn
                 depressed small @click="loginWithProvider" class='mt-2 green
                 lighten-1 white--text'>
                 <v-img max-height="25" max-width="25" src="https://www.fintechfutures.com/files/2016/03/google.png"></v-img>
                  Sign in with Gmail
                </v-btn>
                </v-col>
                  <v-col class='text-right'>
                    <v-btn depressed @click="doLogin"
                     to='/register' small class='mt-2 pink lighten-2  white--text'>
                        Register
                    </v-btn>
                    </v-col>
            </v-row>
        </v-flex>
        </v-layout>
        </v-container>
    </v-app>
</template>
<style scoped>
.background {
    background-image: url(https://cdn.wallpapersafari.com/54/1/M5zI2u.jpg);
    background-repeat: no-repeat;
    background-size:cover
}
</style>
<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      emailRules: [
        (v) => /[a-zA-z0-9._]+@[a-zA-Z]+\.[a-zA-z]{2,4}/.test(v) || 'Invalid email',
      ],
      passwordRules: [
        (v) => v.length >= 3 || 'Minimum length is 3 characters',
      ],
    };
  },
  methods: {
    async doLogin() {
      firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(
        (response) => {
          this.$store.dispatch('auth/setAuthenticatedUser', response.user);
          this.$router.push({ name: 'Todo' });
        },
      ).catch((err) => {
        console.log(err);
      });
    },
    loginWithProvider() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(
          (response) => {
            this.$store.dispatch('auth/setAuthenticatedUser', response.user);
            this.$router.replace({ name: 'Todo' });
          },
        ).catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss">
#no-background-hover::before {
   background-color: transparent !important;
}
</style>
