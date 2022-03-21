import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "react-use";
import useAuth from "../../hooks/auth/useAuth";
import useRefreshToken from "../../hooks/auth/useRefreshToken";

const PersistLogin = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const currentUser = useAuth();
  const [remember, setRemember, remove] = useLocalStorage(
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
        mounted && setIsLoading(false);
      }
    };
    !currentUser?.accessToken && remember
      ? verifyRefreshToken()
      : setIsLoading(false);

    return () => {
      mounted = false;
    };
  }, [currentUser, remember, refresh, dispatch]);

  return (
    <>{!remember ? children : isLoading ? <div>Loading...</div> : children}</>
  );
};

export default PersistLogin;
