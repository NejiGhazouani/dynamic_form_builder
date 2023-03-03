import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto my-10 text-center">
      <h1 className="text-3xl font-bold mb-5">Page not found</h1>
      <p className="mb-5">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go back to home page
      </Link>
    </div>
  );
};

export default NotFoundPage;
