import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth, db } from "../client/firebase";
import { doc, onSnapshot } from "@firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { LOGOUT, SETUSER, SET_USER_FROM_DB } from "../redux/slices/userSlice";

const AppWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    let mounted = true;
    if (user && mounted) {
      onSnapshot(doc(db, "users", user?.uid), (doc) => {
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        if (doc.data()) {
          const data = doc.data();
          console.log(source, " data: ", data);
          dispatch(
            SET_USER_FROM_DB({
              ...data,
              userDetails: {
                ...data.userDetails,
                registeredAt: new Date(
                  data?.userDetails?.registeredAt?.toDate()
                ),
              },
            })
          );
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [user]);

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
