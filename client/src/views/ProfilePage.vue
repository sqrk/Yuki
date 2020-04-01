<template lang="pug">
  .profile-page
    button.btn-danger(@click="logout") Logout
</template>

<script>
import { fb } from "../../../server/src/firebase";

export default {
  name: "ProfilePage",
  methods: {
    logout() {
      fb.auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "root_path" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped></style>
