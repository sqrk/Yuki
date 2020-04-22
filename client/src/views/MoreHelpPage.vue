<template lang="pug">
  .more-help-page.page
    .container.center
      h1 More Help
      h4 For immediate help, call
      h3.number +212 5 00 00 00 00 <!-- TODO click opens dial --> <!-- future use localisation -->
      section
        h3 Books
        .books.row
          .col-4
            .book
              img(src="../assets/img/book-anxiety.jpeg")
              label.title How to Be Yourself
              label.author Ellen Hendriksen
          .col-4
            .book
              img(src="../assets/img/book-anxiety.jpeg")
              label.title How to Be Yourself
              label.author Ellen Hendriksen
          .col-4
            .book
              img(src="../assets/img/book-anxiety.jpeg")
              label.title How to Be Yourself
              label.author Ellen Hendriksen
      section
        h3 Papers
        .papers.row
          .col-4
            .paper
              img(src="../assets/img/paper-anxiety.png")
              label.title Social Anxiety in College Students
              label.author Christine Purdon
          .col-4
            .paper
              img(src="../assets/img/paper-anxiety.png")
              label.title Social Anxiety in College Students
              label.author Christine Purdon
          .col-4
            .paper
              img(src="../assets/img/paper-anxiety.png")
              label.title Social Anxiety in College Students
              label.author Christine Purdon
      section
        h3 Videos <!-- future: add a "more videos" link, more books etc that redirects to a page with only that medium with search etc. -->
        .videos.row
          .col-6
            .video
              img(src="../assets/img/video-anxiety.jpg")
              label.title Social Anxiety Disorder
              label.author Osmosis
          .col-6
            .video
              img(src="../assets/img/video-anxiety.jpg")
              label.title Social Anxiety Disorder
              label.author Osmosis


</template>

<script>
// TODO ^
export default {
  name: "MoreHelpPage"
};
</script>

<style scoped lang="scss">
.number {
  font-size: 31px;
}
img {
  height: auto;
  width: 100%;
  margin-bottom: 5px;
}
.title,
.author {
  font-size: 14px;
  margin-bottom: 2px;
}
section {
  margin-bottom: 30px;
}
</style>
