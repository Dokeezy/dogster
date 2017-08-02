<template>
  <v-app light>
    <component :is="checkCurrentRoute()"></component>
    <router-view></router-view>
  </v-app>
</template>

<script>
  import NavBar from './components/NavBar.vue';
  import NavBarLogin from './components/NavBarLogin.vue';

  export default {
    data () {
      return {
      }
    },
    components: {
      NavBar,
      NavBarLogin
    },
    methods: {
      checkCurrentRoute() {
        if (this.$route.path === '/signin' || this.$route.path === '/signup') {
          return 'NavBarLogin'
        } else {
          return 'NavBar'
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'

  * {
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: 'Montserrat';
    font-size: 1.6rem;
  }

  h1 {
    font-weight: 300;
    margin-bottom: 1.4rem;
  }

  h2 {
    font-size: 1.4rem;
    margin-bottom: 1.8rem;
  }

  a {
    color: black;
  }
</style>
