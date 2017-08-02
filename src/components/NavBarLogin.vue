<template>
  <div>
    <v-toolbar class="primary" dark>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer" class="secondary--text display-1">
          <img src="../assets/logo.png"/>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only" dark>
        <v-btn flat v-for="(item, index) in menuItems" :key="index" router :to="item.link" exact>
          <v-icon left dark>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false,
        menuItems: [
          { icon: 'face', title: 'Sign up', link: '/signup' },
          { icon: 'lock_open', title: 'Sign in', link: '/signin' }
        ]
      }
    }
  }
</script>

<style lang="stylus">
</style>
