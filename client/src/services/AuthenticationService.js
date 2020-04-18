import Api from "./Api";
import { fb } from "../firebase";

export default {
  register(credentials) {
    return Api().post("register", credentials);
  },
  async login(email, password) {
    try {
      await fb.auth().signInWithEmailAndPassword(email, password);

      try {
        const token = await fb.auth().currentUser.getIdToken();

        return Api().post("/login", {token});
      } catch (error) {
        return "Couldn't get token"; //TODO Fix
      }
    } catch (error) {
      return "Couldn't sign in"; //TODO Fix
    }
  },
  async logout() {
    try {
      await fb.auth().signOut();
    } catch (error) {
      console.log(error);
      return "We couldn't log you out."
    }
  }
};
