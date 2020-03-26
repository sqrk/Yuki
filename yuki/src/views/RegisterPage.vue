<template lang="pug">
  .register-page.center
    h1 Register
    .container
      form(@submit.prevent="register")
        label(for="email") Email address:
        br
        input#email(
          type="email"
          v-model="email"
          placeholder="abc@example.com"
          required
        )
        br
        label(for="password") Password:
        br
        input#password(
          type="password"
          name="password"
          v-model="password"
          required
        )
        br
        label(for="password-conf") Confirm Password:
        br
        input#password-conf(
          type="password"
          name="password"
          v-model="passwordConf"
          required
        )
        br
        button(type="submit") Register
</template>

<script>
//TODO Add autocomplete to inputs, check confirm password
import {fb} from '../firebase';

export default {
  name: "RegisterPage",
  components: {},
  data() {
    return {
      email: null,
      password: null,
      passwordConf: null
    };
  },

  methods: {
    register() {
      fb.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log("Register1", this.$isLoggedOut);
          this.$isLoggedOut = false;
          console.log("Register2", this.$isLoggedOut);
          this.$router.replace({name: "discomfort_test_path"})
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    }
  }
};
</script>

<style scoped></style>
