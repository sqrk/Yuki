<template lang="pug">
  .homepage
    h1 Homepage
    router-link(:to='{name: "register_path"}').btn-primary Register
    br
    router-link(:to='{name: "login_path"}') Login
</template>

<script>
export default {
  name: "HomePage",
  components: {}
};
</script>
