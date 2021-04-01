<template>
    <v-app class='background'>
        <v-container >
        <v-layout row align-center justify-center class='mt-10'>
        <v-flex xs12 md6 sm6 class=''>
             <v-card flat class='justify-center grey lighten-4' elevation="4">
                <v-card-title primary-title>
                <h4 class='grey--text text--darken-1'>Register</h4>
                </v-card-title>
                <v-form>
                <v-text-field class='ml-5 mr-5
                ' v-model='username' :rules="emailRules" label="email">
                </v-text-field>
            <v-text-field class='ml-5 mr-5' v-model='password'
              label="password" type="password">
            </v-text-field>
            <v-text-field class='ml-5 mr-5' v-model='confirm_password'
              label="confirm-password" :rules="passwordRules"
             type="password">
            </v-text-field>
                <v-card-actions class='justify-center'>
                <v-btn depressed primary @click="SignUp" class='pink lighten-2 white--text'>Register
                </v-btn>
                </v-card-actions>
                </v-form>
            </v-card>
            <v-row >
              <v-col align='end'>
             <v-btn depressed @click="doLogin"
                     to='/' small class='mt-2 pink lighten-2  white--text'>
                        Login
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
      confirm_password: '',
      emailRules: [
        (v) => /[a-zA-z0-9._]+@[a-zA-Z]+\.[a-zA-z]{2,4}/.test(v) || 'Invalid email',
      ],
      passwordRules: [
        (v) => v === this.password || 'Password do not match!',
      ],
    //   passwordRules: [
    //     (v) => v.length >= 5 || 'Minimum length is 5 characters',
    //   ],
    };
  },
  methods: {
    async SignUp() {
      try {
        firebase.auth().createUserWithEmailAndPassword(this.username, this.password).then(
          (cred) => { console.log(cred); },
        );
        this.$router.replace({ name: 'Login' });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
