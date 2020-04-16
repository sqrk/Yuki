import Api from "./Api";

export default {
  fetch(uid) {
    return Api().post("challenges/fetch", uid); //TODO Turn to get
  },
  take(id, uid) {
    return Api().post("challenges/take", { id, uid });
  },
  drop(user) {
    return Api().post("challenges/drop", { user } ); //TODO Fix url
  },
};
