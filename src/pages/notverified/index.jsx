import React from "react";
import { Link } from "react-router-dom";

const NotVerified = () => {
  return (
    <div className="min-w-full min-h-screen flex flex-col justify-around items-center">
      <div className="w-full h-1/2 flex flex-col justify-center items-center">
        <div className="w-full text-center text-3xl">
          Sorry, this page is only available for
        </div>
        <div className="w-full text-center text-5xl">Verified Accounts</div>
      </div>
      <div className="w-full h-1/2 flex flex-col justify-center items-center">
        Verify now to access this page
        <div className="w-full flex text-center justify-center items-center">
          <Link
            to="/myaccount"
            className="hover:text-white py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-44 m-8 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Verify
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotVerified;
