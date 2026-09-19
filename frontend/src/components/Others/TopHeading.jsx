import { useNavigate } from "react-router-dom";

const TopHeading = ({ title,onBack=() => {} ,className="" }) => {

  const router = useNavigate();  
  const handleBack = () => {
     router(-1);
  };

  return (
    <div className={`flex items-center gap-3 py-4 ${className}`}>
      <button
        type="button"
        onClick={handleBack}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-100"
        aria-label="Go back"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <h1 className="text-xl font-semibold">
        {title}
      </h1>
    </div>
  );
};

export default TopHeading;