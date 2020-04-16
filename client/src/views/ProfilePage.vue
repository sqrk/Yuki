<template lang="pug">
  .profile-page.page
    .container
      h1.center Profile
      .info.card
        .score.bg.btn-primary {{ user.score }}
        i.edit.far.fa-edit
        .row
          .col-6
            label Username:
          .col-6
            label {{ user.username }}
        .row
          .col-6
            label Email:
          .col-6
            label {{ user.email }}
        .row
          .col-6
            label Password:
          .col-6
            label *******
      button.btn-danger.logout(@click="logout") Logout
      .error {{ this.error }}
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
// TODO Remove pendingTestimonial
// TODO Score
// TODO Add level
export default {
  name: "ProfilePage",
  data() {
    return {
      error: null,
      user: this.$store.state.user
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

<style scoped lang="scss">
@import "../assets/css/variables";

.info {
  padding: 25px 20px;
  position: relative;
  label {
    display: block;
  }
  .score {
    position: absolute;
    right: -10px;
    top: -23px;
  }
  .edit {
    position: absolute;
    height: 45px;
    width: 63px;
    border: 3px solid $primary-color;
    background: white;
    padding: 10px 20px;
    border-radius: 12px;
    top: -23px;
    left: -10px;
    color: $primary-color;
  }
}
.logout {
  display: block;
  margin: 15px auto;
}
</style>
