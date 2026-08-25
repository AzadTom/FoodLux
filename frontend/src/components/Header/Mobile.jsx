import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFilter } from "../../reducers/filterSlice.js";
import { useQuery } from "@tanstack/react-query";
import { SeriviceEachCategoryList } from "@/services/service.js";

const Mobile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data } = useQuery({
    queryKey: ["3a841c23-fd5d-42be-8480-d07fc61998b9"],
    queryFn: () =>
      SeriviceEachCategoryList("3a841c23-fd5d-42be-8480-d07fc61998b9"),
    refetchOnWindowFocus: false,
  });

  const products = data?.data;

  const searchPage = (e) => {
    e.preventDefault();
    const filtered = products.filter((product) => {
      const productName = product.name.toLowerCase();
      return productName.includes(e.target.value.toLowerCase());
    });

    console.log("searchfilter",filtered);
    dispatch(getFilter(filtered));
    navigate("/searching");
  };

  return (
    <>
      <div className="sm:hidden mx-4 mb-4">
        <input
          type="search"
          className="w-full px-4 py-2 rounded-xl bg-[var(--secondarycolor)] outline-none"
          placeholder="Search"
          onChange={(e) => searchPage(e)}
        />
      </div>
    </>
  );
};

export default Mobile;
