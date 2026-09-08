import { setModelOpen } from "@/reducers/userSlice";
import { useEffect } from "react";
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

  const close = () => {
    dispatch(setModelOpen(false));
  };

  useEffect(() => {
    if (isModelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModelOpen]);

  if (!isModelOpen) return null;

  return (
    <div
      onClick={close}
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/50
        p-4
        backdrop-blur-sm
        transition-all duration-300
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full max-w-md
          overflow-hidden
          rounded-3xl
          border border-gray-200
          bg-white
          p-6
          shadow-2xl
          transition-all duration-300

          sm:p-8

          dark:border-gray-700
          dark:bg-gray-900
        "
      >
        {/* Decorative background */}
        <div
          className="
            pointer-events-none
            absolute -right-20 -top-20
            h-40 w-40
            rounded-full
            bg-green-500/10
            blur-3xl
            dark:bg-green-400/10
          "
        />

        <div
          className="
            pointer-events-none
            absolute -bottom-20 -left-20
            h-40 w-40
            rounded-full
            bg-emerald-500/10
            blur-3xl
            dark:bg-emerald-400/10
          "
        />

        {/* Close button */}
        <button
          onClick={close}
          aria-label="Close login modal"
          className="
            absolute right-4 top-4
            flex h-9 w-9 items-center justify-center
            rounded-full
            text-gray-500
            transition
            hover:bg-gray-100
            hover:text-gray-900

            dark:text-gray-400
            dark:hover:bg-gray-800
            dark:hover:text-white
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="relative text-center">
          {/* Icon */}
          <div
            className="
              mx-auto mb-6
              flex h-16 w-16
              items-center justify-center
              rounded-2xl
              bg-green-50
              ring-8 ring-green-50/50

              dark:bg-green-500/10
              dark:ring-green-500/5
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11V7a3 3 0 00-6 0v4m-2 0h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2z"
              />
            </svg>
          </div>

          {/* Heading */}
          <h2
            id="login-modal-title"
            className="
              text-2xl
              font-bold
              tracking-tight
              text-gray-900

              sm:text-3xl

              dark:text-white
            "
          >
            Login to continue
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto mt-3
              max-w-sm
              text-sm
              leading-6
              text-gray-500

              sm:text-base

              dark:text-gray-400
            "
          >
            Please sign in to your account to add products to your cart and
            continue shopping.
          </p>

          {/* CTA */}
          <button
            onClick={handleLogin}
            className="
              mt-7
              flex w-full
              items-center justify-center gap-2
              rounded-xl
              bg-green-600
              px-5 py-3.5
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-green-600/20
              transition-all
              duration-200

              hover:bg-green-700
              hover:shadow-green-600/30
              active:scale-[0.98]

              focus:outline-none
              focus:ring-2
              focus:ring-green-500
              focus:ring-offset-2

              dark:bg-green-500
              dark:text-gray-950
              dark:hover:bg-green-400
              dark:focus:ring-offset-gray-900
            "
          >
            Continue to Login
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>

          {/* Secondary action */}
          <button
            onClick={close}
            className="
              mt-3
              w-full
              rounded-xl
              px-5 py-3
              text-sm
              font-medium
              text-gray-500
              transition
              hover:bg-gray-50
              hover:text-gray-900

              dark:text-gray-400
              dark:hover:bg-gray-800
              dark:hover:text-white
            "
          >
            Maybe later
          </button>

          {/* Small footer */}
          <p
            className="
              mt-5
              text-xs
              text-gray-400

              dark:text-gray-500
            "
          >
            Your cart will be waiting for you after you sign in.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModel;
