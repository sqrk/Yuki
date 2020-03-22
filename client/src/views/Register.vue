<template lang="pug">
  .register-page
    h1 Register

    label(for="email") Email address:
    br
    input#email(
      type="email"
      v-model="email"
      placeholder="abc@example.com"
      )
    br
    label(for="password") Password:
    br
    input#password(
        type="password"
        name="password"
        v-model="password"
      )
    br
    button(type="submit" @click="register") Register
</template>

<script>
  //TODO Add autocomplete to inputs
  import AuthenticationService from "../services/AuthenticationService";

  export default {
    name: 'Register',
    components: {
    },

    data() {
      return {
        email: null,
        password: null
      }
    },

    methods: {
      async register() {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        });
      }
    }
  }
</script>
