import Api from "./Api.js";

export default {
  fetch(id) {
    return Api().get("testimonials/" + id);
  }
}
