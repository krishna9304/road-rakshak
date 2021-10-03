import { notification } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../constants";
import auth from "./auth.png";

const VerifyUser = () => {
  const { token } = useParams();
  const [userData, setUserData] = useState({ name: "" });
  useEffect(() => {
    axios.post(`${BACKEND_URL}api/v1/user/details`, { token }).then((res) => {
      if (res.data.res) {
        setUserData(res.data.userData);
      } else {
        notification.error({
          message: "Failed",
          description: "Link expired",
        });
      }
    });
  }, [token]);
  return (
    <div className="w-screen min-h-screen flex flex-col md:flex-row md:items-center md:justify-around p-10">
      <div className="w-full md:w-1/2 select-none my-10">
        <img
          draggable={false}
          src={auth}
          alt="authentication"
          className="w-full"
        />
        <div className="w-full flex items-center justify-center text-3xl font-bold">
          Email Verification
        </div>
      </div>
      <div className="w-full md:w-1/3 rounded-lg flex flex-col justify-center items-center md:h-1/2 shadow-xl p-12 border-t-4 border-green-500">
        <div className="text-3xl font-extralight">
          Hello {userData.name.split(" ")[0]},
        </div>
        <div className="text-center my-16">
          Click on the button to verify your account on Road Rakshak
        </div>
        <div className="w-full flex text-center justify-center items-center">
          <button
            onClick={() => {
              axios
                .post(`${BACKEND_URL}api/v1/user/verified`, { token })
                .then((res) => {
                  if (res.data.res) {
                    notification.success({
                      message: "Success",
                      description: "User verified",
                    });
                  } else {
                    res.data.errors.forEach((err) => {
                      notification.error({
                        message: "Failed",
                        description: err,
                      });
                    });
                  }
                });
            }}
            className="py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-44 m-8 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;
