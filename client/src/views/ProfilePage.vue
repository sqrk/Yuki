<template lang="pug">
  .profile-page
    | Username: {{ $store.state.user.username }}
    | Email: {{ $store.state.user.email }}
    button.btn-danger(@click="logout") Logout
    .error {{ this.error }}
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";

export default {
  name: "ProfilePage",
  data() {
    return {
      error: null
    };
  },
  methods: {
    async logout() {
      try {
        await AuthenticationService.logout();
        await this.$store.dispatch("setUser", null);
        await this.$store.dispatch("setLogged", false);
        await this.$router.push({ name: "root_path" });
      } catch (error) {
        this.error = error.message;
      }
    }
  }
};
</script>

<style scoped></style>
