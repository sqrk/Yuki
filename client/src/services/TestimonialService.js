import Api from "./Api.js";

export default {
  fetch(id) {
    return Api().get("testimonials/" + id);
  },
  complete(challenge, uid, username, testimonial) {
    return Api().post("testimonials/new", {
      challenge,
      uid,
      username,
      testimonial
    });
  },
  addComment(content, testimonial, user) {
    return Api().post("testimonials/comments/new", {
      content,
      testimonial,
      user
    }); // TODO fix url
  }
};
