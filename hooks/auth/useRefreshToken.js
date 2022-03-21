import { useDispatch } from "react-redux";
import { axiosPrivate } from "../../api/axios";
import { SET_USER, LOGOUT, SET_USER_TYPE } from "../../redux/slices/userSlice";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const currentUser = useAuth();

  const refresh = async () => {
    try {
      const response = await axiosPrivate.get("/api/v1/tokens/refresh");
      console.log("Refresh Token Response", response.data);
      const roles = Object.values(response.data.roles);
      dispatch(SET_USER({ ...currentUser, ...response.data, roles }));
      dispatch(SET_USER_TYPE(roles));
      return response.data.accessToken;
    } catch (err) {
      if (err.response.status === 403) {
        // mean refresh token in cookie is not valid or expired
        dispatch(LOGOUT());
        console.log(err.response);
      }
      console.log(err.response);
    }
  };
  return refresh;
};

export default useRefreshToken;
