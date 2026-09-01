import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserNull } from "../../reducers/userSlice.js";
import { setCartNull } from "../../reducers/cartSlice.js";
import { setWishlistToNull } from "../../reducers/favSlice.js";
import { useNavigate } from "react-router-dom";
import Model from "../../components/Cart/Model.jsx";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/services/service.js";
import { Loader } from "@/components/Others/Loading.jsx";

function UserProfile({ profileState, closeProfile }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {access_token} = useSelector((state) => state.user);

  const { data, isLoading } = useQuery({
    queryKey: [access_token],
    queryFn: () => getUserProfile(),
    refetchOnWindowFocus: false,
  });

  const { username, email, productName } = data?.data ?? {};
  const [model, setModel] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const removeToken = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(setUserNull());
    dispatch(setCartNull());
    dispatch(setWishlistToNull());
    setIsLoading(false);
    closeProfile();
    navigate("/home");
  };

  const showCloseModel = (e) => {
    e.preventDefault();
    setModel((prev) => !prev);
  };

  const Profile = (
    <Model className="modal-container2" closeModel={showCloseModel}>
      {isLoading ? (
        <div className="w-full h-[250px] flex  items-center bg-[var(--primarycolor)]">
          <div className="text-5xl font-semibold uppercase p-4">
            isLoading...
          </div>
        </div>
      ) : (
        <div
          className="w-full"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div
            onClick={showCloseModel}
            className="flex flex-col md:flex-row md:justify-between cursor-pointer  gap-5  p-4 h-[250px] rounded-b-xl  bg-[var(--primarycolor)]"
          >
            <div className="flex flex-1 self-start items-center">
              <AccountCircleIcon sx={{ fontSize: 48 }} />
              <h2 className="text-2xl font-bold capitalize">{productName}</h2>
            </div>
            <h2 className="flex-1 text-4xl font-semibold uppercase md:self-center">
              {username}
            </h2>
            <h2 className="flex-1 text-lg md:text-4xl md:font-semibold font-medium md:self-center">
              {email}
            </h2>
            <button
              className="flex-1 px-4 py-1 bg-[var(--app-border)] text-[var(--primarycolor)] rounded-md md:text-4xl"
              onClick={removeToken}
            >
              {isloading ? <Loader /> : "Log Out"}
            </button>
          </div>
        </div>
      )}
    </Model>
  );

  useEffect(() => {
    setModel(profileState);
  }, []);

  return (
    <>
      <div className="flex justify-center items-center">{model && Profile}</div>
    </>
  );
}

export default UserProfile;
