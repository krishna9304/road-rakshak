import { Switch } from "antd";
import React, { useEffect, useState } from "react";
import Map from "..";
import BackView from "../backview";

const Homepage = () => {
  const [isMap, setIsMap] = useState(true);
  const [currPos, setCurrPos] = useState({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrPos({
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
          });
        },
        console.error,
        { enableHighAccuracy: true }
      );
    }, 500);
  }, []);
  return (
    <div className="w-full h-screen">
      <div className="z-50 fixed bottom-0 right-10 flex justify-center items-center p-10">
        <Switch checked={isMap} onChange={setIsMap} />
      </div>
      <Map currPos={currPos} />
      <BackView
        className={`fixed top-0 left-0 z-10 ${isMap ? "hidden" : "block"}`}
      />
    </div>
  );
};

export default Homepage;
