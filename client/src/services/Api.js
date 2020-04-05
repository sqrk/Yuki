import axios from "axios";

export default () => {
  return axios.create({
    baseURL: `http://localhost:5000/yuki-a30e7/us-central1/api`
  });
};
