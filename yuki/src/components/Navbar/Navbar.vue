<template lang="pug">
  nav.navbar.navbar-expand-lg.navbar-light.bg-light
    router-link(:to='{ name: "root_path" }').navbar-brand(href='#') Yuki
    ul.navbar-nav.mr-auto
      li.nav-item
        router-link(:to='{ name: "feed_path" }').nav-link Feed
      li.nav-item
        router-link(:to='{ name: "register_path" }').nav-link More Help
      li.nav-item
        router-link(:to='{ name: "profile_path" }').nav-link Profile
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped lang="scss"></style>
