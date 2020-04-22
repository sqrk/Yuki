<template lang="pug">
  .login-page.center.page
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
        const response = await AuthenticationService.login(
          this.email,
          this.password
        );

        await this.$store.dispatch("setLogged", true);
        await this.$store.dispatch("setUser", response.data);

        await this.$router.push({ name: "feed_path" });
      } catch (error) {
        if (Object.prototype.hasOwnProperty.call(error, "response")) {
          this.error = error.response.data.error;
        } else {
          this.error = error;
        }
      }
    }
  }
};
//TODO Implement errors (UI)
</script>

<style scoped>
.error {
  color: red;
}
form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
