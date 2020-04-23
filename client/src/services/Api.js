import axios from "axios";

export default () => {
  return axios.create({
    baseURL: `https://us-central1-yuki-a30e7.cloudfunctions.net/api`
  });
};
