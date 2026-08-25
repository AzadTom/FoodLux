import { useNavigate } from "react-router-dom";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { getFilter } from "../../reducers/filterSlice.js";
import { useEffect, useState } from "react";
import { Favorite } from "@mui/icons-material";
import UserProfile from "../../pages/ProfilePage/UserProfile.jsx";
import { SeriviceEachCategoryList } from "@/services/service.js";
import { useQuery } from "@tanstack/react-query";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLogin } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { wishData } = useSelector((state) => state.favData);

  const { data} = useQuery({
    queryKey: ["3a841c23-fd5d-42be-8480-d07fc61998b9"],
    queryFn: () => SeriviceEachCategoryList("3a841c23-fd5d-42be-8480-d07fc61998b9"),
    refetchOnWindowFocus: false,
  });

  const products = data?.data;

  const [profileState, setProfileState] = useState(false);

  const goToHome = (e) => {
    e.preventDefault();
    if (isLogin) {
      setProfileState((prev) => !prev);
    } else {
      navigate("/signin");
    }
  };

  const searchPage = (e) => {
    e.preventDefault();
    const filtered = products.filter((product) => {
      const productName = product.name.toLowerCase();
      return productName.includes(e.target.value.toLowerCase());
    });

    console.log("searchfilter",filtered);
    dispatch(getFilter(filtered));
    navigate("/search");
  };

  const closeProfile = () => {
    setProfileState(false);
    console.log("close profile");
  };

  return (
    <>
      <div className="flex justify-between p-4 items-center cursor-pointer  sticky top-0 z-50 bg-[var(--primarycolor)]">
        <div onClick={() => navigate("/home")}>
          <h1 className="font-bold text-2xl">FoodLux</h1>
        </div>
        <div className="flex  gap-4">
          <div className="hidden sm:flex gap-1 items-center">
            <input
              type="search"
              placeholder="Search"
              className="px-4 py-2 bg-[var(--secondarycolor)] outline-none rounded-xl "
              onChange={(e) => searchPage(e)}
            />
          </div>
          <button onClick={() => navigate("/fav")}>
            <Favorite />
            <span className="text-xs">
              {wishData.length > 0 ? wishData.length : ""}
            </span>
          </button>
          <button
            className="flex justify-center items-center "
            onClick={() => navigate("/cart")}
          >
            <LocalMallIcon />
            <span className="text-xs">
              {cart.length > 0 ? cart.length : ""}
            </span>
          </button>
          <button onClick={goToHome}>
            <AccountCircleIcon />
          </button>
        </div>
      </div>
      {profileState && (
        <UserProfile profileState={profileState} closeProfile={closeProfile} />
      )}
    </>
  );
};

export default Header;
