<template lang="pug">
  .feed-page
    .container
      .challenges(v-for="challenge in this.challenges" :key="challenge.id")
        .title {{ challenge.title}}
        .description {{ challenge.description }}
        button Take
</template>

<script>
import FeedService from "../services/FeedService";

export default {
  name: "FeedPage",
  data() {
    return {
      challenges: []
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const uid = this.$store.state.user.uid;
      const response = await FeedService.fetch({
        uid: uid
      });
      console.log(response.data);
      this.challenges = response.data;
    }
  }
}
</script>

<style scoped>

</style>
