import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <h1 className="text-7xl font-bold text-[#FF0004] md:text-8xl">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          Page Not Found
        </h2>

        <p className="mt-3 text-sm text-gray-500 md:text-base">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-md bg-[#FF0004] px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
