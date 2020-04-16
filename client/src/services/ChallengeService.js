import Api from "./Api";

export default {
  fetch(uid) {
    return Api().post("challenges/fetch", uid); //TODO Turn to get
  },
  take(id, uid) {
    return Api().post("challenges/take", { id, uid });
  }
};
