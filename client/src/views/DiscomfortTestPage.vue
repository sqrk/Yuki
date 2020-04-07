<template lang="pug">
  .discomfort-test-page
    .container
      h1.center Discomfort Test Page
      h4 How comfortable are you with each of these situations?
      form(@submit.prevent="computeMap")
        .form-group
          h5 Talking to strangers:
          .row
            .col-4
              .custom-control.custom-radio.custom-control-inline
                input#strangers1.custom-control-input(
                  type='radio',
                  value = 1,
                  v-model = "map.types.strangers",
                  name='strangers')
                label.custom-control-label(for='strangers1') Easy
            .col-4
              .custom-control.custom-radio.custom-control-inline
                input#strangers2.custom-control-input(
                  type='radio',
                  value = 2,
                  v-model = "map.types.strangers",
                  name='strangers')
                label.custom-control-label(for='strangers2') Tricky
            .col-4
              .custom-control.custom-radio.custom-control-inline
                input#strangers3.custom-control-input(
                  type='radio',
                  value = 3,
                  v-model = "map.types.strangers",
                  name='strangers')
                label.custom-control-label(for='strangers3') Hard

        .form-group
          h5 Asking someone a favor:
          .row
            .col-4
              .custom-control.custom-radio.custom-control-inline
                input#bothering1.custom-control-input(
                  type='radio',
                  value = 1,
                  v-model = "map.types.bothering",
                  name='bothering')
                label.custom-control-label(for='bothering1') Easy
            .col-4
              .custom-control.custom-radio.custom-control-inline
                input#bothering2.custom-control-input(
                  type='radio',
                  value = 2,
                  v-model = "map.types.bothering",
                  name='bothering')
                label.custom-control-label(for='bothering2') Tricky
            .col-4
              .custom-control.custom-radio.custom-control-inline
                input#bothering3.custom-control-input(
                  type='radio',
                  value = 3,
                  v-model = "map.types.bothering",
                  name='bothering')
                label.custom-control-label(for='bothering3') Hard

        .form-group
          h5 Presenting in front of people:
          .row
            .col-4
              .custom-control.custom-radio.custom-control-inline
                input#presenting1.custom-control-input(
                  type='radio',
                  value = 1,
                  v-model = "map.types.presenting",
                  name='presenting')
                label.custom-control-label(for='presenting1') Easy
            .col-4
              .custom-control.custom-radio.custom-control-inline
                input#presenting2.custom-control-input(
                  type='radio',
                  :value = 2,
                  v-model = "map.types.presenting",
                  name='presenting')
                label.custom-control-label(for='presenting2') Tricky
            .col-4
              .custom-control.custom-radio.custom-control-inline
                input#presenting3.custom-control-input(
                  type='radio',
                  value = 3,
                  v-model = "map.types.presenting",
                  name='presenting')
                label.custom-control-label(for='presenting3') Hard

        .error {{ this.error }}
        .row
          button.btn-primary(type="submit") Done

</template>

<script>
import DiscomfortTestService from "../services/DiscomfortTestService";

export default {
  name: "TestPage",
  data() {
    return {
      map: {
        uid: this.$store.state.user.uid,
        types: {
          strangers: null,
          bothering: null,
          presenting: null
        }
      },
      error: null
    };
  },
  methods: {
    async computeMap() {
      try {
        const challengePath = await DiscomfortTestService.computeMap(this.map);
        await this.$store.dispatch("setChallengePath", challengePath); // TODO Probably not needed and better not put in store
        await this.$router.push({ name: "feed_path" });
      } catch (error) {
        this.error = error;
      }
    }
  }
};

// TODO Prevent access unless sign up
// TODO "automate" the test (no hardcoded questions)
// TODO radio values, numbers not strings
</script>

<style scoped lang="scss">
form button {
  margin: 0 auto;
}
.error {
  color: red;
}
</style>
