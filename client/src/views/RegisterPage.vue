<template lang="pug">
  .register-page.center.page
    .container
      h1 Register
      form(@submit.prevent="register")
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
            v-model="username"
            placeholder=""
          )
        label.error {{ this.error }}
        button(type="submit").btn-primary Register
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";

export default {
  name: "RegisterPage",
  components: {},
  data() {
    return {
      email: null,
      password: null,
      username: null,
      passwordConf: null,
      error: null,
      user: null
    };
  },

  methods: {
    async register() {
      try {
        this.error = null; // Re-initialize
        if (this.password !== this.passwordConf) {
          this.error = "Your passwords do not match.";
          return;
        }
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
          username: this.username
        });

        await this.$store.dispatch("setLogged", true);
        await this.$store.dispatch("setUser", response.data);
        await this.$router.push({ name: "discomfort_test_path" });
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
};
//TODO Add back buttons here and login to go back to homepage
//TODO Handle case where use logs out before completing the test and logging back in (sent to the feed w/o challengePath -> error)
</script>

<style scoped lang="scss">
.page {
  height: 100%;
  form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    label {
      display: block;
    }
    input {
      margin: 0 auto;
      width: 194px;
    }
    .error {
      color: red;
    }
  }
}
</style>
