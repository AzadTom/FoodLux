import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Others/Input";
import { Loader } from "../../components/Others/Loading.jsx";
import { SigninFormData } from "./utils";
import { useSignin } from "./hook";
import { AUTHBASEURL } from "@/services/service";

function SignIn() {
  const navigate = useNavigate();
  const {
    userDetails,
    onChangeHandler,
    submitFormHandler,
    submitGuestUserHandler,
    loader1,
    loader2,
  } = useSignin();

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen px-4">
      <form
        className="max-w-[800px] w-full  flex flex-col justify-center    p-[2rem] gap-4  bg-[var(--secondarycolor)] rounded-xl border "
        onSubmit={submitFormHandler}
      >
        <h2 className="text-xl">LogIn </h2>
        {SigninFormData.input.map((input) => (
          <Input
            key={input.id}
            {...input}
            onchange={onChangeHandler}
            placeholder={input.placeholder}
            value={userDetails[input.name]}
          />
        ))}
        <div className="flex flex-col justify-center   gap-2 ">
          <div className="flex flex-col gap-4">
            <button
              className="px-[20px] py-[10px] bg-black text-white rounded-md flex justify-center items-center"
              type="submit"
            >
              {loader1 ? <Loader /> : "Log In"}
            </button>
            <button
              className="px-[20px] py-[10px] border border-black text-black rounded-md flex justify-center items-center"
              onClick={submitGuestUserHandler}
            >
              {loader2 ? <Loader /> : "LogIn As Guest"}
            </button>
          </div>
          <p
            className="text-center cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Don't have an account? SignUp
          </p>
        </div>
      </form>
      <div className="flex flex-col  justify-center text-center gap-2 w-full px-6">
        <span className="text-sm text-gray-400 mt-5">OR</span>
        <button className="px-[20px] py-[10px] bg-black text-white rounded-md flex max-w-[500px] w-full mx-auto justify-center  gap-1 ">
          {" "}
          <Link
            to={`${AUTHBASEURL}/auth/google?${isLocal(window.location.hostname)}`}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
              alt="google"
              width={24}
              height={24}
            />
          </Link>
        </button>
      </div>
    </div>
  );
}

export default SignIn;

export const isLocal = (host) => {
  return `product=${"foodlux"}&clientUrl=${host === "localhost" ? "local" : "production"}`;
};
