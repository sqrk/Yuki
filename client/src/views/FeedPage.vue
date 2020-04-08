<template lang="pug">
  .feed-page
    .container

      <!--Shows if no challenges are active-->
      .challenges(v-if="!this.activeChallengeID")
        .challenge(v-for="challenge in this.challenges" :key="challenge.id")
          .title {{ challenge.title}}
          .description {{ challenge.description }}
          //label.error {{ this.error }} <!--TODO Fix -->

          button.btn-primary(@click="take(challenge)") Take

      <!--Shows if a challenge is active-->
      .else(v-else)
        .challenge
          .title {{ this.activeChallengeData.title }}
          .description {{ this.activeChallengeData.description }}
        .testimonials
          .testimonial(v-for="testimonial in this.testimonials" :key ="testimonial.uid") <!--TODO Sorting?-->
            .author {{ testimonial.author }}
            .date {{ testimonial.date }} <!--TODO Format-->
            .score {{ testimonial.score }}
            .content {{ testimonial.content }}

</template>

<script>
import ChallengeService from "../services/ChallengeService";
import TestimonialService from "../services/TestimonialService";
// TODO ^

export default {
  name: "FeedPage",
  data() {
    return {
      activeChallengeID: this.$store.state.user.activeChallenge,
      activeChallengeData: {},
      challenges: [],
      testimonials: [],
      error: "",
      uid: this.$store.state.user.uid
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      if (!this.activeChallengeID) {
        const response = await ChallengeService.fetch({
          uid: this.uid
        });
        this.challenges = response.data;
      } else {
        const response = await TestimonialService.fetch(this.activeChallengeID);
        console.log(response);

        this.activeChallengeData = response.data.challenge;
        this.testimonials = response.data.testimonials;
      }
    },

    async take(challenge) {
      try {
        await ChallengeService.take(challenge.id, this.uid);
        await this.$store.dispatch("setActiveChallenge", challenge.id);
        this.activeChallengeID = challenge.id;
        this.activeChallengeData = challenge;
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
}
</script>

<style scoped>

</style>
