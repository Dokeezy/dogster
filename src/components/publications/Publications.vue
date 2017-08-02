<template>
  <v-layout class="mb-4 mt-4">
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-card-title primary-title>
          <v-list>
            <v-list-tile avatar router :to="'/profile/' + publication.user.id">
                <v-list-tile-avatar>
                  <img :src="publication.user.avatar">
                </v-list-tile-avatar>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="publication.user.name"></v-list-tile-title>
                  <v-list-tile-sub-title>{{publication.timestamp | fromNow}}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-title>
        <v-card-text>
          <p>
            {{publication.content}}
          </p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import moment from 'moment';

  export default {
    props: {
      publication: {
        type: Object
      }
    },
    filters: {
      fromNow(value) {
        return moment(value).fromNow();
      }
    }
  }
</script>

<style>

</style>
