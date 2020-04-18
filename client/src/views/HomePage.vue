<template lang="pug">
  .homepage.center
    label.brand Yūki
    .buttons
      router-link(:to='{name: "login_path"}' tag="button").btn-primary Login
      br
      router-link(:to='{name: "register_path"}' tag="button").btn-secondary Register
    img(src="../assets/img/a.png").a
    img(src="../assets/img/b.png").b
    img(src="../assets/img/c.png").c
    img(src="../assets/img/d.png").d
    img(src="../assets/img/e.png").e

</template>

<script>
export default {
  name: "HomePage",
  components: {}
};
</script>
<style scoped lang="scss">
.homepage {
  background: linear-gradient(180deg, #ffd4bc 17.82%, #f3f9ff 72.53%);
  padding: 50px 0;
  .brand {
    display: block;
    font-size: 80px;
    margin-bottom: 30px;
  }
  .buttons {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
  }
  button {
    width: 145px;
    &.btn-primary {
      margin-bottom: 15px;
    }
  }
  img {
    position: absolute;
    &.a {
      right: 85px;
      bottom: 0;
    }
    &.b {
      bottom: 0;
      right: 0;
    }
    &.c {
      bottom: 193px;
      right: 9px;
    }
    &.d {
      bottom: 74px;
      right: 32px;
    }
    &.e {
      bottom: 125px;
      right: 98px;
    }
  }
}
</style>
