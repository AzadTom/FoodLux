import Mobile from "../../components/Header/Mobile";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "@/reducers/userSlice";

const Home = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(
        setUserData({
          token: token,
        }),
      );
    }
    navigate("/home", { replace: true });
  }, [token, dispatch, navigate]);

  return (
    <>
      <Mobile />
      <Outlet />
    </>
  );
};

export default Home;
