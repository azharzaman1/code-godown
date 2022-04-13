import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "react-use";
import useAuth from "../../hooks/auth/useAuth";
import useRefreshToken from "../../hooks/auth/useRefreshToken";
import { SET_AUTH_LOADING } from "../../redux/slices/appSlice";
import LoadingPage from "../Generic/Loader/LoadingPage";

const PersistLogin = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const currentUser = useAuth();
  const [remember, setRemember, removeRemeber] = useLocalStorage(
    "cg-remember-device",
    false
  );

  useEffect(() => {
    let mounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(SET_AUTH_LOADING(false));
        mounted && setIsLoading(false);
      }
    };
    !currentUser?.accessToken && remember
      ? verifyRefreshToken()
      : () => {
          setIsLoading(false);
          dispatch(SET_AUTH_LOADING(false));
        };

    return () => {
      mounted = false;
    };
  }, [currentUser, remember, refresh, dispatch]);

  return (
    <>
      {!remember ? (
        children
      ) : isLoading ? (
        <div className="loading-screen">
          <Head>
            <title>Loading...</title>
          </Head>
          <div>Loading ....</div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default PersistLogin;
