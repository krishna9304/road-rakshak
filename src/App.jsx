import { useEffect, useState } from "react";
import Mapbox, { Marker, NavigationControl } from "react-map-gl";
import io from "socket.io-client";
import "./App.css";
import { BACKEND_URL } from "./constants";

const socket = io(`${BACKEND_URL}`, {
  transports: ["websocket"],
});

function App() {
  const [target, setTarget] = useState({
    latitude: 0,
    longitude: 0,
  });
  const size = window.screen;
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 5,
  });
  useEffect(() => {
    let watchId = navigator.geolocation.watchPosition((pos) => {
      console.log(
        {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        },
        console.error,
        { enableHighAccuracy: true }
      );
      setTarget({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
      socket.emit("hlw", {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);
  return (
    <div className="App">
      <Mapbox
        width={size.width}
        height={size.height}
        mapStyle="mapbox://styles/not-valid/ckslvv1eudbjl17pjfkr59qn0" //decimal
        onViewportChange={setViewport}
        {...viewport}
        mapboxApiAccessToken={
          "pk.eyJ1Ijoibm90LXZhbGlkIiwiYSI6ImNrbGt1M2ZiMTEwaDMycG5tbDhseTY5YmoifQ.j0DITrdH06LMzgQ4A-H5vg"
        }
      >
        <NavigationControl
          className="float-left mt-2 mx-1 p-4"
          onViewportChange={setViewport}
        />
        <Marker latitude={target.latitude} longitude={target.longitude}>
          <div className="p-2 border-2 border-white rounded-full bg-green-500 animate-ping"></div>
        </Marker>
        <Marker latitude={target.latitude} longitude={target.longitude}>
          <div className="p-2 border-2 border-white rounded-full bg-green-500"></div>
        </Marker>
      </Mapbox>
    </div>
  );
}

export default App;
