<template lang="pug">
  #app
    Navbar#nav(v-if="this.$isLoggedOut")
    router-view
</template>

<script>
import Navbar from "./components/Navbar/Navbar";

export default {
  components: {
    Navbar
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  bottom: 0;
  position: fixed;
  width: 100%;
  overflow: hidden;
}
</style>
