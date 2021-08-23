import { useEffect, useState } from "react";
import Mapbox, { Marker } from "react-map-gl";
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
    latitude: 25.0960742,
    longitude: 85.31311939999999,
    zoom: 8,
  });
  useEffect(() => {
    let watchId = navigator.geolocation.watchPosition((pos) => {
      console.log({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
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
        onResize={() => console.log("lol")}
        width={size.width}
        height={size.height}
        mapStyle="mapbox://styles/not-valid/ckslvv1eudbjl17pjfkr59qn0" //decimal
        // mapStyle={"mapbox://styles/not-valid/ckslwn5xz29oc17lwznn465cl"} // blueprint
        onViewportChange={setViewport}
        {...viewport}
        mapboxApiAccessToken={
          "pk.eyJ1Ijoibm90LXZhbGlkIiwiYSI6ImNrbGt1M2ZiMTEwaDMycG5tbDhseTY5YmoifQ.j0DITrdH06LMzgQ4A-H5vg"
        }
      >
        <Marker latitude={target.latitude} longitude={target.longitude}>
          <div
            style={{
              width: viewport.zoom * 4 < 10 ? 10 : viewport.zoom * 4,
              height: viewport.zoom * 4 < 10 ? 10 : viewport.zoom * 4,
            }}
            className="rounded-full bg-red-400"
          ></div>
        </Marker>
      </Mapbox>
    </div>
  );
}

export default App;
