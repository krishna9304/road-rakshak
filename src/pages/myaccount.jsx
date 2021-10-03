import { notification, Modal } from "antd";
import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../components/HomeLayout/Layout";
import { setAuth, setSocket, setUser } from "../redux/actions/actions";
import { BACKEND_URL } from "../constants";

const MyAccount = () => {
  const user = useSelector((state) => state.user);
  const initData = {
    ...user,
    password: "",
    newPass: "",
    repass: "",
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState(initData);
  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const dispatch = useDispatch();
  const profileColor = useRef(
    `rgb(${Math.random() * 255 - 100}, ${Math.random() * 255 - 100}, ${
      Math.random() * 255 - 100
    })`
  );

  return (
    <HomeLayout header={"My Account"}>
      <div className="container max-w-2xl mx-auto shadow-md md:w-3/4">
        <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
              <div
                className="uppercase font-bold select-none rounded-full flex items-center justify-center w-16 h-16 border text-xl text-white"
                style={{
                  backgroundColor: profileColor.current,
                }}
              >
                {(() => {
                  let words = user.name.split(" ");
                  let ProfileText = words[0][0];
                  if (words.length > 1) {
                    ProfileText += words[1][0];
                  }
                  return ProfileText;
                })()}
              </div>
              <div className="text-gray-600 text-xl">{user.name}</div>
            </div>
          </div>
        </div>
        <div className="space-y-6 bg-white">
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Account</h2>
            <div className="max-w-sm mx-auto md:w-2/3">
              <input
                disabled
                value={userData.email}
                type="email"
                className="bg-gray-200 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Email"
              />
            </div>
          </div>
          <hr />
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Personal info</h2>
            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
              <div>
                <input
                  value={userData.name}
                  onChange={(e) => {
                    setUserData((u) => ({
                      ...u,
                      name: e.target.value,
                    }));
                  }}
                  type="text"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Name"
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-4/12">Change password</h2>
            <div className="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex">
              <div className="flex relative ">
                <span
                  onClick={() => {
                    setShowPass((sp) => !sp);
                  }}
                  className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm"
                >
                  <svg
                    width="15"
                    height="15"
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                  </svg>
                </span>
                <input
                  onChange={(e) => {
                    setUserData((u) => ({
                      ...u,
                      repass: e.target.value,
                    }));
                  }}
                  value={userData.repass}
                  type={showPass ? "text" : "password"}
                  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex">
              <div className="flex relative ">
                <span
                  onClick={() => {
                    setShowNewPass((sp) => !sp);
                  }}
                  className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm"
                >
                  <svg
                    width="15"
                    height="15"
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                  </svg>
                </span>
                <input
                  onChange={(e) => {
                    setUserData((u) => ({
                      ...u,
                      newPass: e.target.value,
                    }));
                  }}
                  value={userData.newPass}
                  type={showNewPass ? "text" : "password"}
                  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Re Enter Password"
                />
              </div>
            </div>
          </div>
          <span className="text-center w-full flex justify-center items-center">
            <button
              onClick={() => {
                if (user.isVerified) {
                  notification.error({
                    message: "Failed",
                    description: "User already verified",
                  });
                } else {
                  axios
                    .post(`${BACKEND_URL}api/v1/user/verifyuser`, {
                      email: user.email,
                    })
                    .then((res) => {
                      if (res.data.res) {
                        notification.success({
                          message: "Success",
                          description: "Mail has been sent.",
                        });
                        notification.info({
                          message: "Info",
                          description: "Check your mail for verification link.",
                        });
                      }
                    });
                }
              }}
              disabled={user.isVerified}
              className={
                user.isVerified
                  ? "py-2 px-4 font-bold bg-green-500 text-white text-lg rounded-lg"
                  : "py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-pink-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
              }
            >
              {user.isVerified ? "Already Verified" : "Click to Verify"}
            </button>
          </span>
          <hr />
          <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
            <button
              onClick={() => {
                setModalVisible(true);
              }}
              className="py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
      <Modal
        title={"Password"}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
        }}
        onOk={() => {
          if (userData.newPass === userData.repass) {
            axios
              .post(`${BACKEND_URL}api/v1/user/changeprofile`, userData)
              .then((res) => {
                if (res.data.res) {
                  notification.success({
                    message: "Success",
                    description: "Personal info changed",
                  });
                  document.cookie = res.data.token;
                  dispatch(setUser(res.data.userData));
                } else {
                  res.data.errors.forEach((err) => {
                    notification.error({
                      message: "Error",
                      description: err,
                    });
                  });
                }
                setModalVisible(false);
              });
          } else {
            notification.error({
              message: "Failed",
              description: "Passwords does not match",
            });
          }
        }}
      >
        <div className="flex relative mx-10">
          <span
            onClick={() => {
              setShowOldPass((sp) => !sp);
            }}
            className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm"
          >
            <svg
              width="15"
              height="15"
              fill="currentColor"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
            </svg>
          </span>
          <input
            onChange={(e) => {
              setUserData((u) => ({
                ...u,
                password: e.target.value,
              }));
            }}
            value={userData.password}
            type={showOldPass ? "text" : "password"}
            className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Current Password"
          />
        </div>
      </Modal>
      <div className="w-full flex text-center justify-center items-center">
        <button
          onClick={() => {
            document.cookie += ";max-age=0";
            dispatch(setAuth(false));
            dispatch(setUser(null));
            dispatch(setSocket(null));
            window.location.href = window.location.origin + "/signup";
          }}
          className="py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-blue-200 text-white w-44 m-8 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          Logout
        </button>
      </div>
    </HomeLayout>
  );
};

export default MyAccount;
