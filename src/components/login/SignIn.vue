<template>
  <div class="boxed-view">
    <div class="boxed-view__box">
      <h3>Sign In</h3>

      <form class="boxed-view__form">
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
        <v-btn class="secondary" @click.prevent="login">Login</v-btn>
      </form>

      <div v-if="hasErrors">
        <p v-for="error in errors" class="secondary--text">{{error}}</p>
      </div>
        <p>
          Don't have an account ? <router-link tag="a" to="/signup" class="primary--text">Sign Up</router-link>
        </p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        errors: []
      }
    },
    computed: {
      hasErrors() {
        return this.errors.length > 0;
      }
    },
    methods: {
      login() {
        this.errors = [];

        if(this.isFormValid()) {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(user => {
            this.$store.dispatch('setUser', user);
            this.$router.push('/');
          }).catch(error => {
            this.errors.push(error.message);
          })
        }
      },
      isFormValid() {
        if (this.email.length > 0 && this.password.length > 0) {
          return true;
        } else {
          this.errors.push('Fill all of the fields.');
          return false;
        }
      }
    }
  }
</script>

<style>
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
</style>
