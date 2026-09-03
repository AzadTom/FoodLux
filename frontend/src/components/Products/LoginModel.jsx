import { setModelOpen } from "@/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginModel = () => {
  const { isModelOpen } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.stopPropagation();
    dispatch(setModelOpen(false));
    navigate("/signin");
  };

  const close = () => dispatch(setModelOpen(false));

  return (
    <>
      {isModelOpen && (
        <div
          onClick={close}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center"
        >
          <div className="bg-white p-4 rounded shadow">
            <h1 className="text-2xl font-bold text-center mt-10">
              Please login to add items to cart.
            </h1>
            <div className="flex justify-center mt-5">
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModel;
