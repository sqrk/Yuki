<template lang="pug">
  .register-page.center
    h1 Register
    .container.center
      form(@submit.prevent="register")
        .form-group
          label(for="email") Email address:
          input.form-control#email(
            type="email"
            v-model="user.email"
            placeholder="abc@example.com"
            required
          )
        .form-group
          label(for="password") Password:
          input.form-control#password(
            type="password"
            name="password"
            v-model="user.password"
            required
          )
        .form-group
          label(for="password-conf") Confirm Password:
          input.form-control#password-conf(
            type="password"
            name="password"
            v-model="passwordConf"
            required
          )
          .form-group
          label(for="username") Username:
          input.form-control#username(
            type="text"
            v-model="user.username"
            placeholder=""
          )
        button(type="submit").btn-primary Register
</template>

<script>
//TODO Add autocomplete to inputs, check confirm password
import {fb, db} from '../firebase';

export default {
  name: "RegisterPage",
  components: {},
  data() {
    return {
      user: {
        email: null,
        password: null,
        username: null,
        score: 0,
        hasPendingTestimonial: false
      },
      passwordConf: null,
    };
  },

  methods: {
    register() {
      fb.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          this.saveData();
          this.$router.replace({name: "discomfort_test_path"})
        })
        .catch(function(error) {
          alert(error.message);
        });
    },
    saveData() {
      //storing user in db
      db.collection("users").add(this.user)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
  form {
    label {
      display: block;
    }
    input {
      margin: 0 auto;
      width: 194px;
    }
  }
</style>
