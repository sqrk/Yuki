import Api from "./Api";

export default {
  fetch(uid) {
    return Api().post("challenges", uid);
  }
}
