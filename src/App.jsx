import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
  });
  useEffect(() => {
    function success(position) {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
      console.log({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    }

    function error() {
      alert("Sorry, no position available.");
    }

    const options = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    };

    const watchID = navigator.geolocation.watchPosition(
      success,
      error,
      options
    );
  }, []);
  return (
    <div className="App">
      <h1 className="flex text-xs w-full min-h-screen text-center  justify-center items-center">
        {JSON.stringify(location)}
      </h1>
    </div>
  );
}

export default App;
