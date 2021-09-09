import HomeLayout from "../components/HomeLayout/Layout";
import Map from "./index";

const Travel = () => {
  return (
    <HomeLayout header={"Travel"}>
      <Map currPos={origin} />
    </HomeLayout>
  );
};

export default Travel;
