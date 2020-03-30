<template lang="pug">
  .login-page.center
    h1 Login
    .container
      form(@submit.prevent="login")
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
        button.btn-primary(type="submit") Login
</template>

<script>
//import {fb} from "../../../server/src/firebase";

export default {
  name: "LoginPage",
  components: {},
  data() {
    return {
      email: null,
      password: null
    };
  },

  methods: {
    login(){
      /*fb.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace({ name: "feed_path" });
        })
        .catch(function(error) {
          alert(error.message);
      });*/
    }
  }
};
//TODO Add autocomplete to inputs
//TODO Implement errors (UI)
</script>

<style scoped></style>
