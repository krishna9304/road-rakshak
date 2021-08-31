import { Switch } from "antd";
import React, { useState } from "react";
import Map from "..";
import BackView from "../backview";

const Homepage = () => {
  const [isMap, setIsMap] = useState(true);
  return (
    <div className="w-full h-screen">
      <div className="z-50 fixed bottom-0 right-10 flex justify-center items-center p-10">
        <Switch style={{ zIndex: -1 }} checked={isMap} onChange={setIsMap} />
      </div>
      {isMap ? <Map /> : <BackView />}
    </div>
  );
};

export default Homepage;
