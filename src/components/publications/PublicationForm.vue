<template>
  <v-layout class="mt-4">
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-card-text>
          <v-text-field
                  name="content"
                  label="What's up today ?"
                  id="content"
                  type="text"
                  multi-line
                  v-model.trim="content"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="publish" class="primary--text">Publish</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    data () {
      return {
        content: '',
        publicationsRef: firebase.database().ref('publications'),
      }
    },
    computed: {
      ...mapGetters(['currentUser']),
    },
    methods: {
      publish() {
        if (this.content.length > 0) {
          this.publicationsRef.push({
            content: this.content,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
              name: this.currentUser.displayName,
              avatar: this.currentUser.photoURL,
              id: this.currentUser.uid
            }
          }).then(() => {
            this.content = '';
          });
        }
      }
    }
  }
</script>

<style>

</style>
