import React from "react";

const TopHeading = ({
  heading,
  subHeading,
  className = "",
}) => {
  return (
    <div className={`mb-8 mt-8 ${className}`}>
      <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-white bg-green-600 rounded-lg px-4 py-2 w-max">
        Explore
      </p>

      <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
        {heading}
      </h2>

      <p className="mt-3 max-w-xl text-base leading-7 text-gray-500">
        {subHeading}
      </p>
    </div>
  );
};

export default TopHeading;