<template lang="pug">
  .discomfort-test-page
    .container
      h1.center Test Page
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
                  v-model = "map.strangers",
                  name='strangers')
                label.custom-control-label(for='strangers1') Easy
            .col-4
              .custom-control.custom-radio.custom-control-inline
                input#strangers2.custom-control-input(
                  type='radio',
                  value = 2,
                  v-model = "map.strangers",
                  name='strangers')
                label.custom-control-label(for='strangers2') Tricky
            .col-4
              .custom-control.custom-radio.custom-control-inline
                input#strangers3.custom-control-input(
                  type='radio',
                  value = 3,
                  v-model = "map.strangers",
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
                  v-model = "map.bothering",
                  name='bothering')
                label.custom-control-label(for='bothering1') Easy
            .col-4
              .custom-control.custom-radio.custom-control-inline
                input#bothering2.custom-control-input(
                  type='radio',
                  value = 2,
                  v-model = "map.bothering",
                  name='bothering')
                label.custom-control-label(for='bothering2') Tricky
            .col-4
              .custom-control.custom-radio.custom-control-inline
                input#bothering3.custom-control-input(
                  type='radio',
                  value = 3,
                  v-model = "map.bothering",
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
                  v-model = "map.presenting",
                  name='presenting')
                label.custom-control-label(for='presenting1') Easy
            .col-4
              .custom-control.custom-radio.custom-control-inline
                input#presenting2.custom-control-input(
                  type='radio',
                  :value = 2,
                  v-model = "map.presenting",
                  name='presenting')
                label.custom-control-label(for='presenting2') Tricky
            .col-4
              .custom-control.custom-radio.custom-control-inline
                input#presenting3.custom-control-input(
                  type='radio',
                  value = 3,
                  v-model = "map.presenting",
                  name='presenting')
                label.custom-control-label(for='presenting3') Hard

        .row
          button.btn-primary(type="submit") Done

</template>

<script>
  //import {fb, db} from "../../../server/src/firebase";

  export default {
    name: "TestPage",
    data () {
      return {
        //user: fb.auth().currentUser.uid,
        map: {
          strangers: null,
          bothering: null,
          presenting: null
        }
      }
    },
    methods: {
      computeMap() {
        /*db.collection("discomfortMaps").add({
          user: this.user,
          map: this.map
        })
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });*/
      }
    }
  }

  //TODO Prevent access unless sign up
  //TODO "automate" the test (no hardcoded questions)
  //TODO radio values, numbers not strings
</script>

<style scoped lang="scss">
  form button {
    margin: 0 auto;
  }
</style>
