<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
          <v-card-media :src="userProfile.avatar" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{userProfile.name}}</h3>
              <div>{{userProfile.description}}</div>
            </div>
          </v-card-title>
          <v-card-actions v-if="currentUser.uid === id">
            <v-btn @click.stop="editPhoto" flat class="primary--text">Edit Photo</v-btn>
            <v-btn @click.stop="editDescription" flat class="primary--text">Edit Description</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout class="mt-4">
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Latest activities</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <Publications v-for="publication in ownPublications" :publication="publication"></Publications>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>




    <v-dialog v-model="photoDialog" lazy absolute>
      <v-card>
        <v-card-title>
          <div class="headline">Update your photo</div>
        </v-card-title>
        <v-card-text>
          <div v-if="!image">
            <input type="file" @change="onFileChange" required>
          </div>
          <div v-else>
            <img :src="image" />
            <button @click="removeImage">Remove image</button>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary--text" flat="flat" @click.native="savePhoto()">Done</v-btn>
          <v-btn class="secondary--text" flat="flat" @click.native="photoDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="descriptionDialog" lazy absolute>
      <v-card>
        <v-card-title>
          <div class="headline">Update your description</div>
        </v-card-title>
        <v-card-text>
          <v-text-field
                  name="description"
                  label="Description"
                  id="description"
                  type="description"
                  v-model.trim="description"
                  multi-line
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary--text" flat="flat" @click.native="saveDescription()">Done</v-btn>
          <v-btn class="secondary--text" flat="flat" @click.native="descriptionDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex';
  import Publications from '../publications/Publications.vue';

  export default {
    data () {
      return {
        usersRef: firebase.database().ref('users'),
        publicationsRef: firebase.database().ref('publications'),
        userProfile: {},
        photoDialog: false,
        descriptionDialog: false,
        description: '',
        image: '',
        publications: []
      }
    },
    props: {
      id: {
        type: String
      }
    },
    components: {
      Publications
    },
    computed: {
      ...mapGetters(['currentUser']),
      ownPublications() {
        return this.publications.filter((publication) => {
          return publication.user.id === this.id
        }).sort((publiA, publiB) => {
          return publiA.timestamp < publiB.timestamp;
        });
      }
    },
    methods: {
      editPhoto() {
        this.photoDialog = true;
      },
      savePhoto() {
        this.usersRef.child(this.currentUser.uid).update({
          avatar: this.image
        });
        this.image = '';
        this.photoDialog = false;
      },
      editDescription() {
        this.descriptionDialog = true;
      },
      saveDescription() {
        this.usersRef.child(this.currentUser.uid).update({
          description: this.description
        });
        this.description = '';
        this.descriptionDialog = false;
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImage(files[0]);
      },
      createImage(file) {
        var image = new Image();
        var reader = new FileReader();
        var vm = this;

        reader.onload = (e) => {
          vm.image = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      removeImage: function (e) {
        this.image = '';
      }
    },
    mounted() {
      this.$bindAsObject('userProfile', this.usersRef.child(this.id));
      this.$bindAsArray('publications', this.publicationsRef);
    },
    watch: {
      id: function (val) {
        this.$bindAsObject('userProfile', this.usersRef.child(val));
      }
    }
  }
</script>

<style>
  input[type=file] {
    font-size: 1rem;
    margin-bottom: 1.4rem;
  }
</style>
