import Api from "./Api";

export default {
  computeMap(map) {
    return Api().post("discomfort-test", map);
  }
};
