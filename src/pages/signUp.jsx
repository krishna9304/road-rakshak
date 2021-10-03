import { notification, Spin } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import { BACKEND_URL } from "../constants";
import { setAuth, setSocket, setUser } from "../redux/actions/actions";

const SignUp = () => {
  const [spin, setSpin] = useState(false);
  const signup = () => {
    if (repass === data.password) {
      axios.post(`${BACKEND_URL}api/v1/userauth/signup`, data).then((res) => {
        setSpin(false);
        if (res.data.res) {
          document.cookie = "jwt=" + res.data.jwt;
          notification.success({
            message: "Success",
            description: res.data.msg,
          });
          dispatch(setUser(res.data.userData));
          dispatch(setAuth(true));
          const socket = io(`${BACKEND_URL}`, {
            transports: ["websocket"],
          });
          socket.emit("USER_ID", res.data.userData._id);
          dispatch(setSocket(socket));
          history.push("/myaccount");
        } else {
          res.data.errors.forEach((err) => {
            notification.error({
              message: "Failed",
              description: err,
            });
          });
        }
      });
    } else {
      setSpin(false);
      notification.error({
        message: "Invalid form",
        description: "Password does not match",
      });
    }
  };
  const [repass, setRepass] = useState("");
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center">
      <div className="bg-white w-full md:w-3/4 lg:w-3/4 h-full shadow-xl">
        <div className="w-full h-1/6 bg-green-400 shadow-lg flex justify-center items-center text-4xl md:text-6xl text-white font-extralight">
          Road Rakshak
        </div>
        <div className="h-5/6 flex justify-center items-center w-full">
          <div className="flex w-full md:w-1/2 flex-col px-4 py-8 bg-white rounded-lg shadow-lg dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
              Create a new account
            </div>
            <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
              Already have an account?&nbsp;
              <Link
                to="/signin"
                className="text-sm text-blue-500 underline hover:text-blue-700"
              >
                Sign in
              </Link>
            </span>
            <div className="flex gap-4 item-center mt-4">
              <button
                type="button"
                className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="mr-2"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z"></path>
                </svg>
                Facebook
              </button>
              <button
                type="button"
                className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="mr-2"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
                </svg>
                Google
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col mb-2">
                <input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSpin(true);
                      signup();
                    }
                  }}
                  value={data.name}
                  onChange={(e) => {
                    setData((d) => ({
                      ...d,
                      name: e.target.value,
                    }));
                  }}
                  type="text"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Full Name"
                />
              </div>
              <div className="flex flex-col mb-2">
                <input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSpin(true);
                      signup();
                    }
                  }}
                  value={data.email}
                  onChange={(e) => {
                    setData((d) => ({
                      ...d,
                      email: e.target.value,
                    }));
                  }}
                  type="email"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="flex flex-col mb-2">
                <input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSpin(true);
                      signup();
                    }
                  }}
                  value={data.password}
                  onChange={(e) => {
                    setData((d) => ({ ...d, password: e.target.value }));
                  }}
                  type="password"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Password"
                />
              </div>
              <div className="flex flex-col mb-2">
                <input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSpin(true);
                      signup();
                    }
                  }}
                  value={repass}
                  onChange={(e) => {
                    setRepass(e.target.value);
                  }}
                  type="password"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Re-enter Password"
                />
              </div>
              <div className="flex w-full my-4 justify-center">
                <button
                  onClick={() => {
                    setSpin(true);
                    signup();
                  }}
                  className="py-2 px-4  bg-green-400 hover:bg-green-500 focus:ring-green-300 focus:ring-offset-green-200 text-white w-1/2 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Sign Up {spin ? <Spin /> : null}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
