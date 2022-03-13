import { useDispatch } from "react-redux";
import axios, { axiosPrivate } from "../../axios";
import { SET_USER } from "../../redux/slices/userSlice";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const currentUser = useAuth();

  const refreshToken = async () => {
    try {
      const response = await axiosPrivate.get(
        "http://localhost:3500/api/v1/tokens/refresh"
      );
      console.log(response);
      return response.data.accessToken;
    } catch (err) {
      console.log("RefreshToken Err", err.response || err.request);
    }
  };

  //   const refreshToken = async () => {
  //     return axios
  //       .get("/api/v1/tokens/refresh", { withCredentials: true })
  //       .then((res) => {
  //         console.log("Prev", currentUser.accessToken);
  //         console.log("New", res.data.accessToken);
  //         console.log(res);
  //         dispatch(
  //           SET_USER({ ...currentUser, accessToken: res.data.accessToken })
  //         );
  //         return res.data.accessToken;
  //       })
  //       .catch((error) => {
  //         if (error.response) {
  //           // that falls out of the range of 2xx
  //           console.log(error.response.data);
  //           console.log(error.response.status);
  //           console.log(error.response.statusText);
  //           console.log(error.response.headers);
  //           console.log(error.message);
  //         } else if (error.request) {
  //           // The request was made but no response was received
  //           // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //           // http.ClientRequest in node.js
  //           console.log(error.request);
  //         } else {
  //           // Something happened in setting up the request that triggered an Error
  //           console.log("Error", error.message);
  //         }
  //         console.log(error.config);
  //       });
  //   };

  return refreshToken;
};

export default useRefreshToken;
