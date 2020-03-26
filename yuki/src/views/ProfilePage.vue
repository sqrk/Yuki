<template lang="pug">
  .profile-page
    button.btn-danger(@click="logout") Logout
</template>

<script>
  import * as firebase from 'firebase';

  export default {
    name: "ProfilePage",
    methods: {
      logout() {
        firebase.auth().signOut()
          .then(() => {
            console.log("Profile", this.$isLoggedOut);
            this.$isLoggedOut = true;
            this.$router.replace({name: "root_path"})
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
  }
</script>

<style scoped>

</style>
