<template>
    <div class="boxed-view">
      <div class="boxed-view__box">
        <h3>Sign Up</h3>

        <form class="boxed-view__form">
          <v-text-field
                  name="name"
                  label="Pseudo"
                  id="name"
                  type="text"
                  v-model.trim="name"
                  required
          ></v-text-field>
          <v-text-field
                  name="email"
                  label="Email"
                  id="email"
                  type="email"
                  v-model.trim="email"
                  required
          ></v-text-field>
          <v-text-field
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                  v-model.trim="password"
                  required
          ></v-text-field>
          <v-text-field
                  name="password_confirm"
                  label="Confirm Password"
                  id="password_confirm"
                  type="password"
                  v-model.trim="password_confirm"
                  required
          ></v-text-field>

          <div v-if="!image">
            <p>Upload an image</p>
            <input type="file" @change="onFileChange" required>
          </div>
          <div v-else>
            <img :src="image" />
            <button @click="removeImage">Remove image</button>
          </div>

          <v-btn class="secondary" @click.prevent="register">Register</v-btn>
        </form>

        <div v-if="hasErrors">
          <p v-for="error in errors" class="secondary--text">{{error}}</p>
        </div>
          <p>
            Already have an account ? <router-link tag="a" to="/signin" class="primary--text">Sign In</router-link>
          </p>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        password_confirm: '',
        errors: [],
        image: null
      }
    },
    computed: {
      hasErrors() {
        return this.errors.length > 0;
      }
    },
    methods: {
      register() {
        // Clean up the errors
        this.errors = [];

        // 1 - Check for some errors
        if (this.isFormValid() && this.isPseudoUnique(this.name)) {

          // 2 - Create the user account
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(user => {

            // 3 - Updating the account infos
            user.updateProfile({
              displayName: this.name,
              photoURL: this.image

            }).then(() => {

              // 4 - Creating a user ref to acces it easily
              firebase.database().ref('users').child(user.uid).set({
                name: user.displayName,
                avatar: user.photoURL,
                description: 'A new dogster user :)',
                id: user.uid
              }).then(() => {

                // Save usernames to usernames refs to access them easily
                firebase.database().ref('usernames').push({
                  'id': this.name
                });

                // Set the currentUser to this user in store.js
                this.$store.dispatch("setUser", user);
                // Go to home page
                this.$router.push('/');

              });
            }).catch(error => {
              this.errors.push(error.message);
            });
          }).catch(error => {
            this.errors.push(error.message);
          });
        }
      },
      isEmpty () {
        if (this.name.length == 0 || this.email.length == 0 || this.password.length == 0 || this.password_confirm.length == 0 || this.image == null) {
          return false;
        } else {
          return true;
        }
      },
      passwordValid () {
        if (this.password.length > 6) {
          if (this.password === this.password_confirm) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      },
      isFormValid () {
        if (!this.isEmpty()) {
          this.errors.push('Fill all of the fields.');
          return false
        }
        if (!this.passwordValid()) {
          this.errors.push('Passwords are differents.');
          return false
        }
        return true;
      },
      isPseudoUnique (newPseudo) {
        let condensedArray = [];
        this.usernames.forEach((username) => {
          condensedArray.push(username.id);
        });
        if (condensedArray.indexOf(newPseudo) === -1) {
          return true;
        } else {
          this.errors.push('Pseudo already exists.');
          return false;
        }
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
    beforeCreate() {
      this.$bindAsArray('usernames', firebase.database().ref('usernames'));
    }
  }
</script>

<style scoped>
  .boxed-view {
    align-items: center;
    justify-content: center;
    background: #f3f3f3;
    display: flex;
    width: 100vw;
    height: 100vh;
  }

  h3 {
    font-size: 2rem;
  }

  .boxed-view__box {
    background-color: white;
    padding: 2.4rem;
    text-align: center;
    width: 30rem;
  }

  .boxed-view__form {
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
  }

  .boxed-view__box p {
    margin-top: 1rem;
    font-size: 1.2rem;
  }

  .boxed-view__box a {
    text-decoration: underline;
    cursor: pointer;
  }

  img {
    width: 30%;
    margin: auto;
    display: block;
    margin-bottom: 10px;
  }

  input[type=file] {
    font-size: 1rem;
    margin-bottom: 1.4rem;
  }
</style>
