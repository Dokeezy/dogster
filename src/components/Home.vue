<template>
  <div>
    <PublicationForm></PublicationForm>
    <Publications v-for="publication in dateOrderedPublications" :publication="publication"></Publications>

  </div>
</template>

<script>
  import PublicationForm from './publications/PublicationForm.vue';
  import Publications from './publications/Publications.vue';

  export default {
    data () {
      return {
        publicationsRef: firebase.database().ref('publications'),
        publications: []
      }
    },
    computed: {
      dateOrderedPublications () {
        return this.publications.sort((publiA, publiB) => {
          return publiA.timestamp < publiB.timestamp;
        });
      }
    },
    components: {
      PublicationForm,
      Publications
    },
    mounted () {
      this.$bindAsArray('publications', this.publicationsRef);
    }
  }
</script>

<style lang="stylus">
</style>
