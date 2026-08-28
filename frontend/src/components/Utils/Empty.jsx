import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const Empty = ({ className = "", heading = "" }) => {
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        "w-full h-[80vh] text-center flex flex-col  gap-2 justify-center items-center ",
        className,
      )}
    >
      <h1 className="text-3xl font-semibold">FoodLux</h1>
      <h2>{heading}</h2>{" "}
      <button
        className="px-4 py-2 bg-black text-white"
        onClick={() => navigate("/")}
      >
        Continue
      </button>
    </div>
  );
};

export default Empty;
