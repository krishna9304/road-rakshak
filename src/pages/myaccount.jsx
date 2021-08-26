import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import HomeLayout from "../components/HomeLayout/Layout";
import { setAuth, setSocket, setUser } from "../redux/actions/actions";

const MyAccount = () => {
  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState({
    ...user,
    password: "",
    repass: "",
  });
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <HomeLayout header={"My Account"}>
      <div className="container max-w-2xl mx-auto shadow-md md:w-3/4">
        <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
              <div
                className="select-none rounded-full flex items-center justify-center w-16 h-16 border text-xl text-white"
                style={{
                  backgroundColor: `rgb(${Math.random() * 255 - 100}, ${
                    Math.random() * 255 - 100
                  }, ${Math.random() * 255 - 100})`,
                }}
              >
                {(() => {
                  let words = user.name.split(" ");
                  let ProfileText = words[0][0];
                  if (words.length !== 1) {
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
              <div className="relative">
                <input
                  value={userData.email}
                  disabled
                  type="email"
                  className="bg-gray-200 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Email"
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Personal info</h2>
            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
              <div>
                <div className=" relative ">
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
          </div>
          <hr />
          <div className="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-4/12">Change password</h2>
            <div className="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex">
              <div className=" relative ">
                <input
                  value={userData.password}
                  onChange={(e) => {
                    setUserData((u) => ({
                      ...u,
                      password: e.target.value,
                    }));
                  }}
                  type="password"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Enter Password"
                />
              </div>
            </div>
            <div className="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex">
              <div className="relative">
                <input
                  value={userData.repass}
                  onChange={(e) => {
                    setUserData((u) => ({
                      ...u,
                      repass: e.target.value,
                    }));
                  }}
                  type="password"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Re-enter Password"
                />
              </div>
            </div>
          </div>
          <span className="text-center w-full flex justify-center items-center">
            <button
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
            <button className="py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex text-center justify-center items-center">
        <button
          onClick={() => {
            console.log("logging out");
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
