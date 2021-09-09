import HomeLayout from "../components/HomeLayout/Layout";
import Map from "./index";
import { useEffect } from "react";
import { MAPBOX_API_KEY } from "../constants";

const Travel = () => {
  useEffect(() => {
    console.log(MAPBOX_API_KEY);
    return () => {};
  }, []);
  return (
    <HomeLayout header={"Travel"}>
      <Map />
    </HomeLayout>
  );
};

export default Travel;
