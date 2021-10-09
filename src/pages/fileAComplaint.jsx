import { Input, notification, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HomeLayout from "../components/HomeLayout/Layout";
import { BACKEND_URL } from "../constants";
import ReactMapGL, { Marker } from "react-map-gl";
import { Select } from "antd";

const { Option } = Select;

const FileAComplaint = () => {
  const [spin, setSpin] = useState(false);
  const [center, setCenter] = useState([0, 0]);
  const user = useSelector((state) => state.user);
  const [data, setData] = useState({
    reportedBy: user._id,
    hurdleType: "",
    address: "",
    description: "",
    siteImage: null,
    locationCoords: {
      latitude: 0,
      longitude: 0,
    },
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
      formData.append("latitude", data.locationCoords.latitude);
      formData.append("longitude", data.locationCoords.longitude);
      formData.append("timestamp", String(Date.now()));
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      try {
        let res = await axios.post(
          `${BACKEND_URL}api/v1/report/createReport`,
          formData,
          config
        );
        setSpin(false);
        if (!res.data.res) {
          if(res.data.errors){
            res.data.errors.forEach((err) => {
            notification.error({
              message: "Failed",
              description: err,
            });
          });
          }else{
            notification.error({
              message: "Failed",
              description: res.data.msg
            })
          }
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
      } catch (error) {
        console.error(error);
      }
    } else {
      setSpin(false);
      notification.error({
        message: "Error",
        description: "Please fill all the details correctly!",
      });
    }
  };
  let [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 14,
    width: "100%",
    height: "100%",
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter([pos.coords.longitude, pos.coords.latitude]);
      },
      (err) => {
        console.error(err);
      },
      {
        enableHighAccuracy: true,
      }
    );
    return () => {};
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setViewport((v) => ({ ...v, latitude: center[1], longitude: center[0] }));
  }, [center]);
  return (
    <HomeLayout header={"File a complaint"}>
      <div className="w-full flex justify-center items-center">
        <div className="flex w-full space-x-3">
          <div className="w-full max-w-2xl px-5 py-10 m-auto bg-white rounded-lg dark:bg-gray-800 shadow-xl  border-t-4 border-green-400 justify-center items-center">
            <div className="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white">
              Please fill the form!
            </div>
            <div className="max-w-xl flex flex-col w-full gap-4 m-auto">
              <div className="col-span-1">
                <div className="relative ">
                  <Select
                    className="w-full"
                    placeholder="Select a hurdle type"
                    onChange={(val) => {
                      setData((prevData) => ({
                        ...prevData,
                        hurdleType: val,
                      }));
                    }}
                  >
                    <Option value="MANHOLE">MANHOLE</Option>
                    <Option value="POTHOLE">POTHOLE</Option>
                    <Option value="CONSTRUCTION SITE">CONSTRUCTION SITE</Option>
                    <Option value="VEHICLE CRASH">VEHICLE CRASH</Option>
                  </Select>
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
              <div className={`border-2 h-96 w-full border-black`}>
                <ReactMapGL
                  onClick={(e) => {
                    setData((d) => ({
                      ...d,
                      locationCoords: {
                        latitude: e.lngLat[1],
                        longitude: e.lngLat[0],
                      },
                    }));
                    setCenter([e.lngLat[0], e.lngLat[1]]);
                  }}
                  mapStyle={"mapbox://styles/mapbox/streets-v11"}
                  mapboxApiAccessToken={
                    "pk.eyJ1IjoicmliaTI5IiwiYSI6ImNrdGZtejF3ZjAyMzYyb3FzcGdlcHdyMmgifQ.mk68YIafe7p9eu-hVFJVpQ"
                  }
                  {...viewport}
                  onViewportChange={(nextView) => setViewport(nextView)}
                >
                  <Marker latitude={center[1]} longitude={center[0]}>
                    <div
                      className="text-2xl bg-blue-700 w-4 h-4 transform -translate-x-2 -translate-y-2 border rounded-full"
                      style={{
                        marginTop: -(viewport.zoom ** 2.9 / 100) / 2,
                        marginLeft: -(viewport.zoom ** 2.9 / 100) / 2,
                      }}
                    ></div>
                  </Marker>
                </ReactMapGL>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  Longitude:&nbsp;
                  <Input value={center[0]} type="number" />
                </div>
                <div>
                  Latitude:&nbsp;
                  <Input value={center[1]} type="number" />
                </div>
              </div>
              <div className="">
                <div className="relative ">
                  <label htmlFor="siteimage">Site Image</label>
                  <input
                    onChange={(e) => {
                      setData({
                        ...data,
                        siteImage: e.target.files[0],
                      });
                    }}
                    name="image"
                    accept="image/*;capture=camera"
                    type="file"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="col-span-2 text-right">
                <button
                  onClick={() => {
                    setSpin(true);
                    createNewReport();
                  }}
                  className="py-2 px-4  bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-light shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Report {spin ? <Spin /> : null}
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
