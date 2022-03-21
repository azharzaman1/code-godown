import { useDebugValue } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";

const useAuth = () => {
  const currentUser = useSelector(selectUser);
  useDebugValue(currentUser, (currentUser) =>
    currentUser ? "Logged In" : "Logged Out"
  );
  return currentUser;
};

export default useAuth;
