<template lang="pug">
  .homepage
    label.brand Yuki
    .buttons
      router-link(:to='{name: "login_path"}' tag="button").btn-primary Login
      br
      router-link(:to='{name: "register_path"}' tag="button").btn-secondary Register
    .circle.a
    .circle.b
    .circle.c
    .circle.d
    .circle.e

</template>

<script>
export default {
  name: "HomePage",
  components: {}
};
</script>
<style scoped lang="scss">
  .homepage {
    background: linear-gradient(180deg, #FFD4BC 17.82%, #F3F9FF 72.53%);
    padding: 50px 0;
    .brand {
      display: block;
      font-size: 80px;
      margin-bottom: 30px;
    }
    .buttons {
      margin-bottom: 80px;
    }
    button {
      width: 145px;
      &.btn-primary {
        margin-bottom: 15px;
      }
    }
    .circle {
      position: absolute;
      border-radius: 50%;
      &.a {
        width: 143px;
        height: 143px;
        right: 85px;
        bottom: -33px;
        background: #C4DBF1;
      }
      &.b {
        width: 83px;
        height: 83px;
        bottom: -16px;
        right: -10px;
        background: #5EA4E4;
      }
      &.c {
        width: 67px;
        height: 67px;
        bottom: 193px;
        right: 9px;
        background: #5EA4E4;
      }
      &.d {
        width: 52px;
        height: 52px;
        bottom: 74px;
        right: 32px;
        background: #E8F3FD;
      }
      &.e {
        width: 30px;
        height: 30px;
        bottom: 125px;
        right: 98px;
        background: #3484CE;
      }
    }
  }
</style>
