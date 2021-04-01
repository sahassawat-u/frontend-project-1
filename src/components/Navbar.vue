<template>
    <nav>
        <!-- <v-app-bar> -->
        <v-app-bar elevate-on-scroll flat app color='grey lighten-4'>
            <v-toolbar-title class='pl-3 text-uppercase grey--text'>
                <span class='text--darken-1 font-weight-bold'>Todo </span>
                <span class='font-weight-light'>Application</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-menu offset-y>
                <v-btn depressed slot="activator" color='grey lighten-4' >
                    <v-icon left color='grey'>expand_more</v-icon>
                    <span class='grey--text'>Menu</span>
                </v-btn>
                <v-list>
                    <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
                        <v-list-tile-title>{{link.text}}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu> -->
            <v-btn v-if="!['Login', 'Register'].includes($route.name)"
             to='/' depressed color='grey lighten-4'>
                {{where}}
                <span class='grey--text'>Sign Out</span>
                <v-icon color='grey' left class='pl-4 '>logout</v-icon>
            </v-btn>
        </v-app-bar>
        <!-- </v-app-bar> -->
    </nav>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { text: 'Login', route: '/' },
        { text: 'Register', route: '/Register' },
      ],
    };
  },
  computed: {
    isLogin() {
      return this.$router.history.current.name === 'Todo';
    },
    // where() {
    //   return this.$router.history.current.name !== 'Login';
    // },
  },
};
</script>
