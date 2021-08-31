import { notification } from "antd";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import HomeLayout from "../components/HomeLayout/Layout";
import { BACKEND_URL } from "../constants";

const FileAComplaint = () => {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState({
    reportedBy: user._id,
    hurdleType: "",
    address: "",
    description: "",
    siteImage: null,
  });
  let createNewReport = async () => {
    if (
      data.reportedBy &&
      data.siteImage &&
      data.description &&
      data.address &&
      data.hurdleType
    ) {
      const formData = new FormData();
      formData.append("siteImage", data.siteImage);
      formData.append("description", data.description);
      formData.append("hurdleType", data.hurdleType);
      formData.append("reportedBy", user._id);
      formData.append("address", data.address);
      formData.append("timestamp", String(Date.now()));
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      let res = await axios.post(
        `${BACKEND_URL}api/v1/report/createReport`,
        formData,
        config
      );
      if (!res.data.res) {
        notification.error({
          message: "Failed",
          description: "There is some error!",
        });
      } else {
        notification.success({
          message: "Success",
          description: res.data.msg,
        });
        setData({
          address: "",
          description: "",
          hurdleType: "",
          reportedBy: user._id,
          siteImage: null,
        });
      }
    } else {
      notification.error({
        message: "Error",
        description: "Please fill all the details correctly!",
      });
    }
  };
  return (
    <HomeLayout header={"File a complaint"}>
      <div className="w-full flex justify-center items-center">
        <div className="flex w-full max-w-sm space-x-3">
          <div className="w-full max-w-2xl px-5 py-10 m-auto bg-white rounded-lg dark:bg-gray-800 shadow-xl  border-t-4 border-green-400">
            <div className="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white">
              Please fill the form!
            </div>
            <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
              <div className="col-span-2 lg:col-span-1">
                <div className="relative ">
                  <input
                    value={data.hurdleType}
                    onChange={(e) => {
                      setData((d) => ({
                        ...d,
                        hurdleType: e.target.value,
                      }));
                    }}
                    type="text"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Hurdle Type"
                  />
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="relative ">
                  <input
                    value={data.address}
                    onChange={(e) => {
                      setData((d) => ({
                        ...d,
                        address: e.target.value,
                      }));
                    }}
                    type="text"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Address"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <textarea
                  value={data.description}
                  onChange={(e) => {
                    setData((d) => ({
                      ...d,
                      description: e.target.value,
                    }));
                  }}
                  style={{ minHeight: "3rem" }}
                  className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Description"
                  rows="5"
                  cols="40"
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="relative ">
                  <label for="siteimage">Site Image</label>
                  <input
                    onChange={(e) => {
                      setData({
                        ...data,
                        siteImage: e.target.files[0],
                      });
                    }}
                    name="image"
                    accept="image/*"
                    type="file"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="col-span-2 text-right">
                <button
                  onClick={() => {
                    createNewReport();
                  }}
                  className="py-2 px-4  bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-light shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default FileAComplaint;
