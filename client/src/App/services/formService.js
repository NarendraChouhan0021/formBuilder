import axios from "axios";
const API_URL = "http://localhost:5000/api/form/";

export default {
  autoSave(data) {
    console.log(data);
    return axios.put(API_URL + "/editform/", data).then((response) => {
      console.log(response.data);
      return response.data;
    });
  },
};
