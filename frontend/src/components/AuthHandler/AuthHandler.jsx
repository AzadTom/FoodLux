import { setModelOpen, setUserNull } from "@/reducers/userSlice";
import { registerTokenExpiredHandler } from "@/utils/authEvent";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unregister = registerTokenExpiredHandler(() => {
       console.log("Token expired, logging out user...");
      dispatch(setUserNull());
      dispatch(setModelOpen(true));
    });
    return () => {
      unregister();
    };
  }, []);

  return null;
};

export default AuthHandler;
