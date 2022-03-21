import { useSnackbar } from "notistack";
import { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { axiosPrivate } from "../api/axios";
import { SET_USER, SET_USER_TYPE } from "../redux/slices/userSlice";

const useLogin = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  // react-query login user
  const { mutate: login } = useMutation(
    async (userData) => {
      return await axiosPrivate.post("/auth/login", userData);
    },
    {
      onSuccess: (res) => {
        console.log("User login response", res);
        enqueueSnackbar(res.statusText, {
          variant: "success",
        });
        const roles = Object.values(res.data.user.roles);
        setData(res.data?.user);
        setLoading(false);
        dispatch(SET_USER({ ...res.data?.user, roles }));
        dispatch(SET_USER_TYPE(roles));
      },
      onError: (err) => {
        const statusText = err.response.statusText;
        setLoading(false);
        enqueueSnackbar(statusText, {
          variant: "error",
        });
      },
    }
  );

  return { loading, data, login };
};

export default useLogin;
