<template>
  <div>
    <v-toolbar class="primary" dark>
      <v-toolbar-title>
        <router-link :to="'/'" tag="span" style="cursor: pointer" class="secondary--text display-1" >
          <img src="../assets/logo.png"/>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only" dark>

        <v-menu offset-y class="mr-5">
          <v-text-field slot="activator" prepend-icon="search" hide-details single-line dark v-model.trim="searchText"></v-text-field>
          <v-list v-if="this.searchText.length > 0">
            <v-list-tile router :to="'/profile/' + profile.id" avatar v-for="profile in searchProfile" :key="profile.name">
              <v-list-tile-avatar><img :src="profile.avatar"></v-list-tile-avatar>
              <v-list-tile-title>{{ profile.name }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn flat router to="/">
          <v-icon left dark>home</v-icon>
          Home
        </v-btn>
        <v-btn flat router :to="'/profile/' + this.currentUser.uid">
          <v-icon left dark>person</v-icon>
          Profile
        </v-btn>
        <v-btn flat @click="signOut()">
          <v-icon left dark>keyboard_tab</v-icon>
          Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    data () {
      return {
        usersRef: firebase.database().ref('users'),
        users: [],
        searchText: ''
      }
    },
    computed: {
      ...mapGetters(['currentUser']),
      searchProfile() {
        if(this.searchText.length > 0) {
          return this.users.filter((user) => {
            return user.name.indexOf(this.searchText) !== -1;
          });
        }
      }
    },
    mounted () {
      this.$bindAsArray('users', this.usersRef);
    },
    methods: {
      signOut() {
        firebase.database().ref('presence').child(this.currentUser.uid).remove();
        firebase.auth().signOut();
        this.$store.dispatch('setUser', null);
        this.$router.push('/signin');
      }
    }
  }
</script>

<style lang="stylus">

</style>
