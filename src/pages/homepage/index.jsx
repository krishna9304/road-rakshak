import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Homepage = () => {
  const history = useHistory();
  useEffect(() => {
    history.push("/myaccount");
    return () => {};
  }, [history]);
  return <></>;
};

export default Homepage;
