<template lang="pug">
  .feed-page.page
    .container
      <!--Shows if no challenges are active-->
      .challenges(v-if="!this.activeChallengeID")
        h1.center Challenges
        .challenge.card(v-for="challenge in this.challenges" :key="challenge.id") <!--TODO Change to uid -->
          .card-body
            h4.title.card-title {{ challenge.title}}
            .description.card-text {{ challenge.description }}
            <!--TODO Fix -->
            //label.error {{ this.error }}
            button.btn-primary(@click="take(challenge)") Take

      <!--Shows if a challenge is active-->
      .else(v-else)
        h1.center Feed
        .challenge.card
          .card-body
            h4.title.card-title {{ this.activeChallengeData.title }}
            .description.card-text {{ this.activeChallengeData.description }}
            button.button.btn-primary.inline Complete
            button.button.btn-danger.inline Drop
        .testimonials
          h4.title Testimonials
          .testimonial(v-for="testimonial in this.testimonials" :key ="testimonial.uid") <!--TODO Sorting?-->
            .card
              .card-body
                .row
                  .col-12
                    .meta
                      label.author {{ testimonial.user }}
                      label.date.flt-r {{ testimonial.date }}
                .row
                  .col-10
                    .content {{ testimonial.content }}
                  .col-2
                    .row
                    .score
                      .value.flt-r {{ testimonial.score }}
                      .arrows
                        //i.far.fa-sort-up
                        //i.far.fa-sort-down
            .comments
              .row
                .col-11.offset-1
                  .comment(v-for="comment in testimonial.comments" :key="comment.uid")
                    .meta
                      label.author {{ comment.user }}
                      label.date.flt-r {{ comment.date }}
                    .content {{ comment.content }}
                    .score.flt-r {{ comment.score }}



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

        this.activeChallengeData = response.data.challenge;
        this.testimonials = response.data.testimonials;
        console.log(response.data.testimonials);

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

<style scoped lang="scss">
@import "../assets/css/variables";

.challenge {
  margin-bottom: 30px;
  .description {
    margin-bottom: 1rem;
  }
  button {
    display: block;
    margin: 0 auto;
    &.inline {
      display: inline-block;
    }
    &.btn-danger {
      float: right;
      width: 155px;
    }
  }
}
.testimonials {
  margin-bottom: 80px;
  .testimonial {
    .card {
      background: #f8f9f9;

      .card-body {
        padding: 10px;
      }
    }

    .meta {
      color: $primary-color;
    }

    .score {
      .value {
        color: $primary-color;
      }

      .arrows {
        i {

        }
      }
    }

    .comment {
      padding: 10px;
      border-left: 3px solid $primary-color;
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
      border-right: 1px solid rgba(0, 0, 0, 0.125);
      margin-bottom: 10px;

      .content {
        display: inline-block; //Temp
      }

      .score {
        display: inline-block; //Temp
      }
    }
  }
}
</style>
