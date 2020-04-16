<template lang="pug">
  nav.navbar.navbar-expand-lg
    ul.navbar-nav
      li.nav-item
        router-link(:to='{ name: "feed_path" }').nav-link
          i.fas.fa-stream
      li.nav-item
        router-link(:to='{ name: "register_path" }').nav-link
          i.far.fa-life-ring
      li.nav-item
        router-link(:to='{ name: "profile_path" }').nav-link
          i.fas.fa-user-circle
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped lang="scss">
@import "../../assets/css/variables";

nav {
  background: $primary-color;
  ul {
    display: contents;
  }
  .nav-link {
    color: white;
    i {
      font-size: 34px;
      &.fa-stream {
        font-size: 30px;
      }
    }
  }
}
</style>
