import Axios from "axios"

const setJWTTokenToHeader = token => {
  if (token) {
    Axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete Axios.defaults.headers.common["Authorization"];
  }
};

export default setJWTTokenToHeader;