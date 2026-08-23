import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Others/Input.jsx";
import { Loader } from "../../components/Others/Loading.jsx";
import { useSignUp } from "./hook.js";
import { SignUpFormData } from "./utils.js";
import { Auth } from "@/services/service.js";

function SignUp() {
  const navigate = useNavigate();
  const {
    userDetails,
    onChangeHandler,
    onFocusHandler,
    submitFormHandler,
    status,
  } = useSignUp();

  return (
    <section className="flex flex-col justify-center items-center  w-full h-screen">
      <form
        className="max-w-[800px] w-full  flex flex-col justify-center p-[2rem] gap-4 rounded-md"
        onSubmit={submitFormHandler}
      >
        <h2 className="text-xl  ">Let's create an account </h2>

        <div className="w-full flex justify-between  gap-4">
          {SignUpFormData.inputName.map((input) => (
            <Input
              key={input.id}
              {...input}
              placeholder={input.placeholder}
              onchange={onChangeHandler}
              value={userDetails[input.name]}
              onfocus={onFocusHandler}
              error={userDetails.error[input.name]}
            />
          ))}
        </div>
        {SignUpFormData.inputOther.map((input) => (
          <Input
            key={input.id}
            {...input}
            placeholder={input.placeholder}
            onchange={onChangeHandler}
            value={userDetails[input.name]}
            onfocus={onFocusHandler}
            error={userDetails.error[input.name]}
          />
        ))}
        <div className="flex flex-col justify-center gap-2  w-full">
          <button
            disabled={status == "loading"}
            className="px-[20px] py-[10px] bg-black text-white rounded-md"
            type="submit"
          >
            {status == "loading" ? (
              <div className="flex justify-center">
                <Loader />
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
          <p
            className="text-center cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Already have an account? LogIn
          </p>
        </div>
      </form>
      <div className="flex flex-col text-center gap-2 px-6 w-full">
        <span className="text-sm text-gray-400">OR</span>
        <button className="px-[20px] py-[10px] bg-black text-white rounded-md flex  justify-center gap-1 max-w-[480px] w-full mx-auto">
          <Link to={Auth + "/auth/google"}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
              alt="google"
              width={24}
              height={24}
            />
          </Link>
        </button>
      </div>
    </section>
  );
}

export default SignUp;
