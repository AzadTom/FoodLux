import { cn } from "@/lib/utils";
import { Spinner } from "../ui/spinner";

const Loading = ({ className = "" }) => {
  return (
    <div
      className={cn("min-h-screen flex justify-center items-center", className)}
    >
      <div className="flex items-center gap-2">
        <Spinner /> <p className="text-base">IsLoading</p>
      </div>
    </div>
  );
};

export default Loading;
