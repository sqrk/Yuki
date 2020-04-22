import Api from "./Api";
import { fb } from "../firebase";

export default {
  register(credentials) {
    return Api().post("register", credentials);
  },
  async login(email, password) {
    try {
      await fb.auth().signInWithEmailAndPassword(email, password);

      const token = await fb.auth().currentUser.getIdToken();

      return Api().post("/login", { token });
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        throw "Please enter a valid email address.";
      } else if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        throw "Your email address and password do not match";
      }
      throw "There has been a problem signing you in.";
    }
  },
  async logout() {
    try {
      await fb.auth().signOut();
    } catch (error) {
      return "We couldn't log you out.";
    }
  }
};
