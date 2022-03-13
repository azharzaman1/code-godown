import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";

const useAuth = () => {
  return useSelector(selectUser);
};

export default useAuth;
