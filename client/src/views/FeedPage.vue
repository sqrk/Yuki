<template lang="pug">
  .feed-page.page
    .container
      <!--Shows if no challenges are active-->
      .challenges(v-if="!activeChallengeID")
        h1.center Challenges
        .challenges-available(v-if="challenges")
          .challenge.card(v-for="challenge in challenges" :key="challenge.id") <!--TODO Change to uid -->
            .card-body
              h4.title.card-title {{ challenge.title}}
              .description.card-text {{ challenge.description }}
              <!--TODO Fix -->
              //label.error {{ this.error }}
              button.btn-primary(@click="take(challenge)") Take
        .challenges-not-available(v-else)
          h5 You have completed all the available challenges :(
            br
            | Come back later for more!
      <!--Shows if a challenge is active-->
      .active-challenge(v-else)
        h1.center Feed
        .challenge.card
          .card-body
            h4.title.card-title {{ activeChallengeData.title }}
            .description.card-text {{ activeChallengeData.description }}
            button.button.btn-primary.inline(data-toggle="modal" data-target="#complete") Complete
            button.button.btn-danger.inline(@click="drop") Drop
        .testimonials
          h4.title Testimonials
          .testimonials-not-available(v-if="testimonials.length === 0")
            p No testimonials written yet.
          .testimonials-available(v-else)
            .testimonial(v-for="(testimonial, i) in testimonials" :key ="testimonial.uid") <!--TODO Sorting?-->
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
              form(@submit.prevent="addComment(i, testimonial.uid)")
                input(v-model="newComment[i]" type="text" placeholder="Enter a comment")
                button(type="submit") Submit
              .comments
                .row
                  .col-11.offset-1
                    .comment(v-for="comment in testimonial.comments" :key="comment.uid")
                      .meta
                        label.author {{ comment.user }}
                        label.date.flt-r {{ comment.date }}
                      .content {{ comment.content }}
                      .score.flt-r {{ comment.score }}
      #complete.modal.fade(tabindex='-1', role='dialog', aria-hidden='true' ref="completeModal")
        .modal-dialog(role='document')
          .modal-content
            .modal-header
              h5.modal-title Write a Testimonial
              button.close(type='button', data-dismiss='modal', aria-label='Close')
                span(aria-hidden='true') &times;
            .modal-body
              p Write a testimonial for the challenge {{ activeChallengeData.title }} explaining how it went for you:
              form#testimonial(@submit.prevent="complete")
                textarea(rows="7" required v-model="newTestimonial")
              .error {{ this.error }}
            .modal-footer
              button.btn.btn-secondary(type='button', data-dismiss='modal') Close
              button.btn.btn-primary(type='submit' form="testimonial") Submit


</template>

<script>
import ChallengeService from "../services/ChallengeService";
import TestimonialService from "../services/TestimonialService";
import $ from "jquery";
// TODO ^
// TODO Remove pendingTestimonial attribute
// TODO Upload files testimonial
export default {
  name: "FeedPage",
  data() {
    return {
      activeChallengeID: this.$store.state.user.activeChallenge,
      activeChallengeData: {},
      challenges: [],
      testimonials: [],
      error: "",
      uid: this.$store.state.user.uid,
      newTestimonial: null,
      newComment: {}
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
      }
    },

    async take(challenge) {
      try {
        await ChallengeService.take(challenge.id, this.uid);
        this.activeChallengeID = challenge.id;
        await this.fetch();
        await this.$store.dispatch("setActiveChallenge", challenge.id);
        this.activeChallengeData = challenge;
      } catch (error) {
        this.error = error.response.data.error;
      }
    },

    async complete() {
      try {
        if (!this.newTestimonial) {
          this.error = "Please write a valid testimonial.";
        } else {
          await TestimonialService.complete(
            this.activeChallengeID,
            this.uid,
            this.$store.state.user.uid,
            this.newTestimonial
          );
          this.activeChallengeID = "";
          this.activeChallengeData = "";
          await $('#complete').modal('hide');
          await this.fetch();
          await this.$store.dispatch("setActiveChallenge", "");
          this.newTestimonial = null;
        }
      } catch (error) {
        this.error = error.response.data.error;
      }
    },

    async drop() {
      try {
        await ChallengeService.drop(this.uid);
        this.activeChallengeID = "";
        this.activeChallengeData = "";
        await this.$store.dispatch("setActiveChallenge", "");
        await this.fetch();

      } catch (error) {
        this.error = error;
      }
    },

    async addComment(i, testimonial) {
      try {
        await TestimonialService.addComment(this.newComment[i], testimonial, this.$store.state.user.username);
        await this.fetch();
        this.newComment[i] = null;
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
};

//TODO Handle feed 404 when there are no challenges to be displayed
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
  margin-bottom: 20px;
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
