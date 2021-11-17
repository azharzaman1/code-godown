import { onAuthStateChanged } from "@firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../client/firebase";
import { LOGOUT, SETUSER } from "../redux/slices/userSlice";

const AppWrapper = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          SETUSER({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
          })
        );
      } else {
        dispatch(LOGOUT(null));
      }
    });
  }, []);
  return children;
};

export default AppWrapper;
