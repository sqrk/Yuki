<template lang="pug">
  .login-page.center
    .container
      h1 Login
      form(@submit.prevent="login")
        .form-group
          label(for="email") Email address:
          input.form-control#email(
            type="email"
            v-model="email"
            placeholder="abc@example.com"
            required
          )
        .form-group
          label(for="password") Password:
          input.form-control#password(
            type="password"
            name="password"
            v-model="password"
            required
          )
        label.error {{ this.error }}
        button.btn-primary(type="submit") Login
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";

export default {
  name: "LoginPage",
  components: {},
  data() {
    return {
      email: null,
      password: null,
      user: null,
      error: null
    };
  },

  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password //TODO is this ok????
        });
        await this.$store.dispatch("setLogged", true);
        await this.$store.dispatch("setUser", response.data);
        await this.$router.push({ name: "profile_path" });
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
};
//TODO Add autocomplete to inputs
//TODO Implement errors (UI)
</script>

<style scoped></style>
